chrome.webNavigation.onBeforeNavigate.addListener(function(d) {
	const url = new URL(d.url);
	if (url.hostname == 'twitter.com') {
		const newUrl = 'https://nitter.net' + url.pathname + url.search + url.hash;
		chrome.tabs.update(d.tabId, {url: newUrl});
	}
});
