function queryDropDown() {
    var queryList = ["Multimodality", "Diversity of Services and Amenities", "Closeness of Services and Amenities", "Accessibility", "Greenery", "Walkability", "Connectivity"];
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
    if (selectedQuery == "Diversity of Services and Amenities") {
        document.getElementById("query-name").innerHTML = "Diversity rating:";
    } else if (selectedQuery == "Closeness of Services and Amenities") {
        document.getElementById("query-name").innerHTML = "Closeness rating:";
    } else {
        document.getElementById("query-name").innerHTML = selectedQuery + " rating:";
    }


}

function callQueryCalFunc() {

    console.log("Running Query Function Calls with Switch Case");

    switch (selectedQuery) {
        case "Select Query": console.log("Please select the query");
            break;
        case "Multimodality":
            fetchGeoJson("city.geojson");
            displayLines();
            setTimeout(calMultiModality, 200);
            break;
        case "Accessibility": console.log("Accessibility");
            break;
        case "Diversity of Services and Amenities":
            fetchGeoJson("services.geojson");
            setTimeout(calDiversityServices, 200);
            break;
        case "Closeness of Services and Amenities":
            fetchGeoJson("services.geojson");
            setTimeout(calClosenessServices, 200);
            break;
        case "Greenery": console.log("Greenery");
            break;
        case "Walkability": console.log("Walkability");
            break;
        case "Connectivity": console.log("Connectivity");
            break;
        default: console.log("missing query");
    }

}

// var nodeTransitNumber = 0;

// function getTransitNumber(nodeTransitNum) {

//     nodeTransitNumber = nodeTransitNum;
// }

function calMultiModality() {

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

        // TODO: Need to continue calculation here
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

var serviceProperties;

function fetchServiceProps() {
    var myServicesJson = readGeoJsonObj("services.geojson");

    var nodeProperties = fetchNodeProps();
    console.log("Node Properties:");
    console.log(nodeProperties);

    // console.log("Node properties ID: ", nodeProperties.Id);
    // console.log("Service Json ID: ", myServicesJson.features[0].properties.Id);

    for (i = 0; i < myServicesJson.features.length; i++) {
        if (nodeProperties.Id == myServicesJson.features[i].properties.Id) {
            serviceProperties = myServicesJson.features[i].properties;
        }
    }
    console.log("Service properties: ", serviceProperties);

}

function displayServiceBarGraphs() {
    // Display number of Primary Secondary and Tertiary Services bar graph on UI
    var queryInfoDiv = document.getElementById("query-info");
    var serviceBarGraphHTML = "<div class=\"bar-graph\" id=\"primary-services\" style=\"width: " + serviceProperties.Primary_NumberServices * 20 + "px;\"><span class=\"service-type\">Primary</span><span class=\"service-number\">" + serviceProperties.Primary_NumberServices + "</span></div>" + "<div class=\"bar-graph\" id=\"secondary-services\" style=\"width: " + serviceProperties.Secondary_NumberServices * 20 + "px;\"><span class=\"service-type\">Secondary</span><span class=\"service-number\">" + serviceProperties.Secondary_NumberServices + "</span></div>" + "<div class=\"bar-graph\" id=\"tertiary-services\" style=\"width: " + serviceProperties.Tertiary_NumberServices * 20 + "px;\"><span class=\"service-type\">Tertiary</span><span class=\"service-number\">" + serviceProperties.Tertiary_NumberServices + "</span></div>";
    queryInfoDiv.innerHTML = serviceBarGraphHTML + "<div>Types of Services</div>";

}

var nodeNumberServices = 0;

function calDiversityServices() {

    document.getElementById("transit-option-menu").innerHTML = "";

    console.log("Diversity of Primary, Secondary and Tertiary Services");

    fetchServiceProps();
    displayServiceBarGraphs();

    // Calculate total number of Services
    nodeNumberServices = serviceProperties.Primary_NumberServices + serviceProperties.Secondary_NumberServices + serviceProperties.Tertiary_NumberServices;
    console.log("Service Number: ", nodeNumberServices);

    var serviceRatingVal = 0;

    // Assign query rating value based on number of services ad amenities

    if (serviceProperties.Primary_NumberServices > 0) {
        serviceRatingVal += 5;
    }
    if (serviceProperties.Secondary_NumberServices > 0) {
        serviceRatingVal += 3;
    }
    if (serviceProperties.Tertiary_NumberServices > 0) {
        serviceRatingVal += 2;
    }

    console.log("Service Rating: ", serviceRatingVal);

    var DiversityServicesRating = serviceRatingVal;
    displayQueryRating(DiversityServicesRating);
}

function calClosenessServices() {
    console.log("Calculating Closeness of Services and Amenities");
}

function displayQueryRating(ratingValue) {

    var ratingWord = "";
    if ((ratingValue >= 2) && (ratingValue < 5)) {
        ratingWord = "Needs to Improve";
    } else if ((ratingValue >= 5) && (ratingValue < 7)) {
        ratingWord = "Good";
    } else if ((ratingValue >= 7) && (ratingValue < 9)) {
        ratingWord = "Very Good";
    } else if ((ratingValue > 9)) {
        ratingWord = "Excellent";
    }

    var queryRatingDiv = document.getElementById("query-rating");
    var ratingHTML = "<span class=\"rating-value\">" + ratingValue + "</span><span style=\"color: #d81b60;\">/10\n</span><span class=\"rating-words\">" + ratingWord + "</span><div><progress id=\"rating-bar\" value=\"" + ratingValue * 10 + "\" max=\"100\"> 32% </progress></div>";
    queryRatingDiv.innerHTML = ratingHTML;
}



