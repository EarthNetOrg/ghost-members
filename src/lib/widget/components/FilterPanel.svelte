<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		filterByTier,
		free,
		premium,
		comped,
		active,
		canceled,
		pastDue,
		clearFilters
	} from '$lib/paraglide/messages.js';

	export let filters: Record<string, any> = {};
	export let disabled = false;
	export let availableNewsletters: any[] = [];
	export let showTierFilter = true;
	export let showStatusFilter = true;
	export let showNewsletterFilter = true;

	const dispatch = createEventDispatcher<{
		change: Record<string, any>;
		clear: void;
	}>();

	let selectedTier = filters.tier || '';
	let selectedStatus = filters.status || '';
	let selectedNewsletters = filters.newsletters ? filters.newsletters.split(',') : [];
	let selectedNewsletter = '';

	$: hasFilters = selectedTier || selectedStatus || selectedNewsletters.length > 0;

	// Reactive statement to handle newsletter changes
	$: {
		const currentNewsletters = filters.newsletters || '';
		const newNewsletters = selectedNewsletters.join(',');
		if (newNewsletters !== currentNewsletters) {
			updateFilters();
		}
	}

	function handleTierChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedTier = target.value;
		updateFilters();
	}

	function handleStatusChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedStatus = target.value;
		updateFilters();
	}

	function updateFilters() {
		const newFilters: Record<string, any> = {};

		if (selectedTier) {
			newFilters.tier = selectedTier;
		}

		if (selectedStatus) {
			newFilters.status = selectedStatus;
		}

		if (selectedNewsletters.length > 0) {
			newFilters.newsletters = selectedNewsletters.join(',');
		}

		filters = newFilters;
		dispatch('change', newFilters);
	}

	function handleClearFilters() {
		selectedTier = '';
		selectedStatus = '';
		selectedNewsletters = [];
		filters = {};
		dispatch('clear');
		dispatch('change', {});
	}

	// Update local state when filters prop changes externally
	$: {
		if (filters.tier !== selectedTier) {
			selectedTier = filters.tier || '';
		}
		if (filters.status !== selectedStatus) {
			selectedStatus = filters.status || '';
		}
		const currentNewsletters = selectedNewsletters.join(',');
		const filterNewsletters = filters.newsletters || '';
		if (filterNewsletters !== currentNewsletters) {
			selectedNewsletters = filterNewsletters ? filterNewsletters.split(',') : [];
		}
	}
</script>

