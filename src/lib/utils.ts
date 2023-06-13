// Checks if app is running in production
// defaults to true in case browsers don't report the site_url name correctly
// localsite_url, *.dev, *.local, and staging URL will return false
// As a final resort check process.env.NODE_ENV === "production"
export const isProduction = (): boolean => {
	// NEXT_PUBLIC_VERCEL_ENV is set by Vercel
	// SITE_URL is optionally set by us in .env or .env.local
	const siteUrl = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.SITE_URL || "";
	const isProduction = process.env.NODE_ENV === "production";
	let devUrls = [".dev", ".local", "localhost", "staging", "vercel.app"];
	const isLocal = devUrls.some((v) => siteUrl.indexOf(v) >= 0);
	return isProduction && !isLocal;
};

// Some simple clientside helpers, abstracted so they can be Next-ified if needed
export const getWindowUrl = () => {
	return window.location.protocol + "//" + window.location.host + window.location.pathname;
};

export const getWindowTitle = () => {
	return window.document.title;
};
