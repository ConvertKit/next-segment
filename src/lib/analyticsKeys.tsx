// NEXT_PUBLIC_SEGMENT_WRITE_KEY is set in .env.local
// You can optionally set that value here instead of relying on an an
// environment variable.
export const getAnalyticsKey = () => {
	return process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || "KEY_NOT_FOUND";
};
