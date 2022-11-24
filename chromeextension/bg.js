// send data to server
async function postData(data = {}, headr = {}) {
    const response = await fetch("https://docuflow.onrender.com/api/tabChange/", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            ...headr
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

// Welcome
chrome.runtime.onInstalled.addListener(() => {

    console.log("Docuflow has initialized!");

})


/**
 * It will recive data from the page and will
 * send to the database
 */
chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {

        let img = await chrome.tabs.captureVisibleTab();
        let msgSender = sender;
        let msgReq = request;

        await chrome.storage.local.get(["token", "docuId"], async function (data) {
            if (data && data.token && data.docuId) {
                let { token, docuId } = data;
                getToken = token;

                postData({ docuId, type: msgReq.action, data: { tabId: msgSender.tab, url: msgSender.tab.url, event: msgReq.edata, img } }, { 'authorization': 'Bearer ' + token })
            }
        });

    }
)

/**
 * Executed when a tab is highlighted
 */
chrome.tabs.onHighlighted.addListener(async (data) => {
    if (!data.tabIds || data.tabIds.length < 1) return;
    let currentTabId = data.tabIds[0];

    await chrome.storage.local.get(["token", "docuId"], async function (data) {

        if (data && data.token && data.docuId) {
            let { token, docuId } = data;
            getToken = token;
            // return getToken;
            await chrome.tabs.get(currentTabId, async (data) => {
                if (!data.active) {
                    //updating in backend
                    // no need to record it
                    return;
                }
                postData({ docuId, type: "onHighlight", data: data }, { 'authorization': 'Bearer ' + token })

            });
        }
    });




})



/**
 * When a tab is closed
 */
chrome.tabs.onRemoved.addListener(async (tabId) => {
    let tabrmId = tabId;

    await chrome.storage.local.get(["token", "docuId"], async function (data) {
        if (data && data.token && data.docuId) {
            let { token, docuId } = data;
            getToken = token;

            postData({ docuId, type: "onRemoved", data: tabrmId }, { 'authorization': 'Bearer ' + token })

        }
    })

})

/**  
 * When tab content is updated
 */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log('on updated', tabId, changeInfo, tab);

    let updTabId = tabId;
    let updchangeInfo = changeInfo;
    let updtab = tab;

    if (updtab.status !== "complete") {
        return;
    }

    await chrome.storage.local.get(["token", "docuId"], async function (data) {
        if (data && data.token && data.docuId) {
            let { token, docuId } = data;
            getToken = token;

            postData({ docuId, type: "onUpdated", data: { tabId: updTabId, changeInfo: updchangeInfo, tab: updtab } }, { 'authorization': 'Bearer ' + token })

        }
    });
})