var serviceProperties;

var nodeNumberServices = 0;


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

    // Calculate total number of Services
    nodeNumberServices = serviceProperties.Primary_NumberServices + serviceProperties.Secondary_NumberServices + serviceProperties.Tertiary_NumberServices;
    console.log("Service Number: ", nodeNumberServices);

}

function displayServiceBarGraphs() {
    // Display number of Primary Secondary and Tertiary Services bar graph on UI

    var queryInfoDiv = document.getElementById("query-info");

    var primaryBarWidth = (serviceProperties.Primary_NumberServices / nodeNumberServices) * 500;
    var secondaryBarWidth = (serviceProperties.Secondary_NumberServices / nodeNumberServices) * 500;
    var tertiaryBarWidth = (serviceProperties.Tertiary_NumberServices / nodeNumberServices) * 500;

    // Service Bar Graph HTML
    var serviceBarGraphHTML = "<div class=\"bar-graph\" id=\"primary-services\" style=\"width: " + primaryBarWidth + "px;\"><span class=\"service-type\">Primary</span><span class=\"service-number\">" + serviceProperties.Primary_NumberServices + "</span></div>" + "<div class=\"bar-graph\" id=\"secondary-services\" style=\"width: " + secondaryBarWidth + "px;\"><span class=\"service-type\">Secondary</span><span class=\"service-number\">" + serviceProperties.Secondary_NumberServices + "</span></div>" + "<div class=\"bar-graph\" id=\"tertiary-services\" style=\"width: " + tertiaryBarWidth + "px;\"><span class=\"service-type\">Tertiary</span><span class=\"service-number\">" + serviceProperties.Tertiary_NumberServices + "</span></div>";

    // Inserting bar graphs into query info HTML
    queryInfoDiv.innerHTML = serviceBarGraphHTML + "<div>Types of Services</div>";

}

function displaySurroundingServices() {

    var queryInfoDiv = document.getElementById("query-info");

    // Surrounding Services Menu HTML
    var surrServiceMenuHTML = "<div id=\"service-option-menu\">" +
        "<div class=\"service-option\" id=\"primary\">" +
        "<i class=\"fas fa-utensils fa-2x\"></i>" +
        "<div id=\"service-units\">" +
        "<p>10</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"service-option\" id=\"primary\">" +
        "<i class=\"fas fa-hospital fa-2x\"></i>" +
        "<div id=\"service-units\">" +
        "<p>2</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"service-option\" id=\"secondary\">" +
        "<i class=\"fas fa-shirt fa-2x\"></i>" +
        "<div id=\"service-units\">" +
        "<p>4</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"service-option\" id=\"tertiary\">" +
        "<i class=\"fas fa-glasses fa-2x\"></i>" +
        "<div id=\"service-units\">" +
        "<p>1</p>" +
        "</div>" +
        "</div>" +
        "<div class=\"service-option\" id=\"tertiary\">" +
        "<i class=\"fas fa-person-swimming fa-2x\"></i>" +
        "<div id=\"service-units\">" +
        "<p>2</p>" +
        "</div>" +
        "</div>" +
        "</div>";

    queryInfoDiv.innerHTML += surrServiceMenuHTML + "<p>Surrounding Services and Amenities</p>";
}

function calDiversityServices() {

    document.getElementById("transit-option-menu").innerHTML = "";

    console.log("Diversity of Primary, Secondary and Tertiary Services");

    fetchServiceProps();
    displayServiceBarGraphs();
    displaySurroundingServices();

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
