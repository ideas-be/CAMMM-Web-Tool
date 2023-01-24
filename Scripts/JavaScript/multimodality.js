var nodeCategory;
var nodeProperties = fetchNodeProps();
// Rail-based transit stations
var NumberRailStations = 0;
var NumberMetroStations = 0;
// Street transit stops
var NumberTramStops = 0;
var NumberBusStops = 0;

var nodeTransitNumber = 0;

var RailData, MetroData, TramData, BusData;

function fetchStopsLines() {
    NumberRailStations = 0;
    NumberMetroStations = 0;
    NumberTramStops = 0;
    NumberBusStops = 0;
    // Rail-based transit
    RailData = JSON.parse(nodeProperties.RailData);
    MetroData = JSON.parse(nodeProperties.MetroData);

    // Street transit
    TramData = JSON.parse(nodeProperties.TramData);
    BusData = JSON.parse(nodeProperties.BusData);


    // console.log("Metro JSON: ", MetroData);
    // console.log("Bus JSON  : ", BusData);
    // console.log("Bus Data", nodeProperties.BusData, typeof (nodeProperties.BusData));

    // Rail-based transit station number
    for (const key in RailData) {
        NumberRailStations += 1;
    }
    for (const key in MetroData) {
        NumberMetroStations += 1;
    }
    // Street transit stop number
    for (const key in TramData) {
        NumberTramStops += 1;
    }
    for (const key in BusData) {
        NumberBusStops += 1;
    }
    console.log("Number of Rail Stations: ", NumberRailStations);
    console.log("Number of Metro Stations: ", NumberMetroStations);
    console.log("Number of Tram Stops: ", NumberTramStops);
    console.log("Number of Bus Stops: ", NumberBusStops);

    // if (NumberRailStations > 0) {
    //     nodeTransitNumber += 1;
    // }
    // if (NumberMetroStations > 0) {
    //     nodeTransitNumber += 1;
    // }
    // if (NumberTramStops > 0) {
    //     nodeTransitNumber += 1;
    // }
    // if (NumberBusStops > 0) {
    //     nodeTransitNumber +=1;                                                 
    // }

    // console.log("Node Transit Number from SidebarJS: ", nodeTransitNumber);
    // getTransitNumber(nodeTransitNumber);

    // nodeTransitNumber = 0;

}


function displayStopsLines() {

    document.getElementById("query-info").innerHTML = "";

    var transitMenuDiv = document.getElementById("transit-option-menu");
    var transitOptionHTML = "";

    // Adding Metro Data on Transit Options
    for (const key in MetroData) {
        var metroLines = " | ";
        for (i = 0; i < MetroData[key].length; i++) {
            metroLines += MetroData[key][i] + " | ";
        }
        transitOptionHTML += "<div id=\"transit-option\">" +
            "<p id=\"transit-stop-id\">#" + key + "</p>" +
            "<i class=\"fas fa-subway fa-2x\"></i>" +
            "<div id=\"transit-lines\">" +
            "<p>" + metroLines + "</p>" +
            "</div>" +
            "</div>";
    }
    // Adding Bus Data on Transit Options
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


    transitMenuDiv.innerHTML = transitOptionHTML + "<p>Transit Options</p>";

}

function assignCategory() {
    // Small Cluster - 1-2 bus stops
    // Medium Cluster - 3-5 bus stops
    // Large Cluster - 6+ bus stops
    // Small Hub - 1-4 bus stops + 1 Rail/metro station
    // Medium Hub - 5+ bus stops + 1 Rail/metro station
    // Large Hub - 1+ bus stops + 2 Rail/Metro station

    fetchStopsLines();

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

    return nodeCategory;
}

function calMultiModality() {

    document.getElementById("query-info").innerHTML = "";
    displayStopsLines();

    var myCityJson = readGeoJsonObj("city.geojson");
    console.log("City json read from query.js: ", myCityJson);
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

        // Calculate the number of transit types at node
        var nodeTransit = 0;
        var nodeProperties = fetchNodeProps();

        if (nodeProperties.MetroData.length > 2)
            nodeTransit += 1;
        if (nodeProperties.RailData.length > 2)
            nodeTransit += 1;
        if (nodeProperties.TramData.length > 2)
            nodeTransit += 1;
        if (nodeProperties.BusData.length > 2)
            nodeTransit += 1;

        console.log("Transit Types at the Current Node: ", nodeTransit);

        // Multimodality Rating Formula
        var MultimodalityRating = (nodeTransit / totalTransit) * 10;
        displayQueryRating(MultimodalityRating);
    }
}