<div class="filter-panel">
	<div class="filter-controls">
		{#if showTierFilter}
			<div class="filter-group">
				<label for="tier-filter" class="filter-label">
					{filterByTier()}
				</label>
				<select
					id="tier-filter"
					class="filter-select"
					bind:value={selectedTier}
					on:input={(e) => {
						const target = e.target as HTMLSelectElement;
						selectedTier = target.value;
						handleTierChange(e);
					}}
					{disabled}
				>
					<option value="">All tiers</option>
					<option value="free">{free()}</option>
					<option value="paid">{premium()}</option>
					<option value="comped">{comped()}</option>
				</select>
			</div>
		{/if}

		{#if showStatusFilter}
			<div class="filter-group">
				<label for="status-filter" class="filter-label"> Status </label>
				<select
					id="status-filter"
					class="filter-select"
					bind:value={selectedStatus}
					on:input={(e) => {
						const target = e.target as HTMLSelectElement;
						selectedStatus = target.value;
						handleStatusChange(e);
					}}
					{disabled}
				>
					<option value="">All statuses</option>
					<option value="active">{active()}</option>
					<option value="canceled">{canceled()}</option>
					<option value="past_due">{pastDue()}</option>
				</select>
			</div>
		{/if}

		{#if showNewsletterFilter && availableNewsletters.length > 0}
			<div class="filter-group">
				<label for="newsletter-filter" class="filter-label"> Groups </label>

				<select
					id="newsletter-filter"
					class="filter-select"
					bind:value={selectedNewsletter}
					on:input={(e) => {
						const target = e.target as HTMLSelectElement;
						const value = target.value;
						if (value && !selectedNewsletters.includes(value)) {
							selectedNewsletters = [...selectedNewsletters, value];
							updateFilters();
						}
						// Reset the select to the default option
						selectedNewsletter = '';
					}}
					{disabled}
				>
					<option value="">Select group</option>
					{#each availableNewsletters as newsletter}
						<option value={newsletter.name}>{newsletter.name}</option>
					{/each}
				</select>
			</div>
		{/if}

		{#if hasFilters}
			<button type="button" class="clear-filters-button" on:click={handleClearFilters} {disabled}>
				{clearFilters()}
			</button>
		{/if}
	</div>

	{#if hasFilters}
		<div class="active-filters">
			{#if selectedTier}
				<span class="filter-tag">
					{filterByTier()}:
					{selectedTier === 'free' ? free() : selectedTier === 'paid' ? premium() : comped()}
					<button
						type="button"
						class="remove-filter"
						on:click={() => {
							selectedTier = '';
							updateFilters();
						}}
						{disabled}
						aria-label="Remove tier filter"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 4L4 12M4 4L12 12"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</span>
			{/if}

			{#if selectedStatus}
				<span class="filter-tag">
					Status:
					{selectedStatus === 'active'
						? active()
						: selectedStatus === 'canceled'
							? canceled()
							: pastDue()}
					<button
						type="button"
						class="remove-filter"
						on:click={() => {
							selectedStatus = '';
							updateFilters();
						}}
						{disabled}
						aria-label="Remove status filter"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 4L4 12M4 4L12 12"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</span>
			{/if}

			{#each selectedNewsletters as newsletter}
				<span class="filter-tag">
					Group: {newsletter}
					<button
						type="button"
						class="remove-filter"
						on:click={() => {
							selectedNewsletters = selectedNewsletters.filter((newsletterName: string) => newsletterName !== newsletter);
							updateFilters();
						}}
						{disabled}
						aria-label="Remove {newsletter} filter"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 4L4 12M4 4L12 12"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.filter-panel {
		width: 100%;
	}

	.filter-controls {
		display: flex;
		gap: 1rem;
		align-items: flex-end;
		flex-wrap: wrap;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 120px;
	}

	.filter-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--widget-text-color, #6b7280);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.filter-select {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.2));
		border-radius: var(--widget-border-radius, 8px);
		font-size: 0.875rem;
		background: var(--widget-background, #ffffff);
		color: var(--widget-text-color, #374151);
		cursor: pointer;
		transition: border-color 0.2s;
	}

	.filter-select:focus {
		outline: none;
		border-color: var(--widget-primary-color, #1f2937);
	}

	.filter-select:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--widget-disabled-background, #f3f4f6);
	}


	.clear-filters-button {
		padding: 0.5rem 0.75rem;
		background: transparent;
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.2));
		border-radius: var(--widget-border-radius, 8px);
		color: var(--widget-text-color, #6b7280);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
		height: fit-content;
	}

	.clear-filters-button:hover:not(:disabled) {
		border-color: var(--widget-primary-color, #1f2937);
		color: var(--widget-primary-color, #1f2937);
		background: var(--widget-hover-background, rgba(0, 0, 0, 0.05));
	}

	.clear-filters-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.active-filters {
		margin-top: 0.75rem;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.filter-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.5rem;
		background: var(--widget-primary-color, #1f2937);
		color: white;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.remove-filter {
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		padding: 0;
		margin-left: 0.25rem;
		border-radius: 2px;
		transition: background-color 0.2s;
	}

	.remove-filter:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.2);
	}

	.remove-filter:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Dark theme adjustments */
	:global(.ghost-member-directory--dark) .filter-select {
		border-color: rgba(255, 255, 255, 0.2);
		background: #374151;
		color: #f9fafb;
	}

	:global(.ghost-member-directory--dark) .filter-select:focus {
		border-color: var(--widget-primary-color, #60a5fa);
	}

	:global(.ghost-member-directory--dark) .filter-select:disabled {
		background: #1f2937;
	}

	:global(.ghost-member-directory--dark) .clear-filters-button {
		border-color: rgba(255, 255, 255, 0.2);
		color: #f9fafb;
	}

	:global(.ghost-member-directory--dark) .clear-filters-button:hover:not(:disabled) {
		border-color: var(--widget-primary-color, #60a5fa);
		color: var(--widget-primary-color, #60a5fa);
		background: rgba(255, 255, 255, 0.1);
	}

	/* Responsive design */
	@media (max-width: 640px) {
		.filter-controls {
			flex-direction: column;
			align-items: stretch;
		}

		.filter-group {
			min-width: unset;
		}
	}
</style>
