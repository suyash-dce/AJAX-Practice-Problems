function makePromiseCall(methodType, url, async=true, data=null) {
    return new Promise(function (resolve, reject) {
        let xhr=new XMLHttpRequest();
        xhr.onload=function() {
            console.log(methodType+"- State Changed Called. Ready State: "+xhr.readyState+" Status: "+xhr.status);
            if (xhr.status>=200 && xhr.status<300) resolve(xhr.responseText);
            else if (xhr.status >= 400) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed!");
            }
        };

        xhr.onerror=function() {
            reject({
                status : this.status,
                statusText: xhttp.statusText
            }); 
        };

        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data))
        }else xhr.send();
        console.log(methodType+" request Sent to the server");
    });
}
