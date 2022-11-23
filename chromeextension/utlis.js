export async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    let img = await chrome.tabs.captureVisibleTab();
    return { tab: tab, img: img };
}

