function showTime(){
    const date = new Date();
    return date.getHours()+" Hrs : "+date.getMinutes()+" Min : "+date.getSeconds()+" Sec";
}

function showSessionExpired(){
    console.log("This session expired at "+showTime());
}

console.log("Triggering expiry event at "+showTime());
setTimeout(showSessionExpired, 5000);
console.log("Triggered expiry event at: "+showTime()+" after 5 secs.");
