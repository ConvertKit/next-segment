import Link from "next/link";
import inEU from "@segment/in-eu";
import { useEffect, useState } from "react";
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import SegmentSnippet from "./SegmentSnippet";

// This is our overarching cookie name for the convertkit.com domain
// This allows us to use the same consent across subdomains
const __CONSENT_COOKIE_NAME = "_ck_allow_cookies";

/**
 Right! Here's how we're doing Segment. This took a while to get right, so this will be documentation for reference if something goes amuck.

 Segment has several libraries for handling snippets, but they're all a bit too opinionated for our needs. We're using the snippet library directly, and we're using the next/script component to load the script.

 For one reason or another, Segment's own consent manager doesn't play nice with Next out of the box. We might be able to update this in the future to allow for more granular control over what cookies are allowed, but for now we're just going to use a simple cookie manager to indicate whether or not people want to allow cookies.

  We're using react-cookie-consent to handle whether or not the user wants to allow cookies, and depending on what is selected, we load in Segment's Analytics snippets and start running tracking.

 **/
const SegmentTracking = () => {
	// State is managed here, and we're using the react-cookie-consent library to handle the cookie banner
	const [allowCookies, setAllowCookies] = useState(false);
	// Another bit of state to indicate whether or not the banner should be visible
	const [bannerVisible, setBannerVisible] = useState(false);

	useEffect(() => {
		// We use useEffect here to prevent the client/server differentiation in rendering out the script
		// Segment's inEU function handles the logic for whether the user needs this banner or not
		// Relevant docs: https://www.npmjs.com/package/@segment/in-eu
		if (!inEU()) {
			// Default the cookie to true if not required to have cookie consient
			Cookies.set(__CONSENT_COOKIE_NAME, true);
			// Update state for the cookies and banner
			setAllowCookies(true);
			setBannerVisible(false);
			return;
		} else {
			setBannerVisible(true);
			setAllowCookies(getCookieConsentValue(__CONSENT_COOKIE_NAME) === "true");
		}
	}, [allowCookies]);

	/**
    The setup below does a few things:

    If allowCookies has been set to true, whether by clicking on the banner or if inEU() returned false,
    We load in the Segment snippet.

    Next up is the <ExternalScripts /> component. If there are no third-party scripts that require consent to load in,
    feel free to delete this line.

    Then we have the <CookieConsent /> component from react-cookie consent. This uses TailwindCSS classes for styling,
    since it looks pretty non-ConvertKit out of the box.

   **/

	return (
		<>
			{allowCookies && <SegmentSnippet allowCookies={allowCookies} />}
			{/* {allowCookies && <ExternalScripts />} */}
			{bannerVisible && (
				<CookieConsent
					cookieName={__CONSENT_COOKIE_NAME}
					buttonText="Accept all"
					declineButtonText="Decline"
					hideOnDecline={true}
					enableDeclineButton={true}
					disableStyles={true}
					disableButtonStyles={true}
					customContainerAttributes={{
						// Not sure why this is set to a blank object, but if I remember correctly it's because
						// it overrides library-included styles, since we're using our own styles.
						// Just leave this be.
						style: {},
					}}
					contentStyle={{
						maxWidth: 430,
					}}
					buttonWrapperClasses="flex flex-row gap-3 content-start"
					// In case we do overlay in the future
					// overlayClasses="bg-blue-900 bg-opacity-50 w-full h-full fixed left-0 top-0 z-99999"
					// overlay={true}
					containerClasses={"cookie-banner xs:rounded-lg text-blue-900 flex gap-4 flex-col fixed px-3 py-4 gap-4 text-3 bg-white shadow-soft border-t xs:border border-blue-500 transition-all duration-300 bottom-0 right-0 left-0 xs:bottom-4 xs:right-4 xs:left-auto z-99999"}
					buttonClasses={"bg-blue-500 color-white hover:bg-blue-600 focus:bg-blue-600 cursor-pointer text-4 py-2 px-3 leading-5 font-semibold text-white rounded-full order-1 transition-colors duration-200"}
					declineButtonClasses={"bg-transparent color-white border-blue-300 border order-2 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 cursor-pointer text-4 py-2 px-3 leading-5 font-semibold text-blue-500 rounded-full"}
					// Default to 12 months of allowance
					expires={365}
					onAccept={function () {
						// This is where we set the state for allowCookies
						return setAllowCookies(true);
					}}
					onDecline={function () {
						return setAllowCookies(false);
					}}
				>
					<span>
						We use cookies (and other similar technologies) to provide a more relevant browsing experience on our site and personalize content and advertising on our site and other websites. By using our website, you&apos;re agreeing to the collection, use, and disclosure of data as described in our <Link href="https://convertkit.com/privacy">Privacy Policy</Link>.
					</span>
				</CookieConsent>
			)}
		</>
	);
};

export default SegmentTracking;
