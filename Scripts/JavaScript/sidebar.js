var myJson;

function newJson(obj) {
    myJson = obj;
    console.log("Initializing new Node Json obj");
}

var isOpened = true;

const openSidebar = (nodeProperties) => {
    if (isOpened) {
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "300px";
        document.getElementById("main").style.marginRight = "300px";
        var sidebarHTML = "<p id=\"query-name\">" + selectedQuery + " rating:</p>" + displayQueryRating();
        if (nodeProperties.Type == 'Hub') {
            sidebarHTML += nodeProperties.Category + " Hub: " + nodeProperties.Name + "<embed src=\"" + nodeProperties.URL + "\" style=\"width=100%; border:0; background-color: #d81b60; color: white;\">" + "<br>Number of Metro Stations: " + nodeProperties.NumberOfStations + "<br>List of Metro Stations: " + nodeProperties.ListOfStations + "<br>Number of Bus Stops: " + nodeProperties.NumberOfStops + "<br>List of Bus Stops: " + nodeProperties.ListOfStops;
        } else if (nodeProperties.Type == 'Cluster') {
            sidebarHTML += nodeProperties.Category + " Cluster: " + nodeProperties.Name + "<a href=\"" + nodeProperties.URL + "\"  style=\"width=100%; border:0; background-color: #f15924; color: white;\" target:\"_blank\">Street View</a>" + "<br>Number of Stops: " + nodeProperties.NumberOfStops + "<br>List of Stops: " + nodeProperties.ListOfStops;
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

function queryDropDown() {
    var queryList = ["Multimodality", "Accessibility", "Serviceability", "Reliability"];
    var dropDownDiv = document.getElementById("dropdown-content");
    var dropDownHTML = "";

    for (i = 0; i < queryList.length; i++) {
        // console.log(queryList[i]);
        dropDownHTML += "<a href=\"#\" onclick=\"getSelectedQuery(\'" + queryList[i] + "\');\">" + queryList[i] + "</a>";
    }

    dropDownDiv.innerHTML += dropDownHTML;
}

var selectedQuery = "Multimodality";

function getSelectedQuery(queryName) {
    selectedQuery = queryName;
    document.getElementById("dropbtn").innerHTML = selectedQuery;
    document.getElementById("query-name").innerHTML = selectedQuery + " rating:";
}

function displayQueryRating() {
    var ratingHTML = "<div class=\"query-rating\"><span class=\"rating-value\">8</span><span>/10\n</span></div>";
    return (ratingHTML);
}

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