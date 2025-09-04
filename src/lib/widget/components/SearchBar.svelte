<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { searchMembers } from '$lib/paraglide/messages.js';

	export let value = '';
	export let placeholder = '';
	export let disabled = false;

	const dispatch = createEventDispatcher<{
		search: string;
		clear: void;
	}>();

	let searchInput: HTMLInputElement;
	
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		dispatch('search', value);
	}

	function handleClear() {
		value = '';
		dispatch('clear');
		dispatch('search', '');
		if (searchInput) {
			searchInput.focus();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClear();
		}
	}
</script>

<div class="search-bar">
	<div class="search-input-container">
		<svg 
			class="search-icon" 
			width="16" 
			height="16" 
			viewBox="0 0 16 16" 
			fill="none" 
			xmlns="http://www.w3.org/2000/svg"
		>
			<path 
				d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" 
				stroke="currentColor" 
				stroke-width="1.5" 
				stroke-linecap="round" 
				stroke-linejoin="round"
			/>
			<path 
				d="M14 14L10.5 10.5" 
				stroke="currentColor" 
				stroke-width="1.5" 
				stroke-linecap="round" 
				stroke-linejoin="round"
			/>
		</svg>
		
		<input
			bind:this={searchInput}
			type="text"
			class="search-input"
			{value}
			placeholder={placeholder || searchMembers()}
			{disabled}
			on:input={handleInput}
			on:keydown={handleKeydown}
		/>
		
		{#if value}
			<button
				type="button"
				class="clear-button"
				on:click={handleClear}
				{disabled}
				aria-label="Clear search"
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path 
						d="M12 4L4 12M4 4L12 12" 
						stroke="currentColor" 
						stroke-width="1.5" 
						stroke-linecap="round" 
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}
	</div>
</div>

<style>
	.search-bar {
		width: 100%;
		max-width: 400px;
	}

	.search-input-container {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 0.75rem;
		color: var(--widget-text-color, #6b7280);
		pointer-events: none;
		z-index: 1;
	}

	.search-input {
		width: 100%;
		padding: 0.75rem 0.75rem 0.75rem 2.5rem;
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.2));
		border-radius: var(--widget-border-radius, 8px);
		font-size: 0.875rem;
		background: var(--widget-background, #ffffff);
		color: var(--widget-text-color, #374151);
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--widget-primary-color, #1f2937);
		box-shadow: 0 0 0 2px var(--widget-primary-color, #1f2937)25;
	}

	.search-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background: var(--widget-disabled-background, #f3f4f6);
	}

	.clear-button {
		position: absolute;
		right: 0.75rem;
		padding: 0.25rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--widget-text-color, #6b7280);
		border-radius: 4px;
		transition: color 0.2s, background-color 0.2s;
	}

	.clear-button:hover:not(:disabled) {
		color: var(--widget-primary-color, #1f2937);
		background-color: var(--widget-hover-background, rgba(0, 0, 0, 0.05));
	}

	.clear-button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* RTL adjustments */
	:global(.ghost-member-directory--rtl) .search-icon {
		left: auto;
		right: 0.75rem;
	}

	:global(.ghost-member-directory--rtl) .search-input {
		padding: 0.75rem 2.5rem 0.75rem 0.75rem;
	}

	:global(.ghost-member-directory--rtl) .clear-button {
		right: auto;
		left: 0.75rem;
	}

	/* Dark theme adjustments */
	:global(.ghost-member-directory--dark) .search-input {
		border-color: rgba(255, 255, 255, 0.2);
		background: #374151;
		color: #f9fafb;
	}

	:global(.ghost-member-directory--dark) .search-input:focus {
		border-color: var(--widget-primary-color, #60a5fa);
		box-shadow: 0 0 0 2px var(--widget-primary-color, #60a5fa)25;
	}

	:global(.ghost-member-directory--dark) .search-input:disabled {
		background: #1f2937;
	}
</style>