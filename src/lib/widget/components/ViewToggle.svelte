<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let currentView: 'grid' | 'list' = 'grid';
	export let disabled = false;

	const dispatch = createEventDispatcher<{
		viewChange: 'grid' | 'list';
	}>();

	function handleToggle(view: 'grid' | 'list') {
		if (view !== currentView && !disabled) {
			dispatch('viewChange', view);
		}
	}

	function handleGridClick(event: MouseEvent) {
		event.preventDefault();
		handleToggle('grid');
	}

	function handleListClick(event: MouseEvent) {
		event.preventDefault();
		handleToggle('list');
	}
</script>

<div class="view-toggle" role="radiogroup" aria-label="View options">
	<button
		type="button"
		class="view-toggle-button"
		class:view-toggle-button--active={currentView === 'grid'}
		role="radio"
		aria-checked={currentView === 'grid'}
		aria-label="Grid view"
		title="Grid view"
		on:click={handleGridClick}
		{disabled}
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect
				x="1"
				y="1"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				stroke-width="1.2"
				fill="none"
			/>
			<rect
				x="9"
				y="1"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				stroke-width="1.2"
				fill="none"
			/>
			<rect
				x="1"
				y="9"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				stroke-width="1.2"
				fill="none"
			/>
			<rect
				x="9"
				y="9"
				width="6"
				height="6"
				rx="1"
				stroke="currentColor"
				stroke-width="1.2"
				fill="none"
			/>
		</svg>
	</button>

	<button
		type="button"
		class="view-toggle-button"
		class:view-toggle-button--active={currentView === 'list'}
		role="radio"
		aria-checked={currentView === 'list'}
		aria-label="List view"
		title="List view"
		on:click={handleListClick}
		{disabled}
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="1" y="2" width="14" height="2" rx="1" fill="currentColor" />
			<rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" />
			<rect x="1" y="12" width="14" height="2" rx="1" fill="currentColor" />
		</svg>
	</button>
</div>

<style>
	.view-toggle {
		display: inline-flex;
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.1));
		border-radius: var(--widget-border-radius, 8px);
		overflow: hidden;
		background: var(--widget-background, #ffffff);
	}

	.view-toggle-button {
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--widget-text-color, #6b7280);
		transition: all 0.2s;
		position: relative;
	}

	.view-toggle-button:not(:last-child) {
		border-right: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.1));
	}

	.view-toggle-button:hover:not(:disabled) {
		background: var(--widget-hover-background, rgba(0, 0, 0, 0.05));
		color: var(--widget-primary-color, #1f2937);
	}

	.view-toggle-button:focus {
		outline: none;
		box-shadow: inset 0 0 0 2px var(--widget-primary-color, #1f2937);
	}

	.view-toggle-button--active {
		background: var(--widget-primary-color, #1f2937);
		color: white;
	}

	.view-toggle-button--active:hover:not(:disabled) {
		background: var(--widget-primary-color, #1f2937);
		color: white;
	}

	.view-toggle-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* Dark theme adjustments */
	:global(.ghost-member-directory--dark) .view-toggle {
		border-color: rgba(255, 255, 255, 0.2);
		background: #374151;
	}

	:global(.ghost-member-directory--dark) .view-toggle-button:not(:last-child) {
		border-right-color: rgba(255, 255, 255, 0.2);
	}

	:global(.ghost-member-directory--dark) .view-toggle-button:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
		color: var(--widget-primary-color, #60a5fa);
	}

	:global(.ghost-member-directory--dark) .view-toggle-button--active {
		background: var(--widget-primary-color, #60a5fa);
	}

	:global(.ghost-member-directory--dark) .view-toggle-button--active:hover:not(:disabled) {
		background: var(--widget-primary-color, #60a5fa);
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.view-toggle-button {
			transition: none;
		}
	}
</style>
