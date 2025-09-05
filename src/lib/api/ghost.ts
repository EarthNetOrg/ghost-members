import GhostAdminAPI from '@tryghost/admin-api';
import './ghost-admin-api.d.ts';
import type { GhostMember, GhostApiResponse, MemberFilters } from '../config/types.js';
import type { ConfigManager } from '../config/index.js';

export interface GhostApiOptions {
	baseUrl: string;
	apiKey: string;
	timeout?: number;
	maxRetries?: number;
}

export interface MemberQueryOptions {
	page?: number;
	limit?: number;
	filter?: string;
	include?: string;
	order?: string;
}

export class GhostApiError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public ghostCode?: string,
		public details?: unknown
	) {
		super(message);
		this.name = 'GhostApiError';
	}
}


export class GhostApiClientCredentials {
	// This should be an object with a key that corresponds to an id and two properties: apiUrl and apiKey
	static getCredentials() {
		return {
			canadapt: {
				apiUrl: 'https://canadapt.news',
				apiKey: '6761f77c69075304a8e05550:3f693b7ac07da47acb5b094ffcd531af1c0ea7ad0ad8ca1c1d441b94bc18dbc1'
			}
		};
	}
}

export class GhostApiClient {
	private api: GhostAdminAPI;
	private maxRetries: number;

	constructor(options: GhostApiOptions) {
		this.maxRetries = options.maxRetries || 3;

		// Initialize the official Ghost Admin API client
		this.api = new GhostAdminAPI({
			url: options.baseUrl,
			key: options.apiKey,
			version: 'v5.0'
		});
	}

	static fromConfig(config: ConfigManager): GhostApiClient {
		const cfg = config.get();
		return new GhostApiClient({
			baseUrl: config.getApiUrl(),
			apiKey: config.getApiKey(),
			timeout: cfg.apiTimeout,
			maxRetries: cfg.maxRetries
		});
	}

	private async retryOperation<T>(operation: () => Promise<T>, retryCount = 0): Promise<T> {
		try {
			return await operation();
		} catch (error) {
			// Check if we should retry
			const shouldRetry =
				retryCount < this.maxRetries &&
				error instanceof Error &&
				(error.message.includes('timeout') ||
					error.message.includes('network') ||
					error.message.includes('429') ||
					error.message.includes('5'));

			if (shouldRetry) {
				// Exponential backoff: 1s, 2s, 4s
				const delay = Math.pow(2, retryCount) * 1000;
				await new Promise((resolve) => setTimeout(resolve, delay));
				return this.retryOperation(operation, retryCount + 1);
			}

			// Convert to our error format
			if (error instanceof Error) {
				throw new GhostApiError(error.message);
			}
			throw error;
		}
	}

	async getMembers(options: MemberQueryOptions = {}): Promise<GhostApiResponse<GhostMember>> {
		return this.retryOperation(async () => {
			const queryOptions = {
				page: options.page || 1,
				limit: options.limit || 15,
				include: options.include || 'labels,newsletters',
				order: options.order || 'created_at DESC',
				...(options.filter && { filter: options.filter })
			};

			const response = await this.api.members.browse(queryOptions);

			// Get the actual response with proper pagination info
			const responseData = response as any;

			// Transform the response to match our expected format
			return {
				data: responseData,
				meta: {
					pagination: {
						page: queryOptions.page,
						limit: queryOptions.limit,
						pages:
							responseData.meta?.pagination?.pages ||
							Math.ceil((responseData.length || 0) / queryOptions.limit),
						total: responseData.meta?.pagination?.total || responseData.length || 0,
						next: responseData.meta?.pagination?.next || undefined,
						prev: responseData.meta?.pagination?.prev || undefined
					}
				}
			};
		});
	}

	async getMember(id: string): Promise<{ members: GhostMember[] }> {
		return this.retryOperation(async () => {
			const member = await this.api.members.read(
				{ id },
				{
					include: 'labels,newsletters'
				}
			);
			return { members: [member] };
		});
	}

	async searchMembers(
		query: string,
		options: Omit<MemberQueryOptions, 'filter'> = {}
	): Promise<GhostApiResponse<GhostMember>> {
		// Ghost API search filter format
		const searchFilter = `name:~'${query}',email:~'${query}'`;

		return this.getMembers({
			...options,
			filter: searchFilter
		});
	}

	async getMembersByTier(
		tier: string,
		options: Omit<MemberQueryOptions, 'filter'> = {}
	): Promise<GhostApiResponse<GhostMember>> {
		let filter: string;

		switch (tier.toLowerCase()) {
			case 'free':
				filter = 'status:free';
				break;
			case 'paid':
				filter = 'status:paid';
				break;
			case 'comped':
				filter = 'status:comped';
				break;
			default:
				// Assume it's a product/tier name
				filter = `tier:${tier}`;
		}

		return this.getMembers({
			...options,
			filter
		});
	}

	async getMembersByLabel(
		label: string,
		options: Omit<MemberQueryOptions, 'filter'> = {}
	): Promise<GhostApiResponse<GhostMember>> {
		return this.getMembers({
			...options,
			filter: `label:${label}`
		});
	}

	async getMembersByDateRange(
		startDate: Date,
		endDate: Date,
		options: Omit<MemberQueryOptions, 'filter'> = {}
	): Promise<GhostApiResponse<GhostMember>> {
		const start = startDate.toISOString();
		const end = endDate.toISOString();

		return this.getMembers({
			...options,
			filter: `created_at:>='${start}'+created_at:<='${end}'`
		});
	}

	buildComplexFilter(filters: MemberFilters): string {
		const filterParts: string[] = [];

		if (filters.search) {
			filterParts.push(`name:~'${filters.search}',email:~'${filters.search}'`);
		}

		if (filters.tier) {
			if (['free', 'paid', 'comped'].includes(filters.tier)) {
				filterParts.push(`status:${filters.tier}`);
			} else {
				filterParts.push(`tier:${filters.tier}`);
			}
		}

		if (filters.label) {
			filterParts.push(`label:${filters.label}`);
		}

		if (filters.status) {
			filterParts.push(`status:${filters.status}`);
		}

		if (filters.created_at?.gte) {
			filterParts.push(`created_at:>='${filters.created_at.gte}'`);
		}

		if (filters.created_at?.lte) {
			filterParts.push(`created_at:<='${filters.created_at.lte}'`);
		}

		return filterParts.join('+');
	}

	async getMembersWithFilters(
		filters: MemberFilters,
		options: Omit<MemberQueryOptions, 'filter'> = {}
	): Promise<GhostApiResponse<GhostMember>> {
		const filter = this.buildComplexFilter(filters);

		return this.getMembers({
			...options,
			filter: filter || undefined
		});
	}

	async testConnection(): Promise<{ success: boolean; message: string; siteInfo?: unknown }> {
		return this.retryOperation(async () => {
			try {
				// Test with a simple site info request
				const site = await this.api.site.read();
				const members = await this.api.members.browse({ limit: 1 });

				return {
					success: true,
					message: 'Connection successful',
					siteInfo: {
						title: site.title,
						totalMembers: members.meta?.pagination?.total || 0
					}
				};
			} catch (error) {
				return {
					success: false,
					message: error instanceof Error ? error.message : 'Unknown connection error'
				};
			}
		});
	}
}
