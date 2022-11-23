
chrome.runtime.onMessage.addListener(function (request, sener, sendResponse) {
    console.log(request);
})

// chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
//     console.log(response.farewell);
// })


//recieve a message
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "resize") {

        }
    }
)

async function sendMessage(t, e) {
    let clientX = 0;
    let clientY = 0;
    let subType = "";
    let altKey = false;
    let offsetX = 0;
    let offsetY = 0;
    let target = {};
    let ctrlKey = false;
    let shiftKey = false;

    if (e.clientX) {
        clientX = e.clientX;
    }

    if (e.clientY) {
        clientY = e.clientY;
    }

    if (e.type) {
        subType = e.type;
    }

    if (e.altKey) {
        altKey = e.altKey;
    }

    if (e.ctrlKey) {
        ctrlKey = e.ctrlKey;
    }

    if (e.shiftKey) {
        shiftKey = e.shiftKey;
    }

    if (e.offsetX) {
        offsetX = e.offsetX;
    }

    if (e.offsetY) {
        offsetY = e.offsetY;
    }



    if (e.target) {
        target = {
            nodeName: e.target.nodeName,
            innerText: e.target.innerText,
        }
    }




    // console.log("Action recorded", t, e, { windowW: window.innerWidth, windowH: window.innerHeight, clientX, clientY, subType, altKey, offsetX, offsetY, target, ctrlKey, shiftKey });
    await chrome.runtime.sendMessage({ action: t, edata: { windowW: window.innerWidth, windowH: window.innerHeight, clientX, clientY, subType, altKey, offsetX, offsetY, target, ctrlKey, shiftKey } })

}

function init() {
    let __docuflow_elems = document.querySelectorAll("*");
    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('click', (e) => {
            e.stopPropagation()
            sendMessage("AnchorLinkClick", e)
        })
    })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('contextmenu', (e) => {
            e.stopPropagation()
            sendMessage("contextMenuClick", e)
        })
    })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('copy', (e) => {
            e.stopPropagation()
            sendMessage("copySelection", e)
        })
    })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('cut', (e) => {
            e.stopPropagation()
            sendMessage("cutSelection", e)
        })
    })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('dblclick', (e) => {
            e.stopPropagation()
            sendMessage("doubleClick", e)
        })
    })

    // removed for safety
    // __docuflow_elems.forEach((__e) => {
    //     __e.addEventListener('input', (e) => {
    //         sendMessage("input", e)
    //     })
    // })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('paste', (e) => {
            e.stopPropagation()
            sendMessage("pasteSelection", e)
        })
    })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('resize', (e) => {

            e.stopPropagation()
            sendMessage("resize", e)
        })
    })

    // unexpected behaviour
    // __docuflow_elems.forEach((__e) => {
    //     __e.addEventListener('scroll', (e) => {
    //         e.stopPropagation()
    //         sendMessage("scroll", e)
    //     })
    // })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('search', (e) => {
            e.stopPropagation()
            sendMessage("search", e)
        })
    })

    __docuflow_elems.forEach((__e) => {
        __e.addEventListener('submit', (e) => {
            e.stopPropagation()
            sendMessage("submit", e)
        })
    })
}

init();