import { writable, derived, type Readable } from 'svelte/store';
import type { GhostMember, GhostApiResponse, MemberFilters } from '../config/types.js';
import type { CachedGhostApiClient } from '../api/cache.js';

export interface MemberState {
	members: GhostMember[];
	loading: boolean;
	error: string | null;
	pagination: {
		currentPage: number;
		totalPages: number;
		totalMembers: number;
		pageSize: number;
	};
}

export interface SearchState {
	query: string;
	active: boolean;
}

export interface FilterState {
	tier?: string;
	label?: string;
	status?: 'free' | 'paid' | 'comped';
	dateRange?: {
		start: Date;
		end: Date;
	};
	active: boolean;
}

export interface SortState {
	field: 'name' | 'created_at' | 'updated_at';
	direction: 'asc' | 'desc';
}

class MemberStore {
	private memberState = writable<MemberState>({
		members: [],
		loading: false,
		error: null,
		pagination: {
			currentPage: 1,
			totalPages: 0,
			totalMembers: 0,
			pageSize: 24
		}
	});

	private searchState = writable<SearchState>({
		query: '',
		active: false
	});

	private filterState = writable<FilterState>({
		active: false
	});

	private sortState = writable<SortState>({
		field: 'created_at',
		direction: 'desc'
	});

	private apiClient: CachedGhostApiClient | null = null;

	// Public readable stores
	public readonly members: Readable<MemberState> = this.memberState;
	public readonly search: Readable<SearchState> = this.searchState;
	public readonly filters: Readable<FilterState> = this.filterState;
	public readonly sort: Readable<SortState> = this.sortState;

	// Derived stores
	public readonly hasActiveFilters = derived(
		[this.searchState, this.filterState],
		([search, filters]) => search.active || filters.active
	);

	public readonly isLoading = derived(this.memberState, ($memberState) => $memberState.loading);

	public readonly hasError = derived(
		this.memberState,
		($memberState) => $memberState.error !== null
	);

	public readonly isEmpty = derived(
		this.memberState,
		($memberState) => !$memberState.loading && $memberState.members.length === 0
	);

	public readonly totalResults = derived(
		this.memberState,
		($memberState) => $memberState.pagination.totalMembers
	);

	setApiClient(client: CachedGhostApiClient): void {
		this.apiClient = client;
	}

	// Actions
	async loadMembers(page: number = 1): Promise<void> {
		if (!this.apiClient) {
			this.setError('API client not initialized');
			return;
		}

		try {
			this.setLoading(true);
			this.clearError();

			const currentState = this.getCurrentState();
			const searchState = this.getCurrentSearchState();
			const filterState = this.getCurrentFilterState();
			const sortState = this.getCurrentSortState();

			const options = {
				page,
				limit: currentState.pagination.pageSize,
				order: `${sortState.field} ${sortState.direction.toUpperCase()}`
			};

			let response: GhostApiResponse<GhostMember>;

			if (searchState.active && searchState.query.trim()) {
				response = await this.apiClient.searchMembers(searchState.query, options);
			} else if (filterState.active) {
				const filters: MemberFilters = {};

				if (filterState.tier) filters.tier = filterState.tier;
				if (filterState.label) filters.label = filterState.label;
				if (filterState.status) filters.status = filterState.status;
				if (filterState.dateRange) {
					filters.created_at = {
						gte: filterState.dateRange.start.toISOString(),
						lte: filterState.dateRange.end.toISOString()
					};
				}

				response = await this.apiClient.getMembersWithFilters(filters, options);
			} else {
				response = await this.apiClient.getMembers(options);
			}

			this.memberState.update((state) => ({
				...state,
				members: response.data || [],
				pagination: {
					currentPage: page,
					totalPages: response.meta?.pagination?.pages || 0,
					totalMembers: response.meta?.pagination?.total || 0,
					pageSize: response.meta?.pagination?.limit || state.pagination.pageSize
				}
			}));
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Failed to load members');
		} finally {
			this.setLoading(false);
		}
	}

	async searchMembers(query: string): Promise<void> {
		this.searchState.update((state) => ({
			query: query.trim(),
			active: query.trim().length > 0
		}));

		await this.loadMembers(1);
	}

	async applyFilters(filters: Partial<FilterState>): Promise<void> {
		this.filterState.update((state) => {
			const newState = { ...state, ...filters };
			newState.active = !!(
				newState.tier ||
				newState.label ||
				newState.status ||
				newState.dateRange
			);
			return newState;
		});

		await this.loadMembers(1);
	}

	async clearFilters(): Promise<void> {
		this.filterState.set({ active: false });
		this.searchState.set({ query: '', active: false });
		await this.loadMembers(1);
	}

	async changePage(page: number): Promise<void> {
		const currentState = this.getCurrentState();
		if (page >= 1 && page <= currentState.pagination.totalPages) {
			await this.loadMembers(page);
		}
	}

	async nextPage(): Promise<void> {
		const currentState = this.getCurrentState();
		if (currentState.pagination.currentPage < currentState.pagination.totalPages) {
			await this.loadMembers(currentState.pagination.currentPage + 1);
		}
	}

	async prevPage(): Promise<void> {
		const currentState = this.getCurrentState();
		if (currentState.pagination.currentPage > 1) {
			await this.loadMembers(currentState.pagination.currentPage - 1);
		}
	}

	async changeSort(field: SortState['field'], direction?: SortState['direction']): Promise<void> {
		const currentSort = this.getCurrentSortState();

		const newDirection =
			direction ||
			(currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc');

		this.sortState.set({ field, direction: newDirection });
		await this.loadMembers(1);
	}

	setPageSize(pageSize: number): void {
		this.memberState.update((state) => ({
			...state,
			pagination: {
				...state.pagination,
				pageSize,
				totalPages: Math.ceil(state.pagination.totalMembers / pageSize)
			}
		}));
	}

	// Utility methods
	private setLoading(loading: boolean): void {
		this.memberState.update((state) => ({ ...state, loading }));
	}

	private setError(error: string): void {
		this.memberState.update((state) => ({ ...state, error }));
	}

	private clearError(): void {
		this.memberState.update((state) => ({ ...state, error: null }));
	}

	private getCurrentState(): MemberState {
		let currentState: MemberState;
		this.memberState.subscribe((state) => (currentState = state))();
		return currentState!;
	}

	private getCurrentSearchState(): SearchState {
		let currentState: SearchState;
		this.searchState.subscribe((state) => (currentState = state))();
		return currentState!;
	}

	private getCurrentFilterState(): FilterState {
		let currentState: FilterState;
		this.filterState.subscribe((state) => (currentState = state))();
		return currentState!;
	}

	private getCurrentSortState(): SortState {
		let currentState: SortState;
		this.sortState.subscribe((state) => (currentState = state))();
		return currentState!;
	}

	// Reset store
	reset(): void {
		this.memberState.set({
			members: [],
			loading: false,
			error: null,
			pagination: {
				currentPage: 1,
				totalPages: 0,
				totalMembers: 0,
				pageSize: 24
			}
		});

		this.searchState.set({ query: '', active: false });
		this.filterState.set({ active: false });
		this.sortState.set({ field: 'created_at', direction: 'desc' });
	}
}

// Export singleton instance
export const memberStore = new MemberStore();
