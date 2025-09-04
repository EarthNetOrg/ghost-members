<script lang="ts">
	import { loading } from '$lib/paraglide/messages.js';

	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let message = '';
	export let showMessage = true;
	export let inline = false;

	$: displayMessage = message || loading();
	$: spinnerSize = getSizeValues(size);

	function getSizeValues(size: string) {
		switch (size) {
			case 'small':
				return { width: 16, height: 16, strokeWidth: 2 };
			case 'large':
				return { width: 48, height: 48, strokeWidth: 2 };
			default: // medium
				return { width: 24, height: 24, strokeWidth: 2 };
		}
	}
</script>

<div
	class="loading-spinner"
	class:loading-spinner--inline={inline}
	class:loading-spinner--small={size === 'small'}
	class:loading-spinner--medium={size === 'medium'}
	class:loading-spinner--large={size === 'large'}
	role="status"
	aria-live="polite"
	aria-label={displayMessage}
>
	<svg
		class="spinner"
		width={spinnerSize.width}
		height={spinnerSize.height}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			class="spinner-track"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			stroke-width={spinnerSize.strokeWidth}
			stroke-opacity="0.2"
		/>
		<circle
			class="spinner-head"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			stroke-width={spinnerSize.strokeWidth}
			stroke-linecap="round"
			stroke-dasharray="31.416"
			stroke-dashoffset="31.416"
		/>
	</svg>

	{#if showMessage && displayMessage}
		<span class="loading-message" class:sr-only={inline}>
			{displayMessage}
		</span>
	{/if}
</div>

<style>
	.loading-spinner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 2rem;
		color: var(--widget-primary-color, #1f2937);
	}

	.loading-spinner--inline {
		display: inline-flex;
		flex-direction: row;
		padding: 0;
		gap: 0.5rem;
	}

	.loading-spinner--small {
		gap: 0.5rem;
		padding: 1rem;
	}

	.loading-spinner--large {
		gap: 1rem;
		padding: 3rem;
	}

	.spinner {
		flex-shrink: 0;
		animation: spin 1s linear infinite;
	}

	.spinner-track {
		opacity: 0.2;
	}

	.spinner-head {
		animation: dash 1.5s ease-in-out infinite;
		transform-origin: center;
	}

	.loading-message {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--widget-text-color, #6b7280);
		text-align: center;
		max-width: 200px;
	}

	.loading-spinner--small .loading-message {
		font-size: 0.75rem;
	}

	.loading-spinner--large .loading-message {
		font-size: 1rem;
	}

	.loading-spinner--inline .loading-message {
		font-size: 0.875rem;
		white-space: nowrap;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* Animation keyframes */
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 0 31.416;
			transform: rotate(0deg);
		}
		50% {
			stroke-dasharray: 15.708 15.708;
			transform: rotate(45deg);
		}
		100% {
			stroke-dasharray: 31.416 0;
			transform: rotate(360deg);
		}
	}

	/* Dark theme adjustments */
	:global(.ghost-member-directory--dark) .loading-spinner {
		color: var(--widget-primary-color, #60a5fa);
	}

	:global(.ghost-member-directory--dark) .loading-message {
		color: #d1d5db;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.spinner-track {
			opacity: 0.5;
		}

		.loading-message {
			font-weight: 600;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation: pulse 2s ease-in-out infinite;
		}

		.spinner-head {
			animation: none;
			stroke-dasharray: 31.416;
			stroke-dashoffset: 0;
		}

		@keyframes pulse {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.5;
			}
		}
	}

	/* RTL adjustments */
	:global(.ghost-member-directory--rtl) .loading-spinner--inline {
		flex-direction: row-reverse;
	}
</style>
