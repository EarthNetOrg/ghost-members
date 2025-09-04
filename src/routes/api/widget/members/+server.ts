import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
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

export const GET: RequestHandler = async ({ url }) => {
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

		// Get parameters from URL
		const urlParams = url.searchParams;
		const config = new ConfigManager({
			ghostAdminApiUrl,
			ghostAdminApiKey,
			defaultLanguage: urlParams.get('lang') || 'en',
			widgetTheme: (urlParams.get('theme') || 'light') as 'light' | 'dark',
			defaultPageSize: parseInt(urlParams.get('pageSize') || '24'),
			enableSearch: urlParams.get('search') !== 'false',
			enableFilters: urlParams.get('filters') !== 'false',
			showAvatars: urlParams.get('avatars') !== 'false',
			showJoinDates: urlParams.get('joinDates') !== 'false',
			showMemberCount: urlParams.get('memberCount') !== 'false',
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
		const newsletterFilter = urlParams.get('newsletter') || '';

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

		// Apply newsletter filtering if specified
		let finalMembers = filteredMembers;
		if (newsletterFilter.trim()) {
			finalMembers = filteredMembers.filter((member: any) => {
				if (!member.newsletters || !Array.isArray(member.newsletters)) {
					return false; // Exclude members without newsletters if filtering by newsletter
				}
				// Check if member is subscribed to the specified newsletter
				return member.newsletters.some(
					(newsletter: any) =>
						newsletter.name === newsletterFilter ||
						newsletter.id === newsletterFilter ||
						newsletter.name?.toLowerCase().includes(newsletterFilter.toLowerCase())
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

		// Test connection to ensure API is working
		const connectionTest = await apiClient.testConnection();
		if (!connectionTest.success) {
			throw new Error(connectionTest.message);
		}

		return json({
			success: true,
			data: {
				members: memberResponse.data || [],
				totalMembers: memberResponse.meta?.pagination?.total || 0,
				currentPage,
				totalPages: Math.ceil(
					(memberResponse.meta?.pagination?.total || 0) / config.get().defaultPageSize
				),
				config: config.get(),
				searchQuery,
				filters: {
					tier: tierFilter,
					status: statusFilter,
					newsletter: newsletterFilter
				},
				availableNewsletters: getAvailableNewsletters(finalMembers)
			}
		});
	} catch (err) {
		console.error('Error in widget API:', err);
		throw error(500, {
			message: err instanceof Error ? err.message : 'Failed to load member data'
		});
	}
};
