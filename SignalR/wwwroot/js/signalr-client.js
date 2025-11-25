// create connection
const connectionUserCount = new signalR.HubConnectionBuilder().configureLogging(signalR.LogLevel.Trace).withUrl("/hubs/userCount", { transport: signalR.HttpTransportType.WebSockets }).build();

// connect to methods that hub invokes (receive notifications from hub)
connectionUserCount.on("updateTotalViews", (value) =>{
    const newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.textContent = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) =>{
    const newCountSpan = document.getElementById("totalUsersCounter");
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
