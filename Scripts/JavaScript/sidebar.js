var myJson;

function newJson(obj) {
    myJson = obj;
    console.log("Initializing new Node Json obj");
}

var isOpened = true;

const openSidebar = (nodeProperties) => {
    if (isOpened) {
        // console.log(desc);
        var sidebarDiv = document.getElementById("mySidebar");
        // var windowWidth = window.MediaQueryList.windowWidth;
        sidebarDiv.style.width = "300px";
        // toString(windowWidth * 0.3);
        document.getElementById("main").style.marginRight = "300px";
        var sidebarHTML = "";
        if (nodeProperties.Type == 'Hub') {
            sidebarHTML = nodeProperties.Category + " Hub: " + nodeProperties.Name + "<embed src=\"" + nodeProperties.URL + "\" style=\"width=100%; border:0; background-color: #d81b60; color: white;\">" + "<br>Number of Metro Stations: " + nodeProperties.NumberOfStations + "<br>List of Metro Stations: " + nodeProperties.ListOfStations + "<br>Number of Bus Stops: " + nodeProperties.NumberOfStops + "<br>List of Bus Stops: " + nodeProperties.ListOfStops;
        } else if (nodeProperties.Type == 'Cluster') {
            sidebarHTML = nodeProperties.Category + " Cluster: " + nodeProperties.Name + "<a href=\"" + nodeProperties.URL + "\"  style=\"width=100%; border:0; background-color: #f15924; color: white;\" target:\"_blank\">Street View</a>" + "<br>Number of Stops: " + nodeProperties.NumberOfStops + "<br>List of Stops: " + nodeProperties.ListOfStops;
        }
        sidebarDiv.innerHTML = sidebarHTML;

        isOpened = false;
    } else {
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "0";
        sidebarDiv.innerHTML = "";
        document.getElementById("main").style.marginRight = "0";
        isOpened = true;
    }

};

function getClusters() {
    var clusterList = [];
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        if (myJson.features[i].properties.Type == "Cluster")
            clusterList.push(myJson.features[i]);
    }
    return (clusterList);
}

function getHubs() {
    var hubList = [];
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        if (myJson.features[i].properties.Type == "Hub")
            hubList.push(myJson.features[i]);
    }
    return (hubList);
}