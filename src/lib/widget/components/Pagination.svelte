<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { previous, next, page, of } from '$lib/paraglide/messages.js';

	export let currentPage = 1;
	export let totalPages = 1;
	export let disabled = false;
	export let showPageNumbers = true;
	export let maxVisiblePages = 5;

	const dispatch = createEventDispatcher<{
		pageChange: number;
	}>();

	$: hasPrevious = currentPage > 1;
	$: hasNext = currentPage < totalPages;

	// Calculate visible page numbers
	$: visiblePages = calculateVisiblePages(currentPage, totalPages, maxVisiblePages);

	function calculateVisiblePages(current: number, total: number, max: number): number[] {
		if (total <= max) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		const half = Math.floor(max / 2);
		let start = Math.max(1, current - half);
		let end = Math.min(total, start + max - 1);

		// Adjust start if we're near the end
		if (end - start + 1 < max) {
			start = Math.max(1, end - max + 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}

	function handlePageChange(pageNumber: number) {
		if (pageNumber === currentPage || pageNumber < 1 || pageNumber > totalPages || disabled) {
			return;
		}
		dispatch('pageChange', pageNumber);
	}

	function handlePrevious() {
		if (hasPrevious && !disabled) {
			dispatch('pageChange', currentPage - 1);
		}
	}

	function handleNext() {
		if (hasNext && !disabled) {
			dispatch('pageChange', currentPage + 1);
		}
	}

	function handleKeydown(event: KeyboardEvent, pageNumber: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handlePageChange(pageNumber);
		}
	}
</script>

<div class="pagination">
	<div class="pagination-info">
		<span class="page-info">
			{page()}
			{currentPage}
			{of()}
			{totalPages}
		</span>
	</div>

	<div class="pagination-controls">
		<!-- Previous button -->
		<button
			type="button"
			class="pagination-button pagination-prev"
			on:click={handlePrevious}
			disabled={!hasPrevious || disabled}
			aria-label={previous()}
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="pagination-icon"
			>
				<path
					d="M10 12L6 8L10 4"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<span class="pagination-text">{previous()}</span>
		</button>

		<!-- Page numbers -->
		{#if showPageNumbers && totalPages > 1}
			<div class="page-numbers">
				{#if visiblePages[0] > 1}
					<button
						type="button"
						class="page-button"
						on:click={() => handlePageChange(1)}
						on:keydown={(e) => handleKeydown(e, 1)}
						{disabled}
					>
						1
					</button>
					{#if visiblePages[0] > 2}
						<span class="pagination-ellipsis">…</span>
					{/if}
				{/if}

				{#each visiblePages as pageNum}
					<button
						type="button"
						class="page-button"
						class:active={pageNum === currentPage}
						on:click={() => handlePageChange(pageNum)}
						on:keydown={(e) => handleKeydown(e, pageNum)}
						{disabled}
						aria-label={`Go to page ${pageNum}`}
						aria-current={pageNum === currentPage ? 'page' : undefined}
					>
						{pageNum}
					</button>
				{/each}

				{#if visiblePages[visiblePages.length - 1] < totalPages}
					{#if visiblePages[visiblePages.length - 1] < totalPages - 1}
						<span class="pagination-ellipsis">…</span>
					{/if}
					<button
						type="button"
						class="page-button"
						on:click={() => handlePageChange(totalPages)}
						on:keydown={(e) => handleKeydown(e, totalPages)}
						{disabled}
					>
						{totalPages}
					</button>
				{/if}
			</div>
		{/if}

		<!-- Next button -->
		<button
			type="button"
			class="pagination-button pagination-next"
			on:click={handleNext}
			disabled={!hasNext || disabled}
			aria-label={next()}
		>
			<span class="pagination-text">{next()}</span>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="pagination-icon"
			>
				<path
					d="M6 4L10 8L6 12"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	.pagination {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0;
	}

	.pagination-info {
		display: flex;
		justify-content: center;
	}

	.page-info {
		font-size: 0.875rem;
		color: var(--widget-text-color, #6b7280);
		font-weight: 500;
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.pagination-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--widget-background, #ffffff);
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.2));
		border-radius: var(--widget-border-radius, 8px);
		color: var(--widget-text-color, #374151);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.pagination-button:hover:not(:disabled) {
		background: var(--widget-hover-background, rgba(0, 0, 0, 0.05));
		border-color: var(--widget-primary-color, #1f2937);
	}

	.pagination-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: var(--widget-disabled-background, #f3f4f6);
	}

	.pagination-icon {
		flex-shrink: 0;
	}

	.pagination-text {
		white-space: nowrap;
	}

	.page-numbers {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.page-button {
		min-width: 2.5rem;
		height: 2.5rem;
		padding: 0;
		background: var(--widget-background, #ffffff);
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.2));
		border-radius: var(--widget-border-radius, 8px);
		color: var(--widget-text-color, #374151);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.page-button:hover:not(:disabled):not(.active) {
		background: var(--widget-hover-background, rgba(0, 0, 0, 0.05));
		border-color: var(--widget-primary-color, #1f2937);
	}

	.page-button.active {
		background: var(--widget-primary-color, #1f2937);
		border-color: var(--widget-primary-color, #1f2937);
		color: white;
	}

	.page-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.pagination-ellipsis {
		padding: 0 0.25rem;
		color: var(--widget-text-color, #6b7280);
		font-size: 0.875rem;
	}

	/* RTL adjustments */
	:global(.ghost-member-directory--rtl) .pagination-prev .pagination-icon {
		transform: scaleX(-1);
	}

	:global(.ghost-member-directory--rtl) .pagination-next .pagination-icon {
		transform: scaleX(-1);
	}

	/* Dark theme adjustments */
	:global(.ghost-member-directory--dark) .pagination-button {
		background: #374151;
		border-color: rgba(255, 255, 255, 0.2);
		color: #f9fafb;
	}

	:global(.ghost-member-directory--dark) .pagination-button:hover:not(:disabled) {
		background: #4b5563;
		border-color: var(--widget-primary-color, #60a5fa);
	}

	:global(.ghost-member-directory--dark) .pagination-button:disabled {
		background: #1f2937;
	}

	:global(.ghost-member-directory--dark) .page-button {
		background: #374151;
		border-color: rgba(255, 255, 255, 0.2);
		color: #f9fafb;
	}

	:global(.ghost-member-directory--dark) .page-button:hover:not(:disabled):not(.active) {
		background: #4b5563;
		border-color: var(--widget-primary-color, #60a5fa);
	}

	:global(.ghost-member-directory--dark) .page-button.active {
		background: var(--widget-primary-color, #60a5fa);
		border-color: var(--widget-primary-color, #60a5fa);
	}

	/* Responsive design */
	@media (max-width: 640px) {
		.pagination {
			gap: 0.75rem;
		}

		.pagination-controls {
			flex-wrap: wrap;
			justify-content: center;
		}

		.pagination-text {
			display: none;
		}

		.pagination-button {
			padding: 0.5rem;
			min-width: 2.5rem;
		}

		.page-numbers {
			order: -1;
			width: 100%;
			justify-content: center;
		}
	}
</style>
