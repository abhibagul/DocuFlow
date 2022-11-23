import { getCurrentTab } from './utlis.js';

let __all_actions__ = [];

const _show_all_actions = () => {

}


async function getNewDocumentationId() {
    return await chrome.storage.local.get("token", async function (tokenData) {

        let token = "";
        if (tokenData && tokenData.token) {
            token = tokenData.token;
        }
        if (token.length < 1) {
            alert("Please login first.")
            return;
        }

        await postData('http://localhost:8000/api/create-documentation/', {}, { 'authorization': 'Bearer ' + token })
            .then((data) => {
                //console.log("docid data", data);
                if (data && data.docuId) {
                    chrome.storage.local.set({ docuId: data.docuId }, function () {
                        if (chrome.runtime.lastError) {
                            console.error(
                                "Error setting " + " token " + " to " + JSON.stringify(data.token) +
                                ": " + chrome.runtime.lastError.message
                            );
                        }
                    });


                } else {
                    alert("Error creating documentation : " + data)
                }
            }).catch(err => {
                //console.log("err", err);
                alert("Error creating documentation")
            });
    });
}

document.getElementById("createProject").onclick = (async function () {
    getNewDocumentationId()
})

// async function postData(url = '', data = {}) {
//     return await chrome.storage.local.get("token", async function (data) {

//         let token = "";
//         if (data && data.token) {
//             token = data.token;
//         }
//         //console.log('token is', token)

//         const response = await fetch(url, {
//             method: 'POST',
//             mode: 'cors',
//             cache: 'no-cache',
//             credentials: 'same-origin',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': 'Bearer ' + token
//             },
//             redirect: 'follow',
//             referrerPolicy: 'no-referrer',
//             body: JSON.stringify(data)
//         });
//         return response.json();
//     });

// }

async function postData(url = '', data = {}, headersAttr = {}) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            ...headersAttr
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();


}

document.getElementById("logout").onclick = (async function (e) {
    //delete token from storage
    chrome.storage.local.remove(["token"], function () {
        alert("Logged out")
    })
})

document.getElementById("stopProject").onclick = (async function (e) {
    chrome.storage.local.remove(["docuId"], function () {
        alert("Recording stopped..")
    })
})

document.getElementById("loginForm").onsubmit = (async function (e) {
    e.preventDefault();

    let __username = document.querySelector(`#loginForm input[type="email"]`).value;
    let __password = document.querySelector(`#loginForm input[type="password"]`).value;

    await postData('http://localhost:8000/api/login/', { email: __username, password: __password })
        .then((data) => {
            if (data && data.token) {
                chrome.storage.local.set({ token: data.token }, function () {
                    if (chrome.runtime.lastError) {
                        console.error(
                            "Error setting " + " token " + " to " + JSON.stringify(data.token) +
                            ": " + chrome.runtime.lastError.message
                        );
                    }
                });


            } else {
                alert("Invalid credentials : " + data)
            }
            //console.log("login data", data);
        }).catch(err => {
            //console.log("err", err);
            alert("Invalid credentials")
        });

    //console.log(document, __username, __password);
})

document.addEventListener("DOMContentLoaded", async () => {

    //check if token exist
    chrome.storage.local.get("token", function (data) {
        if (data && data.token) {
            let { token } = data;
            document.querySelector("#loginForm").innerHTML = token;
        }
    });

    // const { tab, img } = await getCurrentTab();

    // await chrome.storage.sync.get("documentation", data => {
    //     const __existing_actions = data["documentation"] ? JSON.parse(data["documentation"]) : []


    //     __all_actions__ = [...__all_actions__, ...__existing_actions]

    //     __all_actions__.push({ tab, img });

    //     ////console.log(__all_actions__, "dom loaded");

    //     let __doc = "";
    //     for (let a of __all_actions__) {
    //         if (a.tab.url) {
    //             __doc += `<div class="step">User navigated to <code>${a.tab.url}</code><div class="imgprev"><img style="max-width:150px" src="${a.img}"></div></div>`;
    //         }
    //     }

    //     document.querySelector(".showres").insertAdjacentHTML('beforeend', __doc);
    // })
})