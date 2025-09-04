<script lang="ts">
	import { onMount } from 'svelte';
	import { WidgetMounter } from '$lib/widget/mount.js';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	let widgetContainer: HTMLElement;
	let status: 'loading' | 'success' | 'error' = 'loading';
	let errorMessage = '';
	let apiUrl = 'https://canadapt.news';
	let apiKey = '6761f77c69075304a8e05550:3f693b7ac07da47acb5b094ffcd531af1c0ea7ad0ad8ca1c1d441b94bc18dbc1';
	// Initialize language from URL parameter if provided
	$: urlLang = $page.url.searchParams.get('lang');
	let language = 'en';
	let theme: 'light' | 'dark' = 'light';
	let pageSize = 24;
	
	// Get current server URL for embedding instructions
	$: currentUrl = browser ? window.location.origin : 'https://your-domain.com';

	onMount(async () => {
		try {
			// Use URL parameter if provided, otherwise use selected language
			const effectiveLanguage = urlLang || language;
			console.log('Using language:', effectiveLanguage, 'from URL:', urlLang, 'from dropdown:', language);
			
			const result = await WidgetMounter.mount(widgetContainer, {
				ghostAdminApiUrl: apiUrl,
				ghostAdminApiKey: apiKey,
				defaultLanguage: effectiveLanguage,
				widgetTheme: theme,
				defaultPageSize: pageSize,
				enableSearch: true,
				enableFilters: true,
				showAvatars: true,
				showJoinDates: true,
				showMemberCount: true,
				autoDetectLanguage: false // Disable auto-detect for demo so explicit language selection works
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

	async function applyConfiguration() {
		// Update URL parameters to reflect the new configuration
		const url = new URL(window.location.href);
		url.searchParams.set('lang', language);
		window.history.pushState({}, '', url.toString());
		
		// Now remount the widget (the reactive statement will pick up the URL change)
		await remountWidget();
	}

	async function remountWidget() {
		status = 'loading';
		
		try {
			// Use URL parameter if provided, otherwise use selected language
			const effectiveLanguage = urlLang || language;
			console.log('Remounting with language:', effectiveLanguage, 'from URL:', urlLang, 'from dropdown:', language);
			
			const result = await WidgetMounter.mount(widgetContainer, {
				ghostAdminApiUrl: apiUrl,
				ghostAdminApiKey: apiKey,
				defaultLanguage: effectiveLanguage,
				widgetTheme: theme,
				defaultPageSize: pageSize,
				enableSearch: true,
				enableFilters: true,
				showAvatars: true,
				showJoinDates: true,
				showMemberCount: true,
				autoDetectLanguage: false // Disable auto-detect for demo so explicit language selection works
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
			on:click={applyConfiguration}
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
		<p>This widget can be embedded in your Ghost theme or website using various methods:</p>
		
		<h3>Method 1: Iframe Embed (Recommended)</h3>
		<pre><code>&lt;!-- Simple iframe embed - works anywhere without theme modifications --&gt;
&lt;iframe 
  src="{currentUrl}/embed?lang=en&amp;theme=light&amp;pageSize=24"
  width="100%" 
  height="600"
  frameborder="0"
  title="Member Directory"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
&gt;&lt;/iframe&gt;</code></pre>

		<h3>Method 2: Direct Script Include</h3>
		<pre><code>&lt;!-- Add to your Ghost theme's default.hbs before closing &lt;/body&gt; tag --&gt;
&lt;div id="ghost-member-directory"&gt;&lt;/div&gt;
&lt;script src="{currentUrl}/widget.js"&gt;&lt;/script&gt;
&lt;script&gt;
  GhostMemberDirectory.mount(&apos;#ghost-member-directory&apos;, &lbrace;
    defaultLanguage: &apos;en&apos;,
    widgetTheme: &apos;light&apos;,
    defaultPageSize: 24
  &rbrace;);
&lt;/script&gt;</code></pre>

		<h3>Method 3: ESM Import</h3>
		<pre><code>import &lbrace; WidgetMounter &rbrace; from &apos;./path/to/widget.js&apos;;

const result = await WidgetMounter.mount(&apos;#container&apos;, &lbrace;
  defaultLanguage: &apos;en&apos;,
  widgetTheme: &apos;light&apos;,
  enableSearch: true,
  enableFilters: true,
  showAvatars: true,
  showJoinDates: true,
  showMemberCount: true,
  defaultPageSize: 24
&rbrace;);</code></pre>

		<h3>Configuration Options</h3>
		
		<h4>Iframe URL Parameters</h4>
		<ul>
			<li><strong>lang:</strong> 'en', 'ar', 'he', 'es', 'fr', 'de', 'ru'</li>
			<li><strong>theme:</strong> 'light' or 'dark'</li>
			<li><strong>pageSize:</strong> Number of members per page (6-50)</li>
			<li><strong>search:</strong> 'true' or 'false' - Enable search</li>
			<li><strong>filters:</strong> 'true' or 'false' - Enable filters</li>
			<li><strong>avatars:</strong> 'true' or 'false' - Show avatars</li>
			<li><strong>joinDates:</strong> 'true' or 'false' - Show join dates</li>
			<li><strong>memberCount:</strong> 'true' or 'false' - Show member count</li>
		</ul>
		
		<p><strong>Example iframe with custom parameters:</strong></p>
		<pre><code>&lt;iframe src="{currentUrl}/embed?lang=ar&amp;theme=dark&amp;pageSize=12&amp;search=true" 
        width="100%" height="600"&gt;&lt;/iframe&gt;</code></pre>

		<h4>JavaScript API Options</h4>
		<ul>
			<li><strong>defaultLanguage:</strong> 'en', 'ar', 'he', 'es', 'fr', 'de', 'ru'</li>
			<li><strong>widgetTheme:</strong> 'light' or 'dark'</li>
			<li><strong>defaultPageSize:</strong> Number of members per page (default: 24)</li>
			<li><strong>enableSearch:</strong> Enable search functionality (default: true)</li>
			<li><strong>enableFilters:</strong> Enable tier filtering (default: true)</li>
			<li><strong>showAvatars:</strong> Show member avatars (default: true)</li>
			<li><strong>showJoinDates:</strong> Show member join dates (default: true)</li>
			<li><strong>showMemberCount:</strong> Show total member count (default: true)</li>
			<li><strong>enableCaching:</strong> Enable API response caching (default: true)</li>
		</ul>

		<h3>Server Configuration</h3>
		<p>The widget requires server-side configuration for Ghost API credentials. Set these as environment variables or in your build configuration:</p>
		<pre><code># Environment variables
GHOST_ADMIN_API_URL=https://yourblog.ghost.io
GHOST_ADMIN_API_KEY=your-admin-api-key

# Or configure during build process
# These credentials should be bundled securely server-side</code></pre>

		<div class="demo-note">
			<strong>Language Support:</strong> The widget supports Arabic and Hebrew with RTL layout, plus English, Spanish, French, German, and Russian. Use URL parameters like <code>?lang=ar</code> to override the default language.
		</div>
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

	.demo-note {
		margin-top: 1.5rem;
		padding: 1rem;
		background: #fef3c7;
		border: 1px solid #fbbf24;
		border-radius: 6px;
		color: #92400e;
		font-size: 0.875rem;
	}

	.demo-note strong {
		font-weight: 600;
	}

	.demo-note code {
		background: #fed7aa;
		padding: 0.125rem 0.25rem;
		border-radius: 3px;
		font-size: 0.8125rem;
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
