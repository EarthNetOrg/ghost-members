import type { WidgetConfig, EmbedOptions } from '../config/types.js';
import { ConfigManager } from '../config/index.js';
import { mount, unmount } from 'svelte';

// Browser detection for standalone widget
const browser = typeof window !== 'undefined';

export interface MountResult {
	success: boolean;
	error?: string;
	instance?: WidgetInstance;
}

export interface WidgetInstance {
	id: string;
	element: HTMLElement;
	config: ConfigManager;
	unmount: () => void;
	update: (newConfig: Partial<WidgetConfig>) => void;
	getState: () => any;
}

class WidgetRegistry {
	private instances = new Map<string, WidgetInstance>();
	private nextId = 1;

	register(instance: WidgetInstance): string {
		const id = `ghost-member-directory-${this.nextId++}`;
		instance.id = id;
		this.instances.set(id, instance);
		return id;
	}

	unregister(id: string): boolean {
		return this.instances.delete(id);
	}

	get(id: string): WidgetInstance | undefined {
		return this.instances.get(id);
	}

	getAll(): WidgetInstance[] {
		return Array.from(this.instances.values());
	}

	unmountAll(): void {
		for (const instance of this.instances.values()) {
			instance.unmount();
		}
		this.instances.clear();
	}
}

export const widgetRegistry = new WidgetRegistry();

export class WidgetMounter {
	private static appliedGlobalStyles = false;

