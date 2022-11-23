// // Setting
// chrome.storage.local.set({ key: data }, function () {
//     if (chrome.runtime.lastError) {
//         console.error(
//             "Error setting " + key + " to " + JSON.stringify(data) +
//             ": " + chrome.runtime.lastError.message
//         );
//     }
// });

// // Getting
// chrome.storage.local.get("key", function (data) {
//     // Do something with data.key
// });

// send data to server
async function postData(url = '', data = {}, headr = {}) {
    const response = await fetch(url, {
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

// starter
chrome.runtime.onInstalled.addListener(() => {

    console.log("This is a background script working!");

    let callback = function () {

    }


})


//When tab sends some data
chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {

        let img = await chrome.tabs.captureVisibleTab();
        let msgSender = sender;
        let msgReq = request;
        console.log("background revived action", request.action, request.edata);

        await chrome.storage.local.get(["token", "docuId"], async function (data) {
            console.log("msg rcv dara", data);
            if (data && data.token && data.docuId) {
                let { token, docuId } = data;
                getToken = token;

                postData('http://localhost:8000/api/tabChange/', { docuId, type: msgReq.action, data: { tabId: msgSender.tab, url: msgSender.tab.url, event: msgReq.edata, img } }, { 'authorization': 'Bearer ' + token })
                    .then((data) => {
                        console.log(data);
                    });
            }
        });

    }
)

// Tab change event
chrome.tabs.onHighlighted.addListener(async (data) => {
    if (!data.tabIds || data.tabIds.length < 1) return;
    let tabImg = "";
    let currentTabId = data.tabIds[0];
    let tabD = data;

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
                postData('http://localhost:8000/api/tabChange/', { docuId, type: "onHighlight", data: data }, { 'authorization': 'Bearer ' + token })
                    .then((data) => {
                        console.log(data);
                    });
            });
        }
    });




})



// When tab is removed
chrome.tabs.onRemoved.addListener(async (tabId) => {
    let tabrmId = tabId;

    await chrome.storage.local.get(["token", "docuId"], async function (data) {
        if (data && data.token && data.docuId) {
            let { token, docuId } = data;
            getToken = token;

            postData('http://localhost:8000/api/tabChange/', { docuId, type: "onRemoved", data: tabrmId }, { 'authorization': 'Bearer ' + token })
                .then((data) => {
                    console.log(data);
                });

        }
    })

})

// When tab content is updated
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

            postData('http://localhost:8000/api/tabChange/', { docuId, type: "onUpdated", data: { tabId: updTabId, changeInfo: updchangeInfo, tab: updtab } }, { 'authorization': 'Bearer ' + token })
                .then((data) => {
                    console.log(data);
                });
        }
    });
})