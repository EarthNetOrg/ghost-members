<script lang="ts">
	import type { ConfigManager } from '../config/index.js';
	import { GhostApiClient } from '../api/ghost.js';
	import { CachedGhostApiClient } from '../api/cache.js';
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages.js';
	import { setLocale, locales } from '$lib/paraglide/runtime.js';
	
	// Components that we'll create
	// import MemberGrid from './components/MemberGrid.svelte';
	// import SearchBar from './components/SearchBar.svelte';
	// import FilterPanel from './components/FilterPanel.svelte';
	// import Pagination from './components/Pagination.svelte';
	// import LoadingSpinner from './components/LoadingSpinner.svelte';
	// import ErrorMessage from './components/ErrorMessage.svelte';

	export let config: ConfigManager;

	let apiClient: CachedGhostApiClient | null = null;
	let loading = true;
	let error: string | null = null;
	let members: any[] = [];
	let totalMembers = 0;
	let currentPage = 1;
	let searchQuery = '';
	let selectedFilters: any = {};

	// Reactive configuration
	$: configData = config.get();
	$: isRTL = config.isRTL();
	$: pageSize = configData.defaultPageSize;

	onMount(async () => {
		try {
			// Set up language
			if (configData.autoDetectLanguage) {
				const browserLang = navigator.language.split('-')[0];
				if (locales.includes(browserLang as any)) {
					setLocale(browserLang as any);
				} else {
					setLocale(configData.defaultLanguage as any);
				}
			} else {
				setLocale(configData.defaultLanguage as any);
			}

			// Initialize API client
			const ghostClient = GhostApiClient.fromConfig(config);
			
			if (configData.enableCaching) {
				apiClient = new CachedGhostApiClient(ghostClient, {
					ttl: configData.cacheDuration * 1000,
					maxSize: 100
				});
			} else {
				apiClient = ghostClient as any;
			}

			// Test connection
			const connectionTest = await apiClient.testConnection();
			if (!connectionTest.success) {
				throw new Error(connectionTest.message);
			}

			// Load initial data
			await loadMembers();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to initialize widget';
			loading = false;
		}
	});

	async function loadMembers() {
		if (!apiClient) return;
		
		try {
			loading = true;
			error = null;

			const options = {
				page: currentPage,
				limit: pageSize,
				order: 'created_at DESC'
			};

			let response;
			if (searchQuery.trim()) {
				response = await apiClient.searchMembers(searchQuery, options);
			} else if (Object.keys(selectedFilters).length > 0) {
				response = await apiClient.getMembersWithFilters(selectedFilters, options);
			} else {
				response = await apiClient.getMembers(options);
			}

			members = response.data || [];
			totalMembers = response.meta?.pagination?.total || 0;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load members';
			members = [];
			totalMembers = 0;
		} finally {
			loading = false;
		}
	}

	async function handleSearch(query: string) {
		searchQuery = query;
		currentPage = 1;
		await loadMembers();
	}

	async function handleFilterChange(filters: any) {
		selectedFilters = filters;
		currentPage = 1;
		await loadMembers();
	}

	async function handlePageChange(page: number) {
		currentPage = page;
		await loadMembers();
	}

	function handleRetry() {
		loadMembers();
	}
</script>

<!-- Widget Container -->
<div 
	class="ghost-member-directory"
	class:ghost-member-directory--rtl={isRTL}
	class:ghost-member-directory--dark={configData.widgetTheme === 'dark'}
	class:ghost-member-directory--light={configData.widgetTheme === 'light'}
