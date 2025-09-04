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
		public details?: any
	) {
		super(message);
		this.name = 'GhostApiError';
	}
}

export class GhostApiClient {
	private baseUrl: string;
	private apiKey: string;
	private timeout: number;
	private maxRetries: number;

	constructor(options: GhostApiOptions) {
		this.baseUrl = options.baseUrl.replace(/\/$/, '');
		this.apiKey = options.apiKey;
		this.timeout = options.timeout || 5000;
		this.maxRetries = options.maxRetries || 3;
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

	private async makeRequest<T>(
		endpoint: string,
		params: Record<string, string | number> = {},
		retryCount = 0
	): Promise<T> {
		const url = new URL(`${this.baseUrl}/ghost/api/admin/${endpoint}`);
		
		// Add API key
		url.searchParams.set('key', this.apiKey);
		
		// Add other parameters
		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.set(key, value.toString());
		});

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		try {
			const response = await fetch(url.toString(), {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'User-Agent': 'Ghost-Member-Directory/1.0'
				},
				signal: controller.signal
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
				let ghostCode: string | undefined;
				let details: any;

				try {
					const errorData = await response.json();
					if (errorData.errors && errorData.errors.length > 0) {
						const error = errorData.errors[0];
						errorMessage = error.message || errorMessage;
						ghostCode = error.type || error.errorType;
						details = error.details || error.context;
					}
				} catch {
					// Ignore JSON parsing errors for error responses
				}

				// Retry on server errors (5xx) and specific client errors
				const shouldRetry = 
					response.status >= 500 || 
					response.status === 429 || // Rate limit
					response.status === 408;   // Request timeout

				if (shouldRetry && retryCount < this.maxRetries) {
					// Exponential backoff: 1s, 2s, 4s
					const delay = Math.pow(2, retryCount) * 1000;
					await new Promise(resolve => setTimeout(resolve, delay));
					return this.makeRequest<T>(endpoint, params, retryCount + 1);
				}

				throw new GhostApiError(errorMessage, response.status, ghostCode, details);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof GhostApiError) {
				throw error;
			}

			if (error instanceof Error && error.name === 'AbortError') {
				if (retryCount < this.maxRetries) {
					return this.makeRequest<T>(endpoint, params, retryCount + 1);
				}
				throw new GhostApiError('Request timeout', 408);
			}

			// Network or other errors
			if (retryCount < this.maxRetries) {
				const delay = Math.pow(2, retryCount) * 1000;
				await new Promise(resolve => setTimeout(resolve, delay));
				return this.makeRequest<T>(endpoint, params, retryCount + 1);
			}

			throw new GhostApiError(
				error instanceof Error ? error.message : 'Unknown error occurred'
			);
		}
	}

	async getMembers(options: MemberQueryOptions = {}): Promise<GhostApiResponse<GhostMember>> {
		const params: Record<string, string | number> = {
			page: options.page || 1,
			limit: options.limit || 15,
			include: options.include || 'labels,newsletters',
			order: options.order || 'created_at DESC'
		};

		if (options.filter) {
			params.filter = options.filter;
		}

		return this.makeRequest<GhostApiResponse<GhostMember>>('members', params);
	}

	async getMember(id: string): Promise<{ members: GhostMember[] }> {
		return this.makeRequest<{ members: GhostMember[] }>(`members/${id}`, {
			include: 'labels,newsletters'
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

	async testConnection(): Promise<{ success: boolean; message: string; siteInfo?: any }> {
		try {
			// Test with a simple members request with limit 1
			const response = await this.getMembers({ limit: 1 });
			return {
				success: true,
				message: 'Connection successful',
				siteInfo: {
					totalMembers: response.meta?.pagination?.total || 0
				}
			};
		} catch (error) {
			if (error instanceof GhostApiError) {
				return {
					success: false,
					message: `Ghost API Error: ${error.message}`,
				};
			}
			return {
				success: false,
				message: error instanceof Error ? error.message : 'Unknown connection error'
			};
		}
	}
}