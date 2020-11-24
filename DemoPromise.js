let XMLHttpRequest = require("xmlHttpRequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State Changed Called. Ready State: " + xhr.readyState + " Status: " + xhr.status);
            if (xhr.status.toString.test(RegExp('^[2][0-9]{2}$'))) resolve(xhr.responseText);
            else if (xhr.status.toString.test(RegExp('^[4,5][0-9]{2}$'))) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed!");
            }
        }
    
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data))
        } else xhr.send();
        console.log(methodType + " request Sent to the server!");
    });
}

const getUrl = "http://localhost:3000/employees/1";
makePromiseCall("GET", getUrl, true)
    .then(responseText => {
        console.log("Get User Data: "+responseText)
    })
    .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));

const delUrl = "http://localhost:3000/employees/2";
makePromiseCall("DELETE", delUrl, true)
    .then(responseText => {
        console.log("User Data Deleted: "+responseText)
    })
    .catch(error => console.log("DEL Error Status: " + JSON.stringify(error)));

const postUrl = "http://localhost:3000/employees";
const empData = 
{"Name": "Sam", "Salary": 800000};
makePromiseCall("POST", postUrl, true, empData)
    .then(responseText => {
        console.log("User Data Added: "+responseText)
    })
    .catch(error => console.log("POST Error Status: " + JSON.stringify(error)));