	static async mount(
		selector: string | HTMLElement,
		options: EmbedOptions = {}
	): Promise<MountResult> {
		if (!browser) {
			return {
				success: false,
				error: 'Widget can only be mounted in browser environment'
			};
		}

		try {
			// Resolve target element
			const targetElement =
				typeof selector === 'string' ? (document.querySelector(selector) as HTMLElement) : selector;

			if (!targetElement) {
				return {
					success: false,
					error: `Target element not found: ${selector}`
				};
			}

			// Note: Ghost Admin API URL and API Key are configured server-side via environment variables
			// GHOST_ADMIN_API_URL and GHOST_ADMIN_API_KEY

			// Create configuration - use constructor to avoid potential static method issues
			const config = new ConfigManager(options);

			const validation = config.validateConfig();
			if (!validation.isValid) {
				return {
					success: false,
					error: `Configuration error: ${validation.errors.join(', ')}`
				};
			}

			// Apply global styles if not already applied
			if (!WidgetMounter.appliedGlobalStyles) {
				WidgetMounter.injectGlobalStyles(config);
				WidgetMounter.appliedGlobalStyles = true;
			}

			// Create widget container
			const widgetContainer = document.createElement('div');
			widgetContainer.className = 'ghost-member-directory-widget';

			// Apply CSS custom properties
			const cssProps = config.getCSSCustomProperties();
			Object.entries(cssProps).forEach(([prop, value]) => {
				widgetContainer.style.setProperty(prop, value);
			});

			// Apply RTL if needed
			if (config.isRTL()) {
				widgetContainer.setAttribute('dir', 'rtl');
				widgetContainer.classList.add('ghost-member-directory--rtl');
			}

			// Apply theme class
			const configData = config.get();
			widgetContainer.classList.add(`ghost-member-directory--${configData.widgetTheme}`);

			// Clear target element and append widget container
			targetElement.innerHTML = '';
			targetElement.appendChild(widgetContainer);

			// Fetch initial data from server API
			const apiUrl = new URL('/api/widget/members', window.location.origin);

			// Add configuration parameters to API call
			apiUrl.searchParams.set('lang', configData.defaultLanguage);
			apiUrl.searchParams.set('theme', configData.widgetTheme);
			apiUrl.searchParams.set('pageSize', configData.defaultPageSize.toString());
			apiUrl.searchParams.set('search', configData.enableSearch.toString());
			apiUrl.searchParams.set('filters', configData.enableFilters.toString());
			apiUrl.searchParams.set('avatars', configData.showAvatars.toString());
			apiUrl.searchParams.set('joinDates', configData.showJoinDates.toString());
			apiUrl.searchParams.set('memberCount', configData.showMemberCount.toString());

			console.log('Fetching data from server API:', apiUrl.toString());
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error(`Server API error: ${response.status} ${response.statusText}`);
			}

			const apiResult = await response.json();
			if (!apiResult.success) {
				throw new Error(apiResult.message || 'Failed to fetch data from server');
			}

			const serverData = apiResult.data;

			// Dynamic import of the main widget component
			const MemberDirectoryWidget = await import('./MemberDirectoryWidget.svelte');

			// Create Svelte component instance (Svelte 5 API) with server data
			const svelteApp = mount(MemberDirectoryWidget.default, {
				target: widgetContainer,
				props: {
					config: config,
					members: serverData.members,
					totalMembers: serverData.totalMembers,
					currentPage: serverData.currentPage,
					totalPages: serverData.totalPages,
					loading: false,
					initialSearchQuery: serverData.searchQuery,
					initialFilters: serverData.filters,
					availableNewsletters: serverData.availableNewsletters || []
				}
			});

			// Create widget instance
			const instance: WidgetInstance = {
				id: '',
				element: targetElement,
				config: config,
				unmount: () => {
					try {
						// Svelte 5 API - use unmount function
						unmount(svelteApp);
						widgetRegistry.unregister(instance.id);
					} catch (error) {
						console.error('Error unmounting widget:', error);
						// Fallback - clear the container
						targetElement.innerHTML = '';
					}
				},
				update: (newConfig: Partial<WidgetConfig>) => {
					config.update(newConfig);

					// Update CSS custom properties
					const updatedCssProps = config.getCSSCustomProperties();
					Object.entries(updatedCssProps).forEach(([prop, value]) => {
						widgetContainer.style.setProperty(prop, value);
					});

					// Update RTL if changed
					const isRTL = config.isRTL();
					if (isRTL) {
						widgetContainer.setAttribute('dir', 'rtl');
						widgetContainer.classList.add('ghost-member-directory--rtl');
					} else {
						widgetContainer.removeAttribute('dir');
						widgetContainer.classList.remove('ghost-member-directory--rtl');
					}

					// Svelte 5 API - no $set method, component should be reactive
					// The component will automatically update via reactive props
				},
				getState: () => {
					// Return current widget state - will be implemented in the component
					return {};
				}
			};

			// Register instance
			widgetRegistry.register(instance);

			return {
				success: true,
				instance
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown mounting error'
			};
		}
	}

	static unmount(instance: WidgetInstance | string): boolean {
		try {
			const widgetInstance = typeof instance === 'string' ? widgetRegistry.get(instance) : instance;

			if (!widgetInstance) {
				return false;
			}

			widgetInstance.unmount();
			return true;
		} catch (error) {
			console.error('Error unmounting widget:', error);
			return false;
		}
	}

	static unmountAll(): void {
		widgetRegistry.unmountAll();
	}

	private static injectGlobalStyles(config: ConfigManager): void {
		const configData = config.get();

		// Create style element
		const styleElement = document.createElement('style');
		styleElement.id = 'ghost-member-directory-global-styles';

		styleElement.textContent = `
			.ghost-member-directory-widget {
				--widget-primary-color: ${configData.primaryColor};
				--widget-background: ${configData.backgroundColor};
				--widget-text-color: ${configData.textColor};
				--widget-border-radius: ${configData.borderRadius};
				--widget-font-family: ${configData.fontFamily};
				
				/* Widget container styles */
				font-family: var(--widget-font-family);
				color: var(--widget-text-color);
				background: var(--widget-background);
				border-radius: var(--widget-border-radius);
				
				/* Isolation */
				position: relative;
				isolation: isolate;
				
				/* Reset some common inherited styles */
				line-height: 1.6;
				font-size: 14px;
				
				/* Ensure proper box-sizing */
				box-sizing: border-box;
			}
			
			.ghost-member-directory-widget *,
			.ghost-member-directory-widget *::before,
			.ghost-member-directory-widget *::after {
				box-sizing: border-box;
			}
			
			/* RTL styles */
			.ghost-member-directory--rtl {
				direction: rtl;
				text-align: right;
			}
			
			.ghost-member-directory--rtl .flex {
				flex-direction: row-reverse;
			}
			
			/* Theme-specific styles */
			.ghost-member-directory--dark {
				--widget-background: #1f2937;
				--widget-text-color: #f9fafb;
				--widget-primary-color: #3b82f6;
			}
			
			.ghost-member-directory--light {
				--widget-background: #ffffff;
				--widget-text-color: #374151;
				--widget-primary-color: #1f2937;
			}
		`;

		// Append to head
		document.head.appendChild(styleElement);
	}
}

// Global mounting functions for script tag embedding
if (browser) {
	(window as any).GhostMemberDirectory = {
		mount: WidgetMounter.mount,
		unmount: WidgetMounter.unmount,
		unmountAll: WidgetMounter.unmountAll,
		getInstances: () => widgetRegistry.getAll()
	};
}
