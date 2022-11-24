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
                            document.querySelector("#createProject").style.display = "block";
                            document.querySelector("#stopProject").style.display = "none";
                            return;
                        }
                        alert("Recording started..")
                        document.querySelector("#createProject").style.display = "none";
                        document.querySelector("#stopProject").style.display = "block";

                    });


                } else {
                    alert("Error creating documentation : " + data);
                    document.querySelector("#createProject").style.display = "block";
                    document.querySelector("#stopProject").style.display = "none";
                }
            }).catch(err => {
                //console.log("err", err);
                alert("Error creating documentation");
                document.querySelector("#createProject").style.display = "block";
                document.querySelector("#stopProject").style.display = "none";
            });
    });
}

document.getElementById("createProject").onclick = (async function () {
    getNewDocumentationId()
})



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
    chrome.storage.local.remove(["token", "docuId"], function () {
        alert("Logged out");
        document.querySelector(".loginForm").style.display = "block";
        document.querySelector(".user_logged_in").style.display = "none";
    })
})

document.getElementById("stopProject").onclick = (async function (e) {
    chrome.storage.local.remove(["docuId"], function () {
        alert("Recording stopped..");
        document.querySelector("#createProject").style.display = "block";
        document.querySelector("#stopProject").style.display = "none";
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
                        alert(
                            "Error setting " + " token " + " to " + JSON.stringify(data.token) +
                            ": " + chrome.runtime.lastError.message
                        );
                        return;
                    }

                    document.querySelector(".loginForm").style.display = "none";
                    document.querySelector(".user_logged_in").style.display = "block";
                });


            } else {
                alert("Invalid credentials : " + data)
                document.querySelector(".loginForm").style.display = "block";
                document.querySelector(".user_logged_in").style.display = "none";
            }
            //console.log("login data", data);
        }).catch(err => {
            //console.log("err", err);
            alert("Invalid credentials")
            document.querySelector(".loginForm").style.display = "block";
            document.querySelector(".user_logged_in").style.display = "none";
        });

    //console.log(document, __username, __password);
})

document.addEventListener("DOMContentLoaded", async () => {

    //check if token exist
    chrome.storage.local.get("token", function (data) {
        if (data && data.token) {
            let { token } = data;
            if (token.length > 0) {
                document.querySelector(".loginForm").style.display = "none";
                document.querySelector(".user_logged_in").style.display = "block";
            } else {
                document.querySelector(".loginForm").style.display = "block";
                document.querySelector(".user_logged_in").style.display = "none";
            }
        } else {
            document.querySelector(".loginForm").style.display = "block";
            document.querySelector(".user_logged_in").style.display = "none";
        }
    });


    chrome.storage.local.get("docuId", function (data) {
        if (data && data.docuId) {
            let { docuId } = data;
            if (docuId.length > 0) {
                document.querySelector("#createProject").style.display = "none";
                document.querySelector("#stopProject").style.display = "block";
            } else {
                document.querySelector("#createProject").style.display = "block";
                document.querySelector("#stopProject").style.display = "none";
            }
        } else {
            document.querySelector("#createProject").style.display = "block";
            document.querySelector("#stopProject").style.display = "none";
        }
    });


})