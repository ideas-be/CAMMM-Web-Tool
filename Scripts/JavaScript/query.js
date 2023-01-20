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
        case "Serviceability":
            fetchGeoJson("services.geojson");
            setTimeout(calDiversityServices, 200);
            break;
        case "Reliability": console.log("Reliability");
            break;
        default: console.log("missing query");
    }

}

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

        var MultimodalityRating = 8;
        displayQueryRating(MultimodalityRating);
    }
}

var nodeNumberServices = 0;

function calDiversityServices() {
    var myServicesJson = readGeoJsonObj("services.geojson");
    console.log("Diversity of Primary, Secondary and Tertiary Services");
    var serviceProperties;

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
    nodeNumberServices = serviceProperties.Primary_NumberServices + serviceProperties.Secondary_NumberServices + serviceProperties.Tertiary_NumberServices;
    console.log(nodeNumberServices);

    // TODO: Need to continue calculation here

    var ServiceabilityRating = 6;
    displayQueryRating(ServiceabilityRating);
}

function displayQueryRating(ratingValue) {
    var queryRatingDiv = document.getElementById("query-rating");
    var ratingHTML = "<span class=\"rating-value\">" + ratingValue + "</span><span>/10\n</span><span class=\"rating-words\">Very Good</span><div><progress id=\"rating-bar\" value=\"" + ratingValue * 10 + "\" max=\"100\"> 32% </progress></div>";
    queryRatingDiv.innerHTML = ratingHTML;
}