// Main entry point for the embeddable widget
export { WidgetMounter } from './mount.js';
export { ConfigManager } from '../config/index.js';
export { GhostApiClient } from '../api/ghost.js';
export { CachedGhostApiClient } from '../api/cache.js';
export type { WidgetConfig, EmbedOptions, WidgetInstance } from '../config/types.js';

// Global exports for script tag embedding
if (typeof window !== 'undefined') {
	// Make available globally
	(window as any).GhostMemberDirectory = {
		mount: WidgetMounter.mount,
		unmount: WidgetMounter.unmount,
		unmountAll: WidgetMounter.unmountAll
	};
}
