<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { memberSince, viewProfile, free, premium, comped } from '$lib/paraglide/messages.js';

	export let members: any[] = [];
	export let showAvatars = true;
	export let showRealNames = true;
	export let showJoinDates = true;
	export let showTiers = true;
	export let showProfiles = false;
	export let loading = false;
	export let layout: 'grid' | 'list' = 'grid';
	export let clickable = false;


	const dispatch = createEventDispatcher<{
		memberClick: { member: any };
		profileClick: { member: any };
	}>();

	function handleMemberClick(member: any) {
		dispatch('memberClick', { member });
	}

	function handleProfileClick(member: any, event: Event) {
		event.stopPropagation();
		dispatch('profileClick', { member });
	}

	function formatJoinDate(dateString: string): string {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString();
		} catch (error) {
			return dateString;
		}
	}

	function getMemberTiers(member: any): string[] {
		if (!member.subscriptions || !Array.isArray(member.subscriptions)) {
			return [];
		}

		return member.subscriptions
			.map((sub: any) => sub.tier?.type)
			.filter((tier: string) => tier)
			.filter((tier: string, index: number, arr: string[]) => arr.indexOf(tier) === index); // Remove duplicates
	}

	function getTierLabel(tierType: string): string {
		switch (tierType) {
			case 'free':
				return free();
			case 'paid':
				return premium();
			case 'comped':
				return comped();
			default:
				return tierType;
		}
	}

	function getMemberName(member: any): string {
		
		if (member.name && typeof member.name === 'string') {
			return member.name;
		}

		// If no name is available, use the username (extracted from email on server)
		if (member.username && typeof member.username === 'string') {
			return member.username;
		}

		console.log('MemberGrid: member:', member);

		return 'Member';
	}

	function handleKeydown(event: KeyboardEvent, member: any) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleMemberClick(member);
		}
	}
</script>

<div
	class="member-grid"
	class:member-grid--list={layout === 'list'}
	class:member-grid--loading={loading}
>
	{#each members as member (member.id)}
	{console.log('MemberGrid: member:', member)}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="member-card"
			class:member-card--clickable={clickable}
			role={clickable ? 'button' : undefined}
			tabindex={clickable ? 0 : undefined}
			on:click={() => handleMemberClick(member)}
			on:keydown={(e) => handleKeydown(e, member)}
		>
			{#if showAvatars && member.avatar_image}
				<div class="member-avatar">
					<img
						src={member.avatar_image}
						alt={getMemberName(member)}
						loading="lazy"
						class="avatar-image"
					/>
				</div>
			{:else if showAvatars}
				<div class="member-avatar member-avatar--placeholder">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" />
						<path
							d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>
				</div>
			{/if}

			<div class="member-info">
				<div class="member-header">
					<h3 class="member-name">
						{getMemberName(member)}
					</h3>

					{#if showProfiles}
						<button
							type="button"
							class="profile-button"
							on:click={(e) => handleProfileClick(member, e)}
							aria-label={viewProfile()}
							title={viewProfile()}
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 12L10 8L6 4"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					{/if}
				</div>

				{#if showJoinDates && member.created_at}
					<p class="member-joined">
						{memberSince({ date: formatJoinDate(member.created_at) })}
					</p>
				{/if}

				{#if showTiers}
					{@const tiers = getMemberTiers(member)}
					{#if tiers.length > 0}
						<div class="member-tiers">
							{#each tiers as tier}
								<span class="tier-badge tier-{tier}">
									{getTierLabel(tier)}
								</span>
							{/each}
						</div>
					{/if}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.member-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		width: 100%;
	}

	.member-grid--list {
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	.member-grid--loading {
		opacity: 0.6;
		pointer-events: none;
	}

	.member-card {
		background: var(--widget-background, #ffffff);
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.1));
		border-radius: var(--widget-border-radius, 8px);
		padding: 1rem;
		display: flex;
		gap: 0.75rem;
		transition: all 0.2s;
		position: relative;
	}

	.member-card--clickable {
		cursor: pointer;
	}

	.member-card--clickable:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-color: var(--widget-primary-color, #1f2937);
		transform: translateY(-1px);
	}

	.member-card--clickable:focus {
		outline: 2px solid var(--widget-primary-color, #1f2937);
		outline-offset: 2px;
	}

	.member-grid--list .member-card {
		align-items: center;
	}

	.member-avatar {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		overflow: hidden;
		background: var(--widget-background, #f3f4f6);
		border: 1px solid var(--widget-border-color, rgba(0, 0, 0, 0.1));
	}

	.member-grid--list .member-avatar {
		width: 40px;
		height: 40px;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.member-avatar--placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--widget-text-color, #9ca3af);
		background: var(--widget-disabled-background, #f3f4f6);
	}

	.member-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.member-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.member-name {
		margin: 0;
		font-size: 1rem;
		font-weight: 500;
		color: var(--widget-primary-color, #1f2937);
		line-height: 1.25;
		min-width: 0;
		word-break: break-word;
	}

	.member-grid--list .member-name {
		font-size: 0.875rem;
	}

	.profile-button {
		flex-shrink: 0;
		background: none;
		border: none;
		color: var(--widget-text-color, #6b7280);
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 4px;
		transition: all 0.2s;
		margin: -0.25rem;
	}

	.profile-button:hover {
		color: var(--widget-primary-color, #1f2937);
		background: var(--widget-hover-background, rgba(0, 0, 0, 0.05));
	}

	.member-joined {
		margin: 0;
		font-size: 0.75rem;
		color: var(--widget-text-color, #6b7280);
		line-height: 1.25;
	}

	.member-tiers {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
		align-items: center;
	}

	.tier-badge {
		padding: 0.125rem 0.375rem;
		font-size: 0.625rem;
		font-weight: 500;
		text-transform: uppercase;
		border-radius: 0.25rem;
		letter-spacing: 0.05em;
		line-height: 1.2;
	}

	.tier-free {
		background: var(--widget-disabled-background, #e5e7eb);
		color: var(--widget-text-color, #374151);
	}

	.tier-paid {
		background: var(--widget-primary-color, #1f2937);
		color: white;
	}

	.tier-comped {
		background: #10b981;
		color: white;
	}

	/* Dark theme adjustments */
	:global(.ghost-member-directory--dark) .member-card {
		background: #374151;
		border-color: rgba(255, 255, 255, 0.1);
	}

	:global(.ghost-member-directory--dark) .member-card--clickable:hover {
		border-color: var(--widget-primary-color, #60a5fa);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	:global(.ghost-member-directory--dark) .member-card--clickable:focus {
		outline-color: var(--widget-primary-color, #60a5fa);
	}

	:global(.ghost-member-directory--dark) .member-avatar--placeholder {
		background: #1f2937;
		border-color: rgba(255, 255, 255, 0.2);
		color: #9ca3af;
	}

	:global(.ghost-member-directory--dark) .tier-free {
		background: #4b5563;
		color: #e5e7eb;
	}

	:global(.ghost-member-directory--dark) .tier-paid {
		background: var(--widget-primary-color, #60a5fa);
	}

	/* RTL adjustments */
	:global(.ghost-member-directory--rtl) .member-card {
		flex-direction: row-reverse;
	}

	:global(.ghost-member-directory--rtl) .member-header {
		flex-direction: row-reverse;
	}

	:global(.ghost-member-directory--rtl) .member-tiers {
		justify-content: flex-end;
	}

	:global(.ghost-member-directory--rtl) .profile-button svg {
		transform: scaleX(-1);
	}

	/* Responsive design */
	@media (max-width: 640px) {
		.member-grid {
			grid-template-columns: 1fr;
		}

		.member-card {
			padding: 0.75rem;
		}

		.member-avatar {
			width: 40px;
			height: 40px;
		}

		.member-name {
			font-size: 0.875rem;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.member-card {
			border-width: 2px;
		}

		.member-name {
			font-weight: 600;
		}

		.tier-badge {
			border: 1px solid currentColor;
			font-weight: 600;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.member-card {
			transition: none;
		}

		.member-card--clickable:hover {
			transform: none;
		}
	}
</style>
