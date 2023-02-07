var nodeCategory;
var nodeProperties = fetchNodeProps();
// Rail-based transit stations
var NumberRailStations = 0;
var NumberMetroStations = 0;
// Street transit stops
var NumberTramStops = 0;
var NumberBusStops = 0;
// Sharing transit stops
var NumberCarShareStops = 0;
var NumberBikeShareStops = 0;


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

}


function displayStopsLines() {

    // document.getElementById("query-info").innerHTML = "";

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

function displayTransitModes() {
    // TODO: Show the available transit modes in sidebar

    var queryInfoDiv = document.getElementById("query-info");

    var transitDictionary = [
        {
            transitName: "bus",
            transitIcons: "fas fa-bus fa-2x",
            isActive: NumberBusStops > 0 ? true : false
        },
        {
            transitName: "metro",
            transitIcons: "fas fa-subway fa-2x",
            isActive: NumberMetroStations > 0 ? true : false
        },
        {
            transitName: "rail",
            transitIcons: "fas fa-train fa-2x",
            isActive: NumberRailStations > 0 ? true : false
        },
        {
            transitName: "tram",
            transitIcons: "fas fa-train-tram fa-2x",
            isActive: NumberTramStops > 0 ? true : false
        },
        {
            transitName: "car-sharing",
            transitIcons: "fas fa-car fa-2x",
            isActive: NumberCarShareStops > 0 ? true : false
        },
        {
            transitName: "bike-sharing",
            transitIcons: "fas fa-bicycle fa-2x",
            isActive: NumberBikeShareStops > 0 ? true : false
        }
    ];

    console.log("Transit Dictionary:", transitDictionary);

    var transitModeHTML = "<div id=\"transit-mode-section\">";

    for (transitMode in transitDictionary) {
        if (transitDictionary[transitMode].isActive == true) {
            transitModeHTML += "<div id=\"transit-mode\">" +
                "<i class=\"" + transitDictionary[transitMode].transitIcons + "\"></i>" +
                "<div id=\"transit-mode-name\">" +
                "<p>" + transitDictionary[transitMode].transitName + "</p>" + "</div>" + "</div>";
        }
    }
    for (transitMode in transitDictionary) {
        if (transitDictionary[transitMode].isActive == false) {
            transitModeHTML += "<div id=\"transit-mode\">" +
                "<i class=\"" + transitDictionary[transitMode].transitIcons + "\" style=\"color:#d3d3d3;\"></i>" +
                "<div id=\"transit-mode-name\">" +
                "<p>" + transitDictionary[transitMode].transitName + "</p>" + "</div>" + "</div>";
        }
    }

    console.log("Inserting Available Transit Modes");

    queryInfoDiv.innerHTML = transitModeHTML + "</div>Available Transit Modes";
    console.log("Checking transit mode HTML", transitModeHTML);

}

function calMultiModality() {

    // document.getElementById("query-info").innerHTML = "";
    displayTransitModes();
    displayStopsLines();

    fetchGeoJson("Lines.geojson");
    displayLines();

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
        // var nodeProperties = fetchNodeProps();

        if (NumberMetroStations > 0)
            nodeTransit += 1;
        if (NumberBusStops > 0)
            nodeTransit += 1;
        if (NumberRailStations > 0)
            nodeTransit += 1;
        if (NumberTramStops > 0)
            nodeTransit += 1;
        if (NumberCarShareStops > 0)
            nodeTransit += 1;
        if (NumberBikeShareStops > 0)
            nodeTransit += 1;

        console.log("Transit Types at the Current Node: ", nodeTransit);

        // Multimodality Rating Formula
        var MultimodalityRating = (nodeTransit / totalTransit) * 10;

        // Add bixi, communauto icon but grey them out
        // check GBSF for bixi

        // Think about Directionality as a separate query

        displayQueryRating(MultimodalityRating);
    }
}

