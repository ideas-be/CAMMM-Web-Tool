var myJson, myCityJson, myServicesJson;

function serviceJson(servicesObj) {
    myServicesJson = servicesObj;
    console.log("Initializing new Services Json obj");
    console.log(myServicesJson);
    setTimeout(calDiversityServices, 1300);
}

function cityJson(cityObj) {
    myCityJson = cityObj;
    console.log("Initializing new City Json obj");
    console.log(myCityJson);
    // setTimeout(calMultiModality, 1200);
}
function newJson(obj) {
    myJson = obj;
    console.log("Initializing new Node Json obj");
}

var isOpened = true;

var nodeProperties;

const openSidebar = (nodeProps) => {

    nodeProperties = nodeProps;

    if (isOpened) {
        // setTimeout(calMultiModality, 1200);
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "300px";
        document.getElementById("main").style.marginRight = "300px";
        document.getElementById("query-name").innerHTML = selectedQuery + " rating:";
        document.getElementById("query-name").style.color = "#d81b60";
        displayQueryRating();
        var sidebarHTML = "";
        if (nodeProperties.Type == 'Hub') {
            sidebarHTML += nodeProperties.Category + " Hub<br><h2>" + nodeProperties.Name + "</h2>" + "<iframe src=\"https://www.google.com/maps/embed?pb=!4v1666713720490!6m8!1m7!1s2GB1U9IEipeoMotr7X9lGw!2m2!1d45.56103412274398!2d-73.70978898711944!3f172.86802296682595!4f2.415573086827166!5f0.7820865974627469\" width=\"100%\" height=\"300\" style=\"border:0;\" allowfullscreen=\"\"></iframe>" + "<br>Number of Metro Stations: " + nodeProperties.NumberOfStations + "<br>Number of Bus Stops: " + nodeProperties.NumberOfStops + "<br>Number of Services: " + nodeNumberServices;
        } else if (nodeProperties.Type == 'Cluster') {
            sidebarHTML += nodeProperties.Category + " Cluster<br><h2>" + nodeProperties.Name + "</h2><a href=\"" + nodeProperties.URL + "\"  style=\"width=100%; border:0; background-color: #f15924; color: white;\" target:\"_blank\">Street View</a>" + "<br>Number of Stops: " + nodeProperties.NumberOfStops + "<br>List of Stops: " + nodeProperties.ListOfStops;
        }
        sidebarDiv.innerHTML += sidebarHTML;

        isOpened = false;
    } else {
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "0";
        sidebarDiv.innerHTML = "";
        document.getElementById("main").style.marginRight = "0";
        isOpened = true;
    }

};

function calMultiModality() {
    if (myCityJson["City"]["Name_en"] == "Montreal") {
        var totalTransit = 0;
        for (key in myCityJson["City"]["TransitTypesStops"]) {
            var value = myCityJson["City"]["TransitTypesStops"][key];
            if (value != 0) {
                totalTransit += 1;
            }
        }
        console.log("Total transit");
        console.log(totalTransit);
    }
}
var nodeNumberServices = 0;

function calDiversityServices() {
    console.log("Diversity of Primary, Secondary and Tertiary Services");
    var serviceProperties;
    for (i = 0; i < myServicesJson.features.length; i++) {
        if (nodeProperties.fid == myServicesJson.features[i].properties.fid) {
            serviceProperties = myServicesJson.features[i].properties;
        }
    }
    nodeNumberServices = serviceProperties.Primary_NumberServices + serviceProperties.Secondary_NumberServices + serviceProperties.Tertiary_NumberServices;
    console.log(nodeNumberServices);
}

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
    var queryRatingDiv = document.getElementById("query-rating");
    var ratingHTML = "<span class=\"rating-value\">8</span><span>/10\n</span><span class=\"rating-words\">Very Good</span><div><progress id=\"rating-bar\" value=\"32\" max=\"100\"> 32% </progress></div>";
    queryRatingDiv.innerHTML = ratingHTML;
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