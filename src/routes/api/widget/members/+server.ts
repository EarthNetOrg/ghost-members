import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GhostApiClient } from '$lib/api/ghost.js';
import { ConfigManager } from '$lib/config/index.js';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Get Ghost API credentials from environment
		const ghostAdminApiUrl = env.GHOST_ADMIN_API_URL || 'https://canadapt.news';
		const ghostAdminApiKey = env.GHOST_ADMIN_API_KEY || '6761f77c69075304a8e05550:3f693b7ac07da47acb5b094ffcd531af1c0ea7ad0ad8ca1c1d441b94bc18dbc1';

		if (!ghostAdminApiUrl || !ghostAdminApiKey) {
			throw new Error('Ghost API credentials not configured. Please set GHOST_ADMIN_API_URL and GHOST_ADMIN_API_KEY environment variables.');
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
				totalPages: Math.ceil((memberResponse.meta?.pagination?.total || 0) / config.get().defaultPageSize),
				config: config.get(),
				searchQuery,
				filters: {
					tier: tierFilter,
					status: statusFilter
				}
			}
		});
	} catch (err) {
		console.error('Error in widget API:', err);
		throw error(500, {
			message: err instanceof Error ? err.message : 'Failed to load member data'
		});
	}
};