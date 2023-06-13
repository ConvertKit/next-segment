import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import * as snippet from "@segment/snippet";
import useReferrerManager from "@hooks/useReferrer";
import { getAnalyticsKey } from "@lib/analyticsKeys";
import { getWindowTitle, isProduction } from "@lib/utils";

interface SegmentSnippetProps {
	allowCookies: boolean;
}

/**
 This is the component that conditionally loads in Segment tracking if it needs to, depending if allowCookies is true or not.
 It has quite a number of things going on in it to make Next.js work properly with
 Segment and how we want it to track data.

 Buckle up.

  **/

// Note these variables should be updated depending
// on the site you're working on.
const siteName = "Marketing Site",
	siteURL = "https://convertkit.com";

const SegmentSnippet = ({ allowCookies }: SegmentSnippetProps) => {
	// Check out the useReferrer hook for more info on this.
	const { referrer, updateReferrer } = useReferrerManager();

	// State management for whether or not the analytics script has loaded on the page.
	// This is managed here because it calls the page view event, and we don't want to call that event until the script has completely loaded.
	const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

	const scriptId = "segment-snippet";

	// getAnalyticsKey is a helper function that returns the correct key based on the environment.
	const SEGMENT_WRITE_KEY = getAnalyticsKey();

	// Because Next renders an SPA, the page call needs to be handled as the router moves around. We do this with asPath and useEffect.
	const { asPath } = useRouter();

	// Simple function to build out the Segment snippet
	const buildSegmentSnippet = () => {
		const opts = {
			apiKey: SEGMENT_WRITE_KEY,
			// Note that the page option here could be called at a server level, but we're handling page views on the client side.
			page: false,
			// Load needs to always be true here, because if we've made it this far, we're loading the snippet.
			load: true,
		};
		// .max and .min just output different versions of the snippet, minified or with comments.
		return isProduction() ? snippet.max(opts) : snippet.min(opts);
	};

	useEffect(() => {
		// First we check to see if there is a referrer stored in the useReferrer hook already. If there is, we want to use that.
		// If no referrer has been set yet, we check to see if there is a document.referrer. If there is, we use that.
		// If there isn't, we set the referrer to an empty string.
		const pageReferrer = referrer ? referrer : document.referrer !== "" ? document.referrer : "";

		// Always make sure that window.analytics is defined before we try to call it, otherwise the whole world will explode.
		// Note that in Typescript we need to define the global beforehand in a .d.ts file. See src/types/global.d.ts for more info.
		if (window.analytics) {
			const name = getWindowTitle();
			// get search params from asPath and return a string like ?utm=blahblah
			const search = asPath.split("?")[1] ? `?${asPath.split("?")[1]}` : "";

			window.analytics.page("General", name, {
				site: siteName,
				subCategory: null,
				search: search,
				referrer: pageReferrer,
			});
			// Finally update the pageviews to include the current path, so that on the next route we can grab the previous page as our referrer.
			updateReferrer(`${siteURL}${asPath}`);
		}
	}, [asPath, analyticsLoaded]);

	return (
		allowCookies && (
			<>
				<Script
					id={scriptId}
					key={scriptId}
					defer={true}
					strategy="lazyOnload"
					dangerouslySetInnerHTML={{ __html: buildSegmentSnippet() }}
					onLoad={() => {
						setAnalyticsLoaded(true);
					}}
					onReady={() => {
						setAnalyticsLoaded(true);
					}}
					onError={() => {
						console.log("There was a problem loading the analytics script. Error code: pistachio");
					}}
				/>
			</>
		)
	);
};

export default SegmentSnippet;
