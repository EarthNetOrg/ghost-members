<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { error as errorText, retry, close } from '$lib/paraglide/messages.js';

	export let message = '';
	export let showRetry = true;
	export let showClose = false;
	export let retryLabel = '';
	export let closeLabel = '';
	export let variant: 'error' | 'warning' | 'info' = 'error';
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const dispatch = createEventDispatcher<{
		retry: void;
		close: void;
	}>();

	$: displayMessage = message || errorText();
	$: retryButtonLabel = retryLabel || retry();
	$: closeButtonLabel = closeLabel || close();

	function handleRetry() {
		dispatch('retry');
	}

	function handleClose() {
		dispatch('close');
	}

	function handleKeydown(event: KeyboardEvent, action: 'retry' | 'close') {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (action === 'retry') {
				handleRetry();
			} else if (action === 'close') {
				handleClose();
			}
		}
	}
</script>

<div
	class="error-message"
	class:error-message--error={variant === 'error'}
	class:error-message--warning={variant === 'warning'}
	class:error-message--info={variant === 'info'}
	class:error-message--small={size === 'small'}
	class:error-message--medium={size === 'medium'}
	class:error-message--large={size === 'large'}
	role="alert"
	aria-live="assertive"
>
	<div class="error-icon">
		{#if variant === 'error'}
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5" />
				<path d="M10 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				<circle cx="10" cy="14" r="1" fill="currentColor" />
			</svg>
		{:else if variant === 'warning'}
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8.485 2.495c.673-1.326 2.357-1.326 3.03 0l6.28 12.346c.584 1.149-.146 2.538-1.515 2.538H3.72c-1.369 0-2.099-1.389-1.515-2.538L8.485 2.495z"
					stroke="currentColor"
					stroke-width="1.5"
				/>
				<path d="M10 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				<circle cx="10" cy="14" r="1" fill="currentColor" />
			</svg>
		{:else}
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5" />
				<path d="M10 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				<path d="M10 14H10.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
		{/if}
	</div>

	<div class="error-content">
		<p class="error-text">
			{displayMessage}
		</p>

		{#if showRetry || showClose}
			<div class="error-actions">
				{#if showRetry}
					<button
						type="button"
						class="error-button error-button--retry"
						on:click={handleRetry}
						on:keydown={(e) => handleKeydown(e, 'retry')}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 4V10C1 11.6569 2.34315 13 4 13H12C13.6569 13 15 11.6569 15 10V6C15 4.34315 13.6569 3 12 3H4C2.34315 3 1 4.34315 1 6V4Z"
								stroke="currentColor"
								stroke-width="1.5"
							/>
							<path
								d="M4 1L1 4L4 7"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						{retryButtonLabel}
					</button>
				{/if}

				{#if showClose}
					<button
						type="button"
						class="error-button error-button--close"
						on:click={handleClose}
						on:keydown={(e) => handleKeydown(e, 'close')}
						aria-label={closeButtonLabel}
					>
						<svg
							width="16"
							height="16"
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
						<span class="sr-only">{closeButtonLabel}</span>
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.error-message {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem;
		border-radius: var(--widget-border-radius, 8px);
		border: 1px solid;
		background: var(--widget-background, #ffffff);
	}

	.error-message--small {
		padding: 0.75rem;
		gap: 0.5rem;
	}

	.error-message--large {
		padding: 1.5rem;
		gap: 1rem;
	}

	/* Variant styles */
	.error-message--error {
		border-color: #fecaca;
		background: #fef2f2;
		color: #dc2626;
	}

	.error-message--warning {
		border-color: #fed7aa;
		background: #fffbeb;
		color: #d97706;
	}

	.error-message--info {
		border-color: #bfdbfe;
		background: #eff6ff;
		color: #2563eb;
	}

	.error-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.error-content {
		flex: 1;
		min-width: 0;
	}

	.error-text {
		margin: 0 0 1rem;
		font-size: 0.875rem;
		line-height: 1.5;
		font-weight: 500;
	}

	.error-message--small .error-text {
		font-size: 0.75rem;
		margin: 0 0 0.75rem;
	}

	.error-message--large .error-text {
		font-size: 1rem;
		margin: 0 0 1.25rem;
	}

	.error-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.error-button {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 0.375rem;
		border: 1px solid transparent;
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
	}

	.error-message--small .error-button {
		padding: 0.375rem 0.5rem;
		font-size: 0.625rem;
	}

	.error-message--large .error-button {
		padding: 0.625rem 1rem;
		font-size: 0.875rem;
	}

	.error-button--retry {
		background: currentColor;
		color: white;
	}

	.error-button--retry:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.error-button--close {
		background: transparent;
		color: inherit;
		border-color: currentColor;
		opacity: 0.7;
	}

	.error-button--close:hover {
		opacity: 1;
		background: currentColor;
		color: white;
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

	/* Dark theme adjustments */
	:global(.ghost-member-directory--dark) .error-message--error {
		background: #450a0a;
		border-color: #7f1d1d;
		color: #fca5a5;
	}

	:global(.ghost-member-directory--dark) .error-message--warning {
		background: #451a03;
		border-color: #92400e;
		color: #fbbf24;
	}

	:global(.ghost-member-directory--dark) .error-message--info {
		background: #1e3a8a;
		border-color: #3730a3;
		color: #93c5fd;
	}

	/* RTL adjustments */
	:global(.ghost-member-directory--rtl) .error-message {
		flex-direction: row-reverse;
	}

	:global(.ghost-member-directory--rtl) .error-actions {
		flex-direction: row-reverse;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.error-message {
			border-width: 2px;
		}

		.error-text {
			font-weight: 600;
		}

		.error-button {
			border-width: 2px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.error-button {
			transition: none;
		}

		.error-button--retry:hover {
			transform: none;
		}
	}
</style>
