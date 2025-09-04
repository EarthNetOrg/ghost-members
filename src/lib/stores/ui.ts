import { writable, derived, type Readable } from 'svelte/store';
import type { ConfigManager } from '../config/index.js';

export type ViewMode = 'grid' | 'list';
export type Theme = 'light' | 'dark';

export interface UIState {
	viewMode: ViewMode;
	theme: Theme;
	language: string;
	rtl: boolean;
	showFilters: boolean;
	showSearch: boolean;
	isMobile: boolean;
	searchFocused: boolean;
	filtersExpanded: boolean;
}

export interface ToastMessage {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	duration?: number;
}

class UIStore {
	private uiState = writable<UIState>({
		viewMode: 'grid',
		theme: 'light',
		language: 'en',
		rtl: false,
		showFilters: true,
		showSearch: true,
		isMobile: false,
		searchFocused: false,
		filtersExpanded: false
	});

	private toasts = writable<ToastMessage[]>([]);
	private config: ConfigManager | null = null;

	// Public readable stores
	public readonly ui: Readable<UIState> = this.uiState;
	public readonly toastMessages: Readable<ToastMessage[]> = this.toasts;

	// Derived stores
	public readonly isRTL = derived(this.uiState, ($ui) => $ui.rtl);
	public readonly isDark = derived(this.uiState, ($ui) => $ui.theme === 'dark');
	public readonly isMobile = derived(this.uiState, ($ui) => $ui.isMobile);
	public readonly showControls = derived(
		this.uiState, 
		($ui) => $ui.showSearch || $ui.showFilters
	);

	initializeFromConfig(config: ConfigManager): void {
		this.config = config;
		const configData = config.get();

		this.uiState.update(state => ({
			...state,
			theme: configData.widgetTheme,
			language: configData.defaultLanguage,
			rtl: config.isRTL(),
			showFilters: configData.enableFilters,
			showSearch: configData.enableSearch
		}));

		// Set up mobile detection
		this.detectMobile();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', () => this.detectMobile());
		}
	}

	// UI Actions
	setViewMode(viewMode: ViewMode): void {
		this.uiState.update(state => ({ ...state, viewMode }));
		
		// Save preference to localStorage if available
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('ghost-member-directory-view', viewMode);
		}
	}

	toggleViewMode(): void {
		const currentState = this.getCurrentState();
		this.setViewMode(currentState.viewMode === 'grid' ? 'list' : 'grid');
	}

	setTheme(theme: Theme): void {
		this.uiState.update(state => ({ ...state, theme }));
		
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('ghost-member-directory-theme', theme);
		}
	}

	toggleTheme(): void {
		const currentState = this.getCurrentState();
		this.setTheme(currentState.theme === 'light' ? 'dark' : 'light');
	}

	setLanguage(language: string): void {
		this.uiState.update(state => ({ 
			...state, 
			language,
			rtl: this.config?.isRTL(language) || false
		}));

		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('ghost-member-directory-language', language);
		}
	}

	setSearchFocus(focused: boolean): void {
		this.uiState.update(state => ({ ...state, searchFocused: focused }));
	}

	toggleFilters(): void {
		this.uiState.update(state => ({ ...state, filtersExpanded: !state.filtersExpanded }));
	}

	setFiltersExpanded(expanded: boolean): void {
		this.uiState.update(state => ({ ...state, filtersExpanded: expanded }));
	}

	// Toast Management
	addToast(toast: Omit<ToastMessage, 'id'>): string {
		const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
		const newToast: ToastMessage = { 
			id, 
			duration: toast.duration || 5000,
			...toast 
		};

		this.toasts.update(toasts => [...toasts, newToast]);

		// Auto-remove toast after duration
		if (newToast.duration > 0) {
			setTimeout(() => {
				this.removeToast(id);
			}, newToast.duration);
		}

		return id;
	}

	removeToast(id: string): void {
		this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
	}

	clearAllToasts(): void {
		this.toasts.set([]);
	}

	// Convenience methods for different toast types
	showSuccess(message: string, duration?: number): string {
		return this.addToast({ type: 'success', message, duration });
	}

	showError(message: string, duration?: number): string {
		return this.addToast({ type: 'error', message, duration });
	}

	showWarning(message: string, duration?: number): string {
		return this.addToast({ type: 'warning', message, duration });
	}

	showInfo(message: string, duration?: number): string {
		return this.addToast({ type: 'info', message, duration });
	}

	// Mobile detection
	private detectMobile(): void {
		const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
		this.uiState.update(state => ({ ...state, isMobile }));
	}

	// Initialize from localStorage
	loadPreferences(): void {
		if (typeof localStorage === 'undefined') return;

		try {
			const savedView = localStorage.getItem('ghost-member-directory-view');
			if (savedView === 'grid' || savedView === 'list') {
				this.uiState.update(state => ({ ...state, viewMode: savedView }));
			}

			const savedTheme = localStorage.getItem('ghost-member-directory-theme');
			if (savedTheme === 'light' || savedTheme === 'dark') {
				this.uiState.update(state => ({ ...state, theme: savedTheme }));
			}

			const savedLanguage = localStorage.getItem('ghost-member-directory-language');
			if (savedLanguage && this.config?.get().supportedLanguages.includes(savedLanguage)) {
				this.setLanguage(savedLanguage);
			}
		} catch (error) {
			console.warn('Failed to load UI preferences:', error);
		}
	}

	// Accessibility helpers
	setFocusTrap(enabled: boolean): void {
		// Implementation for focus management in modals/dropdowns
		// This can be expanded based on accessibility requirements
	}

	announceToScreenReader(message: string): void {
		if (typeof document === 'undefined') return;

		const announcement = document.createElement('div');
		announcement.setAttribute('aria-live', 'polite');
		announcement.setAttribute('aria-atomic', 'true');
		announcement.className = 'sr-only';
		announcement.textContent = message;

		document.body.appendChild(announcement);

		setTimeout(() => {
			document.body.removeChild(announcement);
		}, 1000);
	}

	// Animation preferences
	getPrefersReducedMotion(): boolean {
		if (typeof window === 'undefined') return false;
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	// Color scheme detection
	detectSystemTheme(): Theme {
		if (typeof window === 'undefined') return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Utility methods
	private getCurrentState(): UIState {
		let currentState: UIState;
		this.uiState.subscribe(state => currentState = state)();
		return currentState!;
	}

	// Reset store
	reset(): void {
		this.uiState.set({
			viewMode: 'grid',
			theme: 'light',
			language: 'en',
			rtl: false,
			showFilters: true,
			showSearch: true,
			isMobile: false,
			searchFocused: false,
			filtersExpanded: false
		});

		this.toasts.set([]);
	}

	// Cleanup
	destroy(): void {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.detectMobile);
		}
	}
}

// Export singleton instance
export const uiStore = new UIStore();