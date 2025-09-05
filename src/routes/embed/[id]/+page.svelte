<script lang="ts">
	import { goto } from '$app/navigation';
	import MemberDirectoryWidget from '$lib/widget/MemberDirectoryWidget.svelte';
	import { ConfigManager } from '$lib/config/index.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading = false;
	let searchQuery = data.searchQuery;
	let selectedFilters = data.filters;

	// Create config manager from server data
	$: config = new ConfigManager(data.config);

	// Handle loading state (you can add loading logic here if needed)

	async function handleSearch(query: string) {
		searchQuery = query;
		await updateUrl();
	}

	async function handleFilterChange(filters: any) {
		selectedFilters = filters;
		await updateUrl();
	}

	async function handlePageChange(pageNum: number) {
		await updateUrl({ page: pageNum });
	}

	async function updateUrl(additionalParams: Record<string, any> = {}) {
		const url = new URL(window.location.href);

		// Update search query
		if (searchQuery) {
			url.searchParams.set('q', searchQuery);
		} else {
			url.searchParams.delete('q');
		}

		// Update filters
		if (selectedFilters.tier) {
			url.searchParams.set('tier', selectedFilters.tier);
		} else {
			url.searchParams.delete('tier');
		}

		if (selectedFilters.status) {
			url.searchParams.set('status', selectedFilters.status);
		} else {
			url.searchParams.delete('status');
		}

		if (selectedFilters.newsletters) {
			url.searchParams.set('newsletters', selectedFilters.newsletters);
		} else {
			url.searchParams.delete('newsletters');
		}

		// Handle page changes
		if (additionalParams.page) {
			url.searchParams.set('page', additionalParams.page.toString());
		} else if (
			!additionalParams.page &&
			(searchQuery !== data.searchQuery ||
				JSON.stringify(selectedFilters) !== JSON.stringify(data.filters))
		) {
			// Reset to page 1 when search/filters change
			url.searchParams.delete('page');
		}

		await goto(url.toString(), { replaceState: true, noScroll: true });
	}
</script>

<svelte:head>
	<title>Member Directory Widget</title>
	<meta
		name="description"
		content="Ghost Member Directory Widget - Multilingual member directory with RTL support"
	/>
	<!-- Allow iframe embedding from any domain -->
	<meta http-equiv="content-security-policy" content="frame-ancestors *;" />
</svelte:head>

<div class="embed-container">
	<MemberDirectoryWidget
		{config}
		members={data.members}
		totalMembers={data.totalMembers}
		currentPage={data.currentPage}
		totalPages={data.totalPages}
		{loading}
		initialSearchQuery={searchQuery}
		initialFilters={selectedFilters}
		availableNewsletters={data.availableNewsletters || []}
		on:search={(e) => handleSearch(e.detail)}
		on:filterChange={(e) => handleFilterChange(e.detail)}
		on:pageChange={(e) => handlePageChange(e.detail)}
	/>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
		background: transparent;
	}

	.embed-container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* Override widget styles for iframe context */
	:global(.ghost-member-directory) {
		border: none !important;
		box-shadow: none !important;
		background: transparent !important;
	}
</style>
