import type { GhostApiResponse, GhostMember } from '../config/types.js';

interface CacheEntry<T> {
	data: T;
	timestamp: number;
	ttl: number;
}

interface CacheOptions {
	ttl?: number; // Time to live in milliseconds
	maxSize?: number; // Maximum number of entries
}

export class ApiCache {
	private cache = new Map<string, CacheEntry<any>>();
	private defaultTTL: number;
	private maxSize: number;

	constructor(options: CacheOptions = {}) {
		this.defaultTTL = options.ttl || 5 * 60 * 1000; // 5 minutes default
		this.maxSize = options.maxSize || 100;
	}

	private generateKey(endpoint: string, params: Record<string, any>): string {
		const sortedParams = Object.keys(params)
			.sort()
			.map((key) => `${key}=${params[key]}`)
			.join('&');
		return `${endpoint}?${sortedParams}`;
	}

	private isExpired(entry: CacheEntry<any>): boolean {
		return Date.now() - entry.timestamp > entry.ttl;
	}

	private evictOldest(): void {
		if (this.cache.size === 0) return;

		let oldestKey = '';
		let oldestTime = Infinity;

		for (const [key, entry] of this.cache.entries()) {
			if (entry.timestamp < oldestTime) {
				oldestTime = entry.timestamp;
				oldestKey = key;
			}
		}

		if (oldestKey) {
			this.cache.delete(oldestKey);
		}
	}

	get<T>(endpoint: string, params: Record<string, any> = {}): T | null {
		const key = this.generateKey(endpoint, params);
		const entry = this.cache.get(key);

		if (!entry) {
			return null;
		}

		if (this.isExpired(entry)) {
			this.cache.delete(key);
			return null;
		}

		return entry.data;
	}

	set<T>(endpoint: string, params: Record<string, any> = {}, data: T, ttl?: number): void {
		// Ensure we don't exceed max size
		while (this.cache.size >= this.maxSize) {
			this.evictOldest();
		}

		const key = this.generateKey(endpoint, params);
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl: ttl || this.defaultTTL
		});
	}

	invalidate(endpoint: string, params?: Record<string, any>): void {
		if (params) {
			const key = this.generateKey(endpoint, params);
			this.cache.delete(key);
		} else {
			// Invalidate all entries for this endpoint
			for (const key of this.cache.keys()) {
				if (key.startsWith(`${endpoint}?`)) {
					this.cache.delete(key);
				}
			}
		}
	}

	clear(): void {
		this.cache.clear();
	}

	// Clean expired entries
	cleanup(): void {
		for (const [key, entry] of this.cache.entries()) {
			if (this.isExpired(entry)) {
				this.cache.delete(key);
			}
		}
	}

	getStats(): {
		size: number;
		maxSize: number;
		hitRate: number;
		entries: Array<{ key: string; age: number; ttl: number }>;
	} {
		const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
			key,
			age: Date.now() - entry.timestamp,
			ttl: entry.ttl
		}));

		return {
			size: this.cache.size,
			maxSize: this.maxSize,
			hitRate: 0, // Could implement hit tracking if needed
			entries
		};
	}
}

export class CachedGhostApiClient {
	private apiClient: any; // Will be injected
	private cache: ApiCache;

	constructor(apiClient: any, cacheOptions?: CacheOptions) {
		this.apiClient = apiClient;
		this.cache = new ApiCache(cacheOptions);

		// Set up periodic cleanup
		setInterval(() => this.cache.cleanup(), 60000); // Every minute
	}

	async getMembers(options: any = {}): Promise<GhostApiResponse<GhostMember>> {
		const cacheKey = 'members';
		const cached = this.cache.get<GhostApiResponse<GhostMember>>(cacheKey, options);

		if (cached) {
			return cached;
		}

		const result = await this.apiClient.getMembers(options);
		this.cache.set(cacheKey, options, result);

		return result;
	}

	async getMember(id: string): Promise<{ members: GhostMember[] }> {
		const cacheKey = `member-${id}`;
		const cached = this.cache.get<{ members: GhostMember[] }>(cacheKey);

		if (cached) {
			return cached;
		}

		const result = await this.apiClient.getMember(id);
		this.cache.set(cacheKey, {}, result, 10 * 60 * 1000); // Cache individual members longer

		return result;
	}

	async searchMembers(query: string, options: any = {}): Promise<GhostApiResponse<GhostMember>> {
		// Don't cache searches as aggressively
		const cacheKey = 'search';
		const params = { query, ...options };
		const cached = this.cache.get<GhostApiResponse<GhostMember>>(cacheKey, params);

		if (cached) {
			return cached;
		}

		const result = await this.apiClient.searchMembers(query, options);
		this.cache.set(cacheKey, params, result, 2 * 60 * 1000); // Shorter TTL for searches

		return result;
	}

	async getMembersByTier(tier: string, options: any = {}): Promise<GhostApiResponse<GhostMember>> {
		const cacheKey = 'members-by-tier';
		const params = { tier, ...options };
		const cached = this.cache.get<GhostApiResponse<GhostMember>>(cacheKey, params);

		if (cached) {
			return cached;
		}

		const result = await this.apiClient.getMembersByTier(tier, options);
		this.cache.set(cacheKey, params, result);

		return result;
	}

	async getMembersByLabel(
		label: string,
		options: any = {}
	): Promise<GhostApiResponse<GhostMember>> {
		const cacheKey = 'members-by-label';
		const params = { label, ...options };
		const cached = this.cache.get<GhostApiResponse<GhostMember>>(cacheKey, params);

		if (cached) {
			return cached;
		}

		const result = await this.apiClient.getMembersByLabel(label, options);
		this.cache.set(cacheKey, params, result);

		return result;
	}

	async getMembersWithFilters(
		filters: any,
		options: any = {}
	): Promise<GhostApiResponse<GhostMember>> {
		const cacheKey = 'members-filtered';
		const params = { filters, ...options };
		const cached = this.cache.get<GhostApiResponse<GhostMember>>(cacheKey, params);

		if (cached) {
			return cached;
		}

		const result = await this.apiClient.getMembersWithFilters(filters, options);
		this.cache.set(cacheKey, params, result);

		return result;
	}

	// Pass-through methods that don't need caching
	async testConnection() {
		return this.apiClient.testConnection();
	}

	buildComplexFilter(filters: any): string {
		return this.apiClient.buildComplexFilter(filters);
	}

	// Cache management methods
	clearCache(): void {
		this.cache.clear();
	}

	invalidateMembers(): void {
		this.cache.invalidate('members');
		this.cache.invalidate('members-by-tier');
		this.cache.invalidate('members-by-label');
		this.cache.invalidate('members-filtered');
	}

	getCacheStats() {
		return this.cache.getStats();
	}
}
