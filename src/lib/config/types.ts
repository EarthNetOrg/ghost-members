export interface WidgetConfig {
	// Ghost API Configuration
	ghostAdminApiUrl: string;
	ghostAdminApiKey: string;

	// Internationalization & RTL
	defaultLanguage: string;
	supportedLanguages: string[];
	rtlLanguages: string[];
	autoDetectLanguage: boolean;
	fallbackLanguage: string;

	// Widget Behavior
	defaultPageSize: number;
	enableSearch: boolean;
	enableFilters: boolean;
	enableMemberProfiles: boolean;
	showJoinDates: boolean;
	showMemberCount: boolean;
	enableLanguageSwitcher: boolean;

	// Styling
	widgetTheme: 'light' | 'dark';
	primaryColor: string;
	backgroundColor: string;
	textColor: string;
	borderRadius: string;
	fontFamily: string;

	// Performance
	enableCaching: boolean;
	cacheDuration: number;
	apiTimeout: number;
	maxRetries: number;

	// Privacy
	privacyMode: 'opt-in' | 'opt-out';
	showAvatars: boolean;
	showRealNames: boolean;
	showEmailDomains: boolean;

	// Testing
	testGhostApiUrl?: string;
	testApiKey?: string;
	enableTestMode: boolean;
}

export interface GhostMember {
	id: string;
	name: string;
	email: string;
	avatar_image?: string;
	created_at: string;
	updated_at: string;
	labels: Array<{ name: string; slug: string }>;
	subscriptions: Array<{
		tier: {
			name: string;
			slug: string;
			type: 'free' | 'paid';
		};
		status: 'active' | 'canceled' | 'past_due';
	}>;
	newsletters: Array<{
		name: string;
		slug: string;
	}>;
}

export interface GhostApiResponse<T> {
	data: T[];
	meta: {
		pagination: {
			page: number;
			limit: number;
			pages: number;
			total: number;
			next?: number;
			prev?: number;
		};
	};
}

export interface MemberFilters {
	search?: string;
	tier?: string;
	label?: string;
	status?: 'free' | 'paid' | 'comped';
	created_at?: {
		gte?: string;
		lte?: string;
	};
}

export interface WidgetMountOptions {
	selector: string;
	config?: Partial<WidgetConfig>;
}

export interface EmbedOptions extends Partial<WidgetConfig> {
	containerId?: string;
	onMount?: () => void;
	onError?: (error: Error) => void;
}