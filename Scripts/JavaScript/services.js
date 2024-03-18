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

function displayServiceNumberBarGraphs() {
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

function displayServiceDistanceBarGraphs() {
    // Display avg distances in m to services and amenities

    var queryInfoDiv = document.getElementById("query-info");

    var primaryBarWidth = serviceProperties.Primary_AvDist * 0.4;
    var secondaryBarWidth = serviceProperties.Secondary_AvDist * 0.4;
    var tertiaryBarWidth = serviceProperties.Tertiary_AvDist * 0.4;

    // Service Bar Graph HTML
    var serviceBarGraphHTML = "<div class=\"bar-graph\" id=\"primary-services\" style=\"width: " + primaryBarWidth + "px;\"><span class=\"service-type\">Primary</span><span class=\"service-number\">" + serviceProperties.Primary_AvDist.toFixed(0) + "</span></div>" + "<div class=\"bar-graph\" id=\"secondary-services\" style=\"width: " + secondaryBarWidth + "px;\"><span class=\"service-type\">Secondary</span><span class=\"service-number\">" + serviceProperties.Secondary_AvDist.toFixed(0) + "</span></div>" + "<div class=\"bar-graph\" id=\"tertiary-services\" style=\"width: " + tertiaryBarWidth + "px;\"><span class=\"service-type\">Tertiary</span><span class=\"service-number\">" + serviceProperties.Tertiary_AvDist.toFixed(0) + "</span></div>";

    // Inserting bar graphs into query info HTML
    queryInfoDiv.innerHTML = serviceBarGraphHTML + "<div>Distances to Services in m</div>";


}

// Surrounding Services Menu HTML
// list of icons
var serviceCategoryIcons = { "Food": "fas fa-utensils fa-2x", "Health": "fas fa-house-medical fa-2x", "Sanitation": "fas fa-restroom fa-2x", "Recreation": "fas fa-champagne-glasses fa-2x", "Education": "fas fa-book fa-2x", "Government": "fas fa-landmark-flag fa-2x", "Laundry": "fas fa-jug-detergent fa-2x", "Culture": "fas fa-masks-theater fa-2x", "Shelter": "fas fa-person-shelter fa-2x", "Finance": "fas fa-coins fa-2x", "Electronics": "fas fa-mobile-retro fa-2x", "Store": "fas fa-store fa-2x", "BeautyNFashion": "fas fa-shirt fa-2x" };

function displaySurroundingServices() {
    // TODO: Add units in m or specify number of services to clarify the values for each service in the carousel
    var queryInfoDiv = document.getElementById("query-info");

    // fetch and read category services JSON

    var serviceCategoryJSON = readGeoJsonObj("category_services.geojson");
    fetch
    console.log("Category of Services JSON: ", serviceCategoryJSON);

    // loop through JSON and match node ID

    var nodeServiceData;
    for (i = 0; i < serviceCategoryJSON.features.length; i++) {
        // console.log("Node Properties ID: ", nodeProperties.Id);
        // console.log("Service Category Data: ", serviceCategoryJSON.features[0]);
        if (nodeProperties.Id == serviceCategoryJSON.features[i].Id) {

            // console.log("Service Category Data: ", serviceCategoryJSON.features[i].CategoryData);
            nodeServiceData = serviceCategoryJSON.features[i].CategoryData;
        }
    }

    console.log("The service category data for the current node is ", nodeServiceData);

    // loop through category data for the services at the current node
    var surrServiceMenuHTML = "<div class=\"service-option-menu\">";

    var serviceUnit;
    for (serviceType in nodeServiceData) {
        {
            // loop through all categories and append into HTML string
            console.log("Node Service Data Type", nodeServiceData[serviceType]);
            // check if the service is primary/secondary/tertiary and assign color
            // check the category of the service and assign icon
            for (category in nodeServiceData[serviceType]) {

                // check if the current query is diversity/closeness and display count or avg dist accordingly
                if (selectedQuery == "Diversity of Services and Amenities") {
                    serviceUnit = nodeServiceData[serviceType][category].Count;
                } else if (selectedQuery == "Closeness of Services and Amenities") {
                    serviceUnit = nodeServiceData[serviceType][category].avgDist;
                }
                // Replace "BeautyNFashion" with "Beauty & Fashion" for UI
                var catName;

                if (category == "BeautyNFashion") {
                    catName = "Beauty & Fashion";
                } else {
                    catName = category;
                }

                surrServiceMenuHTML += "<div class=\"service-option\" id=\"" + serviceType.toLowerCase() + "\">" + "<div class=\"service-category-name\">" +
                    "<p>" + catName.toLowerCase() + "</p>" + "</div>" +
                    "<i class=\"" + serviceCategoryIcons[category] + "\"></i>" + "<div class=\"service-units\">" +
                    "<p>" + serviceUnit.toFixed(0) + "</p>" + "</div>" + "</div>";
            }

        }
    }

    // insert HTML into sidebar
    queryInfoDiv.innerHTML += surrServiceMenuHTML + "<p>Surrounding Services and Amenities</p>";
}

function calDiversityServices() {

    hideLines();
    document.getElementById("transit-option-menu").innerHTML = "";

    console.log("Diversity of Primary, Secondary and Tertiary Services");

    fetchServiceProps();
    displayServiceNumberBarGraphs();
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

    hideLines();
    document.getElementById("transit-option-menu").innerHTML = "";
    // document.getElementById("query-info").innerHTML = "";

    console.log("Calculating Closeness of Services and Amenities");
    // Calculate closeness of services and amenities

    fetchServiceProps();
    displayServiceDistanceBarGraphs();
    displaySurroundingServices();

    var nodeProperties = fetchNodeProps();
    var bufferLimit = 0;
    if (nodeProperties.Type == "Hub") {
        bufferLimit = 800;
    } else if (nodeProperties.Type == "Cluster") {
        bufferLimit = 400;
    }

    console.log("Buffer Limit for this", nodeProperties.Type, "is: ", bufferLimit);

    var ClosenessServicesRating = 0;

    // Assign query rating value based on distance of services and amenities

    if (serviceProperties.Primary_AvDist <= bufferLimit) {
        ClosenessServicesRating += 5;
    }
    if (serviceProperties.Secondary_AvDist <= bufferLimit) {
        ClosenessServicesRating += 3;
    }
    if (serviceProperties.Tertiary_AvDist <= bufferLimit) {
        ClosenessServicesRating += 2;
    }

    console.log("Service Rating: ", ClosenessServicesRating);

    displayQueryRating(ClosenessServicesRating);

}
