let XMLHttpRequest = require("xmlHttpRequest").XMLHttpRequest;

function makeAjaxCall(methodType, url, callbackfnc, async = true, data = null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log("State Changed Called. Ready State: "+ xhr.readyState+" Status: "+xhr.status);
        if(xhr.readyState == 4){
            //Matching 200 reponse
            if(xhr.status ===200 || xhr.status === 201){
                callback(xhr.responseText)
            }else if(xhr.status >= 400){
                console.log("400 Client or 500 Server Error Occured")
            }
        }
    }

    xhr.open(methodType, url, async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data))
    }else xhr.send();
    console.log(methodType+" request Sent to the server!");

}
const getUrl = "http://localhost:3000/employees/1";

function getDetails(data){
    console.log("User Data: "+data);
}

makeAjaxCall("GET", getUrl, getDetails);

const deleteUrl =  "http://localhost:3000/employees/4";

function userDeleted(data){
    console.log("User Deleted: "+data);
}

makeAjaxCall("DELETE",deleteUrl,userDeleted,false);

const postUrl = "http://localhost:3000/employees/";
const empData = 
{"Name": "Harry", "Salary": 500000};

function userAdded(data){
    console.log("User Added: "+data);
}

makeAjaxCall("POST", postUrl, userAdded, true, empData);
