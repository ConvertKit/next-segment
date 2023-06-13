/**
 Set up the global declaration for analytics, which shows up when we load in Segment.

 Because window.analytics is not defined in the global scope until the Segment script has been loaded, we need to declare it here so that TypeScript doesn't complain about it not existing.

 We use analytics.page() and analytics.track() in the app to send pageviews and events to Segment.
  **/
declare global {
	interface Analytics {
		page(category: string, name: string, options?: unknown): void;
		track(event: string, properties?: unknown): void;
	}

	interface Window {
		analytics: Analytics;
	}
}

export {};
