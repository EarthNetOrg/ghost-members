<script lang="ts">
	import type { ConfigManager } from '../config/index.js';
	import { onMount, createEventDispatcher } from 'svelte';
	import { 
		memberDirectory, 
		searchMembers, 
		filterByTier, 
		free, 
		premium, 
		loadingMembers, 
		noResultsFound, 
		memberSince, 
		retry,
		previous,
		next,
		page,
		of
	} from '$lib/paraglide/messages.js';
	import { setLocale, locales, getLocale } from '$lib/paraglide/runtime.js';
	
	// Components
	import MemberGrid from './components/MemberGrid.svelte';
	import SearchBar from './components/SearchBar.svelte';
	import FilterPanel from './components/FilterPanel.svelte';
	import Pagination from './components/Pagination.svelte';
	import LoadingSpinner from './components/LoadingSpinner.svelte';
	import ErrorMessage from './components/ErrorMessage.svelte';

	export let config: ConfigManager;
	
	// Optional props for server-side data
	export let members: any[] = [];
	export let totalMembers: number = 0;
	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let loading: boolean = false;
	export let initialSearchQuery: string = '';
	export let initialFilters: any = {};

	// Component state
	let error: string | null = null;
	let searchQuery = initialSearchQuery;
	let selectedFilters: any = initialFilters;

	// Reactive configuration
	$: configData = config.get();
	$: isRTL = config.isRTL();
	$: pageSize = configData.defaultPageSize;
	
	// Set the locale immediately when the config changes  
	$: if (configData.defaultLanguage && locales.includes(configData.defaultLanguage as any)) {
		console.log('Language changed to:', configData.defaultLanguage);
		console.log('Current locale before change:', getLocale());
		setLocale(configData.defaultLanguage as any);
		console.log('New locale set:', getLocale());
	}

	const dispatch = createEventDispatcher<{
		search: string;
		filterChange: any;
		pageChange: number;
	}>();

	onMount(() => {
		// Set up language - prioritize configured language 
		console.log('Setting up language. Default:', configData.defaultLanguage);
		console.log('Available locales:', locales);
		
		// Force set the configured language (will also trigger reactive statement above)
		if (configData.defaultLanguage && locales.includes(configData.defaultLanguage as any)) {
			console.log('Setting locale to configured language:', configData.defaultLanguage);
			setLocale(configData.defaultLanguage as any);
		} else {
			console.log('Fallback to English');
			setLocale('en' as any);
		}
		
		console.log('Current locale after setting:', getLocale());
		console.log('Widget mounted in server-side only mode');
	});

	// loadMembers function removed - we now only use server-side data

	function handleSearch(query: string) {
		searchQuery = query;
		dispatch('search', query);
	}

	function handleFilterChange(filters: any) {
		selectedFilters = filters;
		dispatch('filterChange', filters);
	}

	function handlePageChange(page: number) {
		dispatch('pageChange', page);
	}

	function handleRetry() {
		// Retry is handled by server-side data refetch
		dispatch('retry');
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
			{memberDirectory()}
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
				<SearchBar
					value={searchQuery}
					placeholder={searchMembers()}
					disabled={loading}
					on:search={e => handleSearch(e.detail)}
					on:clear={() => handleSearch('')}
				/>
			{/if}

			{#if configData.enableFilters}
				<FilterPanel
					filters={selectedFilters}
					disabled={loading}
					on:change={e => handleFilterChange(e.detail)}
					on:clear={() => handleFilterChange({})}
				/>
			{/if}
		</div>
	{/if}

	<!-- Content Area -->
	<div class="directory-content">
		{#if loading}
			<div class="loading-state">
				<LoadingSpinner 
					size="large"
					message={loadingMembers()}
				/>
			</div>
		{:else if error}
			<div class="error-state">
				<ErrorMessage 
					message={error}
					variant="error"
					size="large"
					showRetry={true}
					retryLabel={retry()}
					on:retry={handleRetry}
				/>
			</div>
		{:else if members.length === 0}
			<div class="empty-state">
				<p class="empty-message">
					{searchQuery ? noResultsFound() : 'No members'}
				</p>
			</div>
		{:else}
			<!-- Member Grid -->
			<MemberGrid 
				{members}
				showAvatars={configData.showAvatars}
				showRealNames={configData.showRealNames}
				showJoinDates={configData.showJoinDates}
				showTiers={true}
				{loading}
				layout="grid"
				clickable={false}
			/>

			<!-- Pagination -->
			{#if totalMembers > 0}
				<div class="directory-pagination">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						disabled={loading}
						showPageNumbers={true}
						maxVisiblePages={5}
						on:pageChange={e => handlePageChange(e.detail)}
					/>
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


	.directory-content {
		min-height: 200px;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
		text-align: center;
	}


	/* RTL adjustments */
	.ghost-member-directory--rtl .directory-header {
		flex-direction: row-reverse;
	}


	/* Dark theme adjustments */
	.ghost-member-directory--dark .directory-header {
		border-bottom-color: rgba(255, 255, 255, 0.1);
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

	}
</style>