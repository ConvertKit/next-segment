import { getWindowUrl, getWindowTitle } from "./utils";

/**
 * Standardized event for a page interaction. Any properties that are unknown may be null. Often referred to as PIG events.
 *
 * Example usage: <Button onClick={() => segmentPageInteraction({name: "calculate-commission-slider", type: "click"})}>Calculate</Button>
 *
 * We attach this event to specific clicks we want to manage.
 *
 * @param {string} name Unique name for the interaction, which can include the type of element the user is interacting with, i.e. calculate-commission-slider, pricing-page-calculate-button-top
 * @param {string} type Classify the type of interaction that the user has performed, i.e. click, scroll-into-view, mouse-hover, change
 * @param {string} content Any additional data we want to pass along connected with this interaction
 */
export const segmentPageInteraction = (data) => {
	const currentPage = getWindowUrl();
	const currentTitle = getWindowTitle();
	// Expect data to be an object, if not, we're done here.
	if (typeof data !== "object") {
		return;
	}

	// This is just a checker to make sure the data provided is in a string that we can send off.
	Object.keys(data).forEach(function (key) {
		if (typeof data[key] !== "string") {
			return (data[key] = JSON.stringify(data[key]));
		}
	});

	const props = {
		name: data.name,
		type: data.type || "click", // Default to click
		content: data.content,
		pageLocation: data.pageLocation ? data.pageLocation : null,

		// current page info
		url: currentPage,
		title: currentTitle,
	};

	if (window.analytics) {
		window.analytics.track("Page Interaction - General", props);
	}
};

/**
 * Standardized event for a link interaction. Any properties that are unknown may be null.
 *
 * Usually recommended to set this up in an abstracted <Link /> component so you don't have to add it to every next/link import.
 *
 * @param {string} name Unique name for the interaction
 * @param {string} type Button, Text, Other
 * @param {string} text Text in the button/link
 * @param {string} destination URL for link
 */
export const segmentLinkInteraction = (name, type, text, destination, pageLocation = null) => {
	const currentPage = getWindowUrl();
	const currentTitle = getWindowTitle();
	let addProps = {};

	const props = {
		name: name,
		linkType: type,
		linkText: text,
		destination,
		pageLocation,
		...addProps,

		// current page info
		url: currentPage,
		title: currentTitle,
	};

	window.analytics.track("Page Interaction - Link", props);
};
