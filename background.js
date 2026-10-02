// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// TODO: put this in something like lib.js or something so popup.js can also
// use this
async function setDefaultInstance() {
    const sync = await browser.storage.sync.get("instance");
    let instance = sync.instance;
    if (instance == undefined || instance == "") {
        await browser.storage.sync.set({ instance: "nitter.click" });
    }
}

(async() => {
    await setDefaultInstance();
})();

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    const url = new URL(details.url);
    if (url.hostname === 'twitter.com' || url.hostname === 'x.com') {
        const storage = await browser.storage.sync.get("instance");
        const newUrl = "https://" + storage.instance + url.pathname + url.search + url.hash;
        await chrome.tabs.update(details.tabId, { url: newUrl });
    }
});

