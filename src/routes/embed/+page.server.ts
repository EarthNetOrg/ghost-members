import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { GhostApiClient } from '$lib/api/ghost.js';
import { ConfigManager } from '$lib/config/index.js';
import { env } from '$env/dynamic/private';

// Helper function to get unique newsletters from members
function getAvailableNewsletters(members: any[]): any[] {
	const newsletterMap = new Map();

	members.forEach((member: any) => {
		if (member.newsletters && Array.isArray(member.newsletters)) {
			member.newsletters.forEach((newsletter: any) => {
				if (newsletter.status === 'active') {
					newsletterMap.set(newsletter.id, {
						id: newsletter.id,
						name: newsletter.name,
						description: newsletter.description
					});
				}
			});
		}
	});

	return Array.from(newsletterMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export const load: PageServerLoad = async ({ url }) => {
	try {
		// Get Ghost API credentials from environment
		const ghostAdminApiUrl = env.GHOST_ADMIN_API_URL || 'https://canadapt.news';
		const ghostAdminApiKey =
			env.GHOST_ADMIN_API_KEY ||
			'6761f77c69075304a8e05550:3f693b7ac07da47acb5b094ffcd531af1c0ea7ad0ad8ca1c1d441b94bc18dbc1';

		if (!ghostAdminApiUrl || !ghostAdminApiKey) {
			throw new Error(
				'Ghost API credentials not configured. Please set GHOST_ADMIN_API_URL and GHOST_ADMIN_API_KEY environment variables.'
			);
		}

		// Get configuration from URL parameters
		const urlParams = url.searchParams;
		const config = new ConfigManager({
			ghostAdminApiUrl,
			ghostAdminApiKey,
			defaultLanguage: urlParams.get('lang') || 'en',
			widgetTheme: (urlParams.get('theme') || 'light') as 'light' | 'dark',
			defaultPageSize: parseInt(urlParams.get('pageSize') || '24'),
			enableSearch: !(urlParams.get('search') === 'false' || urlParams.get('enableSearch') === 'false'),
			enableFilters: !(urlParams.get('filters') === 'false' || urlParams.get('enableFilters') === 'false'),
			showAvatars: urlParams.get('avatars') !== 'false',
			showJoinDates: urlParams.get('joinDates') !== 'false',
			showMemberCount: !(urlParams.get('showMemberCount') === 'false' || urlParams.get('memberCount') === 'false'),
			showTitle: urlParams.get('showTitle') !== 'false',
			showTierFilter: urlParams.get('showTierFilter') !== 'false',
			showStatusFilter: urlParams.get('showStatusFilter') !== 'false',
			showNewsletterFilter: urlParams.get('showNewsletterFilter') !== 'false',
			defaultView: (urlParams.get('defaultView') || 'grid') as 'grid' | 'list',
			enableViewToggle: urlParams.get('enableViewToggle') !== 'false',
			enableCaching: true,
			autoDetectLanguage: false
		});

		// Create API client from config
		const apiClient = GhostApiClient.fromConfig(config);

		// Get query parameters for data fetching
		const currentPage = parseInt(urlParams.get('page') || '1');
		const searchQuery = urlParams.get('q') || '';
		const tierFilter = urlParams.get('tier') || '';
		const statusFilter = urlParams.get('status') || '';
		const newslettersFilter = urlParams.get('newsletters') || '';

		// Prepare API options
		const apiOptions = {
			page: currentPage,
			limit: config.get().defaultPageSize,
			order: 'created_at DESC'
		};

		// Fetch members based on filters
		let memberResponse;
		if (searchQuery.trim()) {
			memberResponse = await apiClient.searchMembers(searchQuery, apiOptions);
		} else if (tierFilter || statusFilter) {
			const filters: Record<string, string> = {};
			if (tierFilter) filters.tier = tierFilter;
			if (statusFilter) filters.status = statusFilter;
			memberResponse = await apiClient.getMembersWithFilters(filters, apiOptions);
		} else {
			memberResponse = await apiClient.getMembers(apiOptions);
		}

		// Filter out members with 'private' label
		const filteredMembers = (memberResponse.data || []).filter((member: any) => {
			if (!member.labels || !Array.isArray(member.labels)) {
				return true; // Include members without labels
			}
			// Exclude members who have a label with slug 'private'
			return !member.labels.some(
				(label: any) => label.slug === 'private' || label.name?.toLowerCase() === 'private'
			);
		});

		// Apply newsletter filtering if specified (multiple newsletters with OR logic)
		let finalMembers = filteredMembers;
		if (newslettersFilter.trim()) {
			const selectedNewsletters = newslettersFilter.split(',').map((n) => n.trim());
			finalMembers = filteredMembers.filter((member: any) => {
				if (!member.newsletters || !Array.isArray(member.newsletters)) {
					return false; // Exclude members without newsletters if filtering by newsletter
				}
				// Check if member is subscribed to any of the selected newsletters (OR logic)
				return member.newsletters.some((newsletter: any) =>
					selectedNewsletters.some(
						(selectedNewsletter) =>
							newsletter.name === selectedNewsletter ||
							newsletter.id === selectedNewsletter ||
							newsletter.name?.toLowerCase().includes(selectedNewsletter.toLowerCase())
					)
				);
			});
		}

		// Sanitize member data to remove email addresses but keep username for fallback
		const sanitizedMembers = finalMembers.map((member: any) => {
			const sanitized = { ...member };
			
			// Extract username from email for name fallback, then remove email
			if (member.email && typeof member.email === 'string') {
				const emailParts = member.email.split('@');
				if (emailParts.length > 0 && emailParts[0] && !member.name) {
					sanitized.username = emailParts[0];
				}
			}
			
			// Remove the email address
			delete sanitized.email;
			
			return sanitized;
		});

		// Update memberResponse with sanitized data
		memberResponse.data = sanitizedMembers;

		// Calculate the actual total count of filtered members
		let actualTotalMembers = 0;
		
		// If we have filters applied (excluding the default 'private' label filter), 
		// we need to get the total count of all members that match these filters
		const hasCustomFilters = searchQuery.trim() || tierFilter || statusFilter || newslettersFilter;
		
		if (hasCustomFilters) {
			// For search queries, use the API's pagination total as it represents the search results
			if (searchQuery.trim()) {
				actualTotalMembers = memberResponse.meta?.pagination?.total || 0;
			} else {
				// For other filters, we need to get all members and count the filtered ones
				// This is not ideal for performance, but gives accurate counts
				try {
					const allMembersResponse = await apiClient.getMembers({
						page: 1,
						limit: 1000, // Get a large number to capture most members
						order: 'created_at DESC'
					});
					
					// Apply the same filtering logic to get the total count
					const allFilteredMembers = (allMembersResponse.data || []).filter((member: any) => {
						// Apply private label filter
						if (member.labels && Array.isArray(member.labels)) {
							const hasPrivateLabel = member.labels.some(
								(label: any) => label.slug === 'private' || label.name?.toLowerCase() === 'private'
							);
							if (hasPrivateLabel) return false;
						}
						
						// Apply tier filter
						if (tierFilter && member.tier?.slug !== tierFilter) {
							return false;
						}
						
						// Apply status filter
						if (statusFilter && member.status !== statusFilter) {
							return false;
						}
						
						// Apply newsletter filter
						if (newslettersFilter.trim()) {
							const selectedNewsletters = newslettersFilter.split(',').map((n) => n.trim());
							if (!member.newsletters || !Array.isArray(member.newsletters)) {
								return false;
							}
							const hasMatchingNewsletter = member.newsletters.some((newsletter: any) =>
								selectedNewsletters.some(
									(selectedNewsletter) =>
										newsletter.name === selectedNewsletter ||
										newsletter.id === selectedNewsletter ||
										newsletter.name?.toLowerCase().includes(selectedNewsletter.toLowerCase())
								)
							);
							if (!hasMatchingNewsletter) return false;
						}
						
						return true;
					});
					
					actualTotalMembers = allFilteredMembers.length;
				} catch (error) {
					console.warn('Failed to get total count for filtered results, using current page count:', error);
					// Fallback to using the current page count
					actualTotalMembers = finalMembers.length;
				}
			}
		} else {
			// No custom filters, just the default private label filter
			// Get all members and count those without private labels
			try {
				const allMembersResponse = await apiClient.getMembers({
					page: 1,
					limit: 1000, // Get a large number to capture most members
					order: 'created_at DESC'
				});
				
				const allPublicMembers = (allMembersResponse.data || []).filter((member: any) => {
					if (!member.labels || !Array.isArray(member.labels)) {
						return true; // Include members without labels
					}
					// Exclude members who have a label with slug 'private'
					return !member.labels.some(
						(label: any) => label.slug === 'private' || label.name?.toLowerCase() === 'private'
					);
				});
				
				actualTotalMembers = allPublicMembers.length;
			} catch (error) {
				console.warn('Failed to get total count, using API pagination total:', error);
				// Fallback to using the API's pagination total
				actualTotalMembers = memberResponse.meta?.pagination?.total || 0;
			}
		}

		// Test connection to ensure API is working
		const connectionTest = await apiClient.testConnection();
		if (!connectionTest.success) {
			throw new Error(connectionTest.message);
		}

		return {
			members: memberResponse.data || [],
			totalMembers: actualTotalMembers,
			currentPage,
			totalPages: Math.ceil(actualTotalMembers / config.get().defaultPageSize),
			config: config.get(),
			searchQuery,
			filters: {
				tier: tierFilter,
				status: statusFilter,
				newsletters: newslettersFilter
			},
			availableNewsletters: getAvailableNewsletters(finalMembers)
		};
	} catch (err) {
		console.error('Error loading member data:', err);
		throw error(500, {
			message: err instanceof Error ? err.message : 'Failed to load member data'
		});
	}
};