>
	<!-- Header -->
	<div class="directory-header">
		<h2 class="directory-title">
			{m.memberDirectory()}
		</h2>
		
		{#if configData.showMemberCount && totalMembers > 0}
			<div class="member-count">
				{totalMembers} members
			</div>
		{/if}
	</div>

	<!-- Search and Filters -->
	{#if configData.enableSearch || configData.enableFilters}
		<div class="directory-controls">
			{#if configData.enableSearch}
				<!-- <SearchBar
					value={searchQuery}
					placeholder={m.searchMembers()}
					on:search={e => handleSearch(e.detail)}
				/> -->
				<div class="search-placeholder">
					<input
						type="text"
						placeholder={m.searchMembers()}
						bind:value={searchQuery}
						on:input={e => handleSearch(e.target.value)}
						class="search-input"
					/>
				</div>
			{/if}

			{#if configData.enableFilters}
				<!-- <FilterPanel
					filters={selectedFilters}
					on:change={e => handleFilterChange(e.detail)}
				/> -->
				<div class="filter-placeholder">
					<select 
						class="filter-select"
						on:change={e => handleFilterChange({ tier: e.target.value })}
					>
						<option value="">{m.filterByTier()}</option>
						<option value="free">{m.free()}</option>
						<option value="paid">{m.premium()}</option>
					</select>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Content Area -->
	<div class="directory-content">
		{#if loading}
			<div class="loading-state">
				<!-- <LoadingSpinner /> -->
				<div class="loading-placeholder">
					{m.loadingMembers()}
				</div>
			</div>
		{:else if error}
			<div class="error-state">
				<!-- <ErrorMessage 
					message={error}
					on:retry={handleRetry}
				/> -->
				<div class="error-placeholder">
					<p class="error-message">{error}</p>
					<button 
						class="retry-button"
						on:click={handleRetry}
					>
						{m.retry()}
					</button>
				</div>
			</div>
		{:else if members.length === 0}
			<div class="empty-state">
				<p class="empty-message">
					{searchQuery ? m.noResultsFound() : 'No members'}
				</p>
			</div>
		{:else}
			<!-- Member Grid -->
			<div class="member-grid">
				{#each members as member (member.id)}
					<div class="member-card">
						{#if configData.showAvatars && member.avatar_image}
							<div class="member-avatar">
								<img 
									src={member.avatar_image} 
									alt={member.name || 'Member'}
									loading="lazy"
								/>
							</div>
						{/if}
						
						<div class="member-info">
							<h3 class="member-name">
								{configData.showRealNames ? member.name : 'Member'}
							</h3>
							
							{#if configData.showJoinDates}
								<p class="member-joined">
									{m.memberSince({ date: new Date(member.created_at).toLocaleDateString() })}
								</p>
							{/if}
							
							{#if member.subscriptions?.length > 0}
								<div class="member-tiers">
									{#each member.subscriptions as subscription}
										<span 
											class="tier-badge tier-{subscription.tier.type}"
										>
											{subscription.tier.type === 'free' ? m.free() : m.premium()}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalMembers > pageSize}
				<div class="directory-pagination">
					<!-- <Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(totalMembers / pageSize)}
						on:pageChange={e => handlePageChange(e.detail)}
					/> -->
					<div class="pagination-placeholder">
						<button 
							disabled={currentPage === 1}
							on:click={() => handlePageChange(currentPage - 1)}
						>
							{m.previous()}
						</button>
						
						<span class="page-info">
							{m.page()} {currentPage} {m.of()} {Math.ceil(totalMembers / pageSize)}
						</span>
						
						<button 
							disabled={currentPage >= Math.ceil(totalMembers / pageSize)}
							on:click={() => handlePageChange(currentPage + 1)}
						>
							{m.next()}
						</button>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.ghost-member-directory {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
		font-family: var(--widget-font-family, system-ui);
		color: var(--widget-text-color, #374151);
		background: var(--widget-background, #ffffff);
		border-radius: var(--widget-border-radius, 8px);
	}

	.directory-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.directory-title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--widget-primary-color, #1f2937);
	}

	.member-count {
		font-size: 0.875rem;
		color: var(--widget-text-color, #6b7280);
	}

	.directory-controls {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.search-input {
		flex: 1;
		min-width: 200px;
		padding: 0.5rem 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: var(--widget-border-radius, 8px);
		font-size: 0.875rem;
		background: var(--widget-background, #ffffff);
		color: var(--widget-text-color, #374151);
	}

	.filter-select {
		padding: 0.5rem 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: var(--widget-border-radius, 8px);
		font-size: 0.875rem;
		background: var(--widget-background, #ffffff);
		color: var(--widget-text-color, #374151);
	}

	.directory-content {
		min-height: 200px;
	}

	.loading-placeholder,
	.error-placeholder,
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
		text-align: center;
	}

	.error-message {
		margin: 0 0 1rem;
		color: #dc2626;
	}

	.retry-button {
		padding: 0.5rem 1rem;
		background: var(--widget-primary-color, #1f2937);
		color: white;
		border: none;
		border-radius: var(--widget-border-radius, 8px);
		cursor: pointer;
		font-size: 0.875rem;
	}

	.member-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.member-card {
		background: var(--widget-background, #ffffff);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: var(--widget-border-radius, 8px);
		padding: 1rem;
		display: flex;
		gap: 0.75rem;
		transition: box-shadow 0.2s;
	}

	.member-card:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.member-avatar img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
	}

	.member-info {
		flex: 1;
	}

	.member-name {
		margin: 0 0 0.25rem;
		font-size: 1rem;
		font-weight: 500;
		color: var(--widget-primary-color, #1f2937);
	}

	.member-joined {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		color: var(--widget-text-color, #6b7280);
	}

	.member-tiers {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
	}

	.tier-badge {
		padding: 0.125rem 0.375rem;
		font-size: 0.625rem;
		font-weight: 500;
		text-transform: uppercase;
		border-radius: 0.25rem;
	}

	.tier-free {
		background: #e5e7eb;
		color: #374151;
	}

	.tier-paid {
		background: var(--widget-primary-color, #1f2937);
		color: white;
	}

	.pagination-placeholder {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	.pagination-placeholder button {
		padding: 0.5rem 1rem;
		background: var(--widget-primary-color, #1f2937);
		color: white;
		border: none;
		border-radius: var(--widget-border-radius, 8px);
		cursor: pointer;
		font-size: 0.875rem;
	}

	.pagination-placeholder button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.page-info {
		font-size: 0.875rem;
		color: var(--widget-text-color, #6b7280);
	}

	/* RTL adjustments */
	.ghost-member-directory--rtl .directory-header {
		flex-direction: row-reverse;
	}

	.ghost-member-directory--rtl .member-card {
		flex-direction: row-reverse;
	}

	.ghost-member-directory--rtl .member-tiers {
		justify-content: flex-end;
	}

	/* Dark theme adjustments */
	.ghost-member-directory--dark .directory-header {
		border-bottom-color: rgba(255, 255, 255, 0.1);
	}

	.ghost-member-directory--dark .search-input,
	.ghost-member-directory--dark .filter-select {
		border-color: rgba(255, 255, 255, 0.2);
		background: #374151;
		color: #f9fafb;
	}

	.ghost-member-directory--dark .member-card {
		background: #374151;
		border-color: rgba(255, 255, 255, 0.1);
	}

	/* Responsive design */
	@media (max-width: 640px) {
		.ghost-member-directory {
			padding: 0.75rem;
		}

		.directory-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.directory-controls {
			flex-direction: column;
		}

		.search-input {
			min-width: unset;
		}

		.member-grid {
			grid-template-columns: 1fr;
		}
	}
</style>