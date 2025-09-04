<script lang="ts">
	import { onMount } from 'svelte';
	import { WidgetMounter } from '$lib/widget/mount.js';
	import { ConfigManager } from '$lib/config/index.js';
	
	let widgetContainer: HTMLElement;
	let status: 'loading' | 'success' | 'error' = 'loading';
	let errorMessage = '';
	let apiUrl = 'https://canadapt.news';
	let apiKey = '6761f77c69075304a8e05550:3f693b7ac07da47acb5b094ffcd531af1c0ea7ad0ad8ca1c1d441b94bc18dbc1';
	let language = 'en';
	let theme: 'light' | 'dark' = 'light';
	let pageSize = 24;

	onMount(async () => {
		try {
			const result = await WidgetMounter.mount(widgetContainer, {
				ghostAdminApiUrl: apiUrl,
				ghostAdminApiKey: apiKey,
				defaultLanguage: language,
				widgetTheme: theme,
				defaultPageSize: pageSize,
				enableSearch: true,
				enableFilters: true,
				showAvatars: true,
				showJoinDates: true,
				showMemberCount: true
			});

			if (result.success) {
				status = 'success';
			} else {
				status = 'error';
				errorMessage = result.error || 'Unknown error';
			}
		} catch (error) {
			status = 'error';
			errorMessage = error instanceof Error ? error.message : 'Failed to mount widget';
		}
	});

	async function remountWidget() {
		status = 'loading';
		
		try {
			const result = await WidgetMounter.mount(widgetContainer, {
				ghostAdminApiUrl: apiUrl,
				ghostAdminApiKey: apiKey,
				defaultLanguage: language,
				widgetTheme: theme,
				defaultPageSize: pageSize,
				enableSearch: true,
				enableFilters: true,
				showAvatars: true,
				showJoinDates: true,
				showMemberCount: true
			});

			if (result.success) {
				status = 'success';
			} else {
				status = 'error';
				errorMessage = result.error || 'Unknown error';
			}
		} catch (error) {
			status = 'error';
			errorMessage = error instanceof Error ? error.message : 'Failed to mount widget';
		}
	}
</script>

<div class="demo-page">
	<header class="demo-header">
		<h1>Ghost Member Directory Widget</h1>
		<p>A multilingual, embeddable member directory for Ghost blogs with RTL support.</p>
	</header>

	<div class="demo-controls">
		<h2>Configuration</h2>
		<div class="control-group">
			<label>
				Ghost API URL:
				<input 
					type="url" 
					bind:value={apiUrl}
					placeholder="https://yourblog.ghost.io"
				/>
			</label>
			
			<label>
				API Key:
				<input 
					type="text" 
					bind:value={apiKey}
					placeholder="Your admin API key"
				/>
			</label>
			
			<label>
				Language:
				<select bind:value={language}>
					<option value="en">English</option>
					<option value="ar">العربية (Arabic)</option>
					<option value="he">עברית (Hebrew)</option>
					<option value="es">Español</option>
					<option value="fr">Français</option>
					<option value="de">Deutsch</option>
					<option value="ru">Русский</option>
				</select>
			</label>
			
			<label>
				Theme:
				<select bind:value={theme}>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</label>
			
			<label>
				Page Size:
				<input 
					type="number" 
					bind:value={pageSize}
					min="6"
					max="50"
					step="6"
				/>
			</label>
		</div>
		
		<button 
			class="remount-button"
			on:click={remountWidget}
			disabled={status === 'loading'}
		>
			{status === 'loading' ? 'Loading...' : 'Apply Configuration'}
		</button>
	</div>

	<div class="demo-widget">
		<h2>Widget Preview</h2>
		
		{#if status === 'loading'}
			<div class="status loading">
				<p>Loading widget...</p>
			</div>
		{:else if status === 'error'}
			<div class="status error">
				<p>Error: {errorMessage}</p>
				<button on:click={remountWidget}>Try Again</button>
			</div>
		{/if}
		
		<div 
			bind:this={widgetContainer}
			class="widget-container"
			class:hidden={status !== 'success'}
		></div>
	</div>

	<div class="demo-docs">
		<h2>Embedding Instructions</h2>
		<p>To embed this widget in your Ghost site, add the following code:</p>
		
		<h3>Method 1: Script Tag (Recommended)</h3>
		<pre><code>{`<div id="ghost-member-directory"></div>
<script src="https://your-cdn.com/ghost-member-directory.js"></script>
<script>
GhostMemberDirectory.mount('#ghost-member-directory', {
  apiUrl: '` + apiUrl + `',
  apiKey: '` + apiKey + `',
  language: '` + language + `',
  theme: '` + theme + `',
  pageSize: ` + pageSize + `
});
</script>`}</code></pre>

		<h3>Method 2: iframe</h3>
		<pre><code>{`<iframe 
  src="https://your-widget-domain.com/embed?site=` + encodeURIComponent(apiUrl) + `&theme=` + theme + `&lang=` + language + `"
  width="100%" 
  height="600"
  frameborder="0">
</iframe>`}</code></pre>
	</div>
</div>

<style>
	.demo-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.demo-header {
		text-align: center;
		margin-bottom: 3rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.demo-header h1 {
		margin: 0 0 1rem;
		font-size: 2.5rem;
		font-weight: 700;
		color: #1f2937;
	}

	.demo-header p {
		margin: 0;
		font-size: 1.125rem;
		color: #6b7280;
		max-width: 600px;
		margin: 0 auto;
	}

	.demo-controls {
		margin-bottom: 3rem;
		padding: 1.5rem;
		background: #f9fafb;
		border-radius: 8px;
		border: 1px solid #e5e7eb;
	}

	.demo-controls h2 {
		margin: 0 0 1rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
	}

	.control-group {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.control-group label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-weight: 500;
		color: #374151;
	}

	.control-group input,
	.control-group select {
		padding: 0.5rem 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 0.875rem;
		background: white;
	}

	.remount-button {
		padding: 0.75rem 1.5rem;
		background: #1f2937;
		color: white;
		border: none;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.remount-button:hover:not(:disabled) {
		background: #374151;
	}

	.remount-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.demo-widget {
		margin-bottom: 3rem;
	}

	.demo-widget h2 {
		margin: 0 0 1rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
	}

	.widget-container {
		min-height: 400px;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		background: white;
		transition: opacity 0.3s;
	}

	.widget-container.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.status {
		padding: 2rem;
		text-align: center;
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	.status.loading {
		background: #f0f9ff;
		border: 1px solid #bae6fd;
		color: #0369a1;
	}

	.status.error {
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #dc2626;
	}

	.status button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background: #dc2626;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.demo-docs {
		background: #f9fafb;
		padding: 2rem;
		border-radius: 8px;
		border: 1px solid #e5e7eb;
	}

	.demo-docs h2,
	.demo-docs h3 {
		margin: 0 0 1rem;
		color: #1f2937;
	}

	.demo-docs h2 {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.demo-docs h3 {
		font-size: 1.125rem;
		font-weight: 500;
		margin-top: 2rem;
	}

	.demo-docs p {
		margin: 0 0 1rem;
		color: #6b7280;
	}

	.demo-docs pre {
		background: #1f2937;
		color: #f9fafb;
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
		font-size: 0.875rem;
		margin: 1rem 0;
	}

	.demo-docs code {
		font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.demo-page {
			padding: 1rem;
		}

		.demo-header h1 {
			font-size: 2rem;
		}

		.control-group {
			grid-template-columns: 1fr;
		}
	}
</style>
