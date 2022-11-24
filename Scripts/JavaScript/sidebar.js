var myJson, myCityJson, myServicesJson;

function serviceJson(servicesObj) {
    myServicesJson = servicesObj;
    console.log("Initializing new Services Json obj");
    // console.log(myServicesJson);
    // setTimeout(calDiversityServices, 1300);
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

var nodeProperties, nodeCategory;

function openSidebar(nodeProps) {

    nodeProperties = nodeProps;
    console.log(nodeProperties);

    fetchStopsLines();

    if (isOpened) {
        // setTimeout(calMultiModality, 1200);
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "300px";
        document.getElementById("main").style.marginRight = "300px";
        document.getElementById("query-name").innerHTML = selectedQuery + " rating:";
        document.getElementById("query-name").style.color = "#d81b60";

        // Node Category & Type
        document.getElementById("node-category-type").innerHTML = nodeCategory + " " + nodeProperties.Type;

        // Node Name
        document.getElementById("node-name").innerHTML = nodeProperties.Name;

        // Node Street View
        document.getElementById("node-street-view").innerHTML = "<iframe src=\"" + nodeProperties.URL + "\">Street View</iframe>";

        displayStopsLines();

        isOpened = false;
    } else {
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "0";
        sidebarDiv.innerHTML = "";
        document.getElementById("main").style.marginRight = "0";
        isOpened = true;
    }

};

var NumberBusStops = 0;
var NumberMetroStations = 0;

var MetroData, BusData;

function fetchStopsLines() {

    MetroData = JSON.parse(nodeProperties.MetroData);
    BusData = JSON.parse(nodeProperties.BusData);

    console.log("Metro JSON: ", MetroData);
    console.log("Bus JSON  : ", BusData);
    // console.log("Bus Data", nodeProperties.BusData, typeof (nodeProperties.BusData));

    for (const key in MetroData) {
        NumberMetroStations += 1;
    }
    for (const key in BusData) {
        NumberBusStops += 1;
        console.log("NumberBusStops", NumberBusStops, "key", key, BusData[key]);
    }
    console.log("Number of Metro Stations: ", NumberMetroStations);
    console.log("Number of Bus Stops: ", NumberBusStops);

    assignCategory();
    NumberMetroStations = 0;
    NumberBusStops = 0;

}

function displayStopsLines() {

    var transitMenuDiv = document.getElementById("transit-option-menu");
    var transitOptionHTML = "";
    for (const key in BusData) {
        var busLines = " | ";
        for (i = 0; i < BusData[key].length; i++) {
            busLines += BusData[key][i] + " | ";
        }
        transitOptionHTML += "<div id=\"transit-option\">" +
            "<p id=\"transit-stop-id\">#" + key + "</p>" +
            "<i class=\"fas fa-bus fa-2x\"></i>" +
            "<div id=\"transit-lines\">" +
            "<p>" + busLines + "</p>" +
            "</div>" +
            "</div>";
    }

    transitMenuDiv.innerHTML = transitOptionHTML;



    // var IconList = ["fas fa-bus", "fas fa-train", "fas fa-subway", "fas fa-train-tram", "fas fa-taxi"];
    // //     var StopType = ["Bus Stops", "Train Stations", "Metro Stations", "Tram Stops", "Other Stops"];
    // //     var TransitColors = ["#f85a63ff", "#5ebea0ff", "#6379eaff", "#dd4e14ff", "#98d04eff"];
    // var transitOptionHTML = "<div id=\"transit-option\"></div>";

    // <div class=\"transit-icon\" style=\"color: " + TransitColors[i] + "; \">" + "<i class=\"" + IconList[i] + " fa-2x\"></i>" + "</div>"

    // for (const key in SampleMetroArray) {
    //     NumberMetroStations += 1;
    // }
    // for (const key in SampleBusArray) {
    //     NumberBusStops += 1;
    // }



}

function assignCategory() {
    // Small Cluster - 1-2 bus stops
    // Medium Cluster - 3-5 bus stops
    // Large Cluster - 6+ bus stops
    // Small Hub - 1-4 bus stops + 1 Rail/metro station
    // Medium Hub - 5+ bus stops + 1 Rail/metro station
    // Large Hub - 1+ bus stops + 2 Rail/Metro station

    if (nodeProperties.Type == "Cluster") {

        console.log("Finding the Category of this Cluster!!");
        if ((NumberBusStops >= 1) && (NumberBusStops <= 2)) {
            console.log("Small Cluster!!");
            nodeCategory = "Small";
        } else if ((NumberBusStops >= 3) && (NumberBusStops <= 5)) {
            console.log("Medium Cluster!!");
            nodeCategory = "Medium";
        } else if ((NumberBusStops >= 6)) {
            console.log("Large Cluster!!");
            nodeCategory = "Large";
        }

    } else if (nodeProperties.Type == "Hub") {

        console.log("Finding the Category of this Hub!!");
        if ((NumberMetroStations == 1) && (NumberBusStops >= 1) && (NumberBusStops <= 4)) {
            console.log("Small Hub!!");
            nodeCategory = "Small";
        } else if ((NumberMetroStations == 1) && (NumberBusStops >= 5)) {
            console.log("Medium Hub!!");
            nodeCategory = "Medium";
        } else if ((NumberMetroStations == 2) && (NumberBusStops >= 1)) {
            console.log("Large Hub!!");
            nodeCategory = "Large";
        }

    }
}

function callQueryCalFunc(selQuery) {

    console.log("Running Query Function Calls with Switch Case");

    switch (selQuery) {
        case "Select Query": console.log("Please select the query");
            break;
        case "Multimodality": calMultiModality();
            break;
        case "Accessibility": console.log("Accessibility");
            break;
        case "Serviceability": calDiversityServices();
            break;
        case "Reliability": console.log("Reliability");
            break;
        default: console.log("missing query");
    }

}

function calMultiModality() {
    if (myCityJson.City.Name_en == "Montreal") {
        var totalTransit = 0;
        for (key in myCityJson["City"]["TransitTypesStops"]) {
            // console.log(myCityJson["City"]["TransitTypesStops"][key]);
            var value = myCityJson["City"]["TransitTypesStops"][key];
            if (value != 0) {
                totalTransit += 1;
            }
        }
        console.log("Total transit");
        console.log(totalTransit);
        var MultimodalityRating = 8;
        displayQueryRating(MultimodalityRating);
    }
}
var nodeNumberServices = 0;

function calDiversityServices() {
    console.log("Diversity of Primary, Secondary and Tertiary Services");
    var serviceProperties;

    console.log("Node Properties:");
    console.log(nodeProperties);

    for (i = 0; i < myServicesJson.features.length; i++) {
        // console.log(myServicesJson.features[i].properties.fid);
        if (nodeProperties.fid == myServicesJson.features[i].properties.fid) {
            serviceProperties = myServicesJson.features[i].properties;
        }
    }
    nodeNumberServices = serviceProperties.Primary_NumberServices + serviceProperties.Secondary_NumberServices + serviceProperties.Tertiary_NumberServices;
    console.log(nodeNumberServices);

    var ServiceabilityRating = 6;
    displayQueryRating(ServiceabilityRating);
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

var selectedQuery = "Select Query";
// displayQueryRating(8);

function getSelectedQuery(queryName) {
    selectedQuery = queryName;
    document.getElementById("dropbtn").innerHTML = selectedQuery;
    document.getElementById("query-name").innerHTML = selectedQuery + " rating:";
    callQueryCalFunc(selectedQuery);
}

function displayQueryRating(ratingValue) {
    var queryRatingDiv = document.getElementById("query-rating");
    var ratingHTML = "<span class=\"rating-value\">" + ratingValue + "</span><span>/10\n</span><span class=\"rating-words\">Very Good</span><div><progress id=\"rating-bar\" value=\"" + ratingValue * 10 + "\" max=\"100\"> 32% </progress></div>";
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