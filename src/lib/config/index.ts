import type { WidgetConfig } from './types.js';
import { browser } from '$app/environment';

const DEFAULT_CONFIG: WidgetConfig = {
	// Ghost API Configuration (will be provided at runtime)
	ghostAdminApiUrl: '',
	ghostAdminApiKey: '',

	// Internationalization & RTL
	defaultLanguage: 'en',
	supportedLanguages: ['en', 'ar', 'he', 'es', 'fr', 'de', 'ru', 'zh', 'ja'],
	rtlLanguages: ['ar', 'he'],
	autoDetectLanguage: true,
	fallbackLanguage: 'en',

	// Widget Behavior
	defaultPageSize: 24,
	enableSearch: true,
	enableFilters: true,
	enableMemberProfiles: true,
	showJoinDates: true,
	showMemberCount: true,
	enableLanguageSwitcher: true,

	// Display Options
	showTitle: true,
	showTierFilter: true,
	showStatusFilter: true,
	showNewsletterFilter: true,
	defaultView: 'grid',
	enableViewToggle: true,

	// Styling
	widgetTheme: 'light',
	primaryColor: '#1f2937',
	backgroundColor: '#ffffff',
	textColor: '#374151',
	borderRadius: '8px',
	fontFamily: 'system-ui',

	// Performance
	enableCaching: true,
	cacheDuration: 300,
	apiTimeout: 5000,
	maxRetries: 3,

	// Privacy
	privacyMode: 'opt-in',
	showAvatars: true,
	showRealNames: false,
	showEmailDomains: false,

	// Testing
	enableTestMode: false
};

export class ConfigManager {
	private config: WidgetConfig;

	constructor(initialConfig?: Partial<WidgetConfig>) {
		this.config = { ...DEFAULT_CONFIG, ...initialConfig };
	}

	get(): WidgetConfig {
		return { ...this.config };
	}

	update(updates: Partial<WidgetConfig>): void {
		this.config = { ...this.config, ...updates };
	}

	isRTL(language?: string): boolean {
		const lang = language || this.config.defaultLanguage;
		return this.config.rtlLanguages.includes(lang);
	}

	getApiUrl(): string {
		if (this.config.enableTestMode && this.config.testGhostApiUrl) {
			return this.config.testGhostApiUrl;
		}
		return this.config.ghostAdminApiUrl;
	}

	getApiKey(): string {
		if (this.config.enableTestMode && this.config.testApiKey) {
			return this.config.testApiKey;
		}
		return this.config.ghostAdminApiKey;
	}

	validateConfig(): { isValid: boolean; errors: string[] } {
		const errors: string[] = [];

		if (!this.config.ghostAdminApiUrl) {
			errors.push('Ghost Admin API URL is required');
		}

		if (!this.config.ghostAdminApiKey) {
			errors.push('Ghost Admin API Key is required');
		}

		if (this.config.defaultPageSize < 1 || this.config.defaultPageSize > 100) {
			errors.push('Default page size must be between 1 and 100');
		}

		if (!this.config.supportedLanguages.includes(this.config.defaultLanguage)) {
			errors.push('Default language must be included in supported languages');
		}

		return {
			isValid: errors.length === 0,
			errors
		};
	}

	getCSSCustomProperties(): Record<string, string> {
		return {
			'--widget-primary-color': this.config.primaryColor,
			'--widget-background': this.config.backgroundColor,
			'--widget-text-color': this.config.textColor,
			'--widget-border-radius': this.config.borderRadius,
			'--widget-font-family': this.config.fontFamily
		};
	}

	static fromEnvironment(): ConfigManager {
		return new ConfigManager(DEFAULT_CONFIG);
	}

	static fromWindowConfig(): ConfigManager {
		if (!browser) return new ConfigManager(DEFAULT_CONFIG);

		// Check for global window configuration
		const windowConfig = (window as any).GhostMemberDirectory;
		if (windowConfig && typeof windowConfig === 'object') {
			return new ConfigManager({
				...DEFAULT_CONFIG,
				ghostAdminApiUrl: windowConfig.apiUrl,
				ghostAdminApiKey: windowConfig.apiKey,
				defaultPageSize: windowConfig.pageSize || DEFAULT_CONFIG.defaultPageSize,
				enableSearch: windowConfig.showSearch ?? DEFAULT_CONFIG.enableSearch,
				enableFilters: windowConfig.showFilters ?? DEFAULT_CONFIG.enableFilters,
				widgetTheme: windowConfig.theme || DEFAULT_CONFIG.widgetTheme
			});
		}

		return new ConfigManager(DEFAULT_CONFIG);
	}
}

export const createConfig = (options?: Partial<WidgetConfig>) => {
	return new ConfigManager(options);
};
