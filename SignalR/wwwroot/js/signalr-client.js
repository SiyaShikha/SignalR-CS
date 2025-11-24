// create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// connect to methods that hub invokes (receive notifications from hub)
connectionUserCount.on("updateTotalViews", (value) =>{
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.textContent = value.toString();
});

// invoke hub methods (sends notification to hub)
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

// start connection
function fulfilled() {
    console.log("connection to user hub successful");
    newWindowLoadedOnClient();
}

function rejected() {
    console.log("connection to user hub failed");
}

connectionUserCount.start().then(fulfilled, rejected);
