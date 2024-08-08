function boroughQueryDropDownEN() {

    var queryList = ["Multimodality", "Diversity of Services and Amenities", "Closeness of Services and Amenities", "Universal Design & Accessibility", "Transit Connectivity", "Greenery"
        // , "Walkability"
    ];
    var dropDownDiv = document.getElementById("borough-dropdown-content");
    var dropDownHTML = "";

    for (i = 0; i < queryList.length; i++) {
        dropDownHTML += "<a href=\"#\" onclick=\"getSelectedBoroughQuery(\'" + queryList[i] + "\');\">" + queryList[i] + "</a>";
    }

    dropDownDiv.innerHTML = dropDownHTML;
}

function boroughQueryDropDownFR() {

    var queryList = ["Multimodalité", "Diversité des services et commodités", "Proximité des services et commodités", "Conception universelle et accessibilité", "Connectivité des transports en commun", "Verdure"
        // , "Walkability"
    ];
    var dropDownDiv = document.getElementById("borough-dropdown-content");
    var dropDownHTML = "";

    for (i = 0; i < queryList.length; i++) {
        dropDownHTML += "<a href=\"#\" onclick=\"getSelectedBoroughQuery(\'" + queryList[i] + "\');\">" + queryList[i] + "</a>";
    }

    dropDownDiv.innerHTML = dropDownHTML;
}

var selectedQuery = "Select Query";

function getSelectedBoroughQuery(queryName) {
    selectedQuery = queryName;
    document.getElementById("borough-dropbtn-query").innerHTML = selectedQuery;
    callBoroughQueryCalFunc();

}

function callBoroughQueryCalFunc() {

    console.log("Running Query Function Calls with Switch Case");

    switch (selectedQuery) {
        case "Select Query": console.log("Please select the query");
            break;
        // case "Demographics": displayPopData();
        //     break;
        case "Multimodality":
            displayBoroughMultimodality();
            break;
        case "Multimodalité":
            displayBoroughMultimodality();
            FRQueryInfo();
            break;
        case "Universal Design & Accessibility":
            displayBoroughAccessibility();
            break;
        case "Conception universelle et accessibilité":
            displayBoroughAccessibility();
            FRQueryInfo();
            break;
        case "Diversity of Services and Amenities":
            displayBoroughDiversity();
            break;
        case "Diversité des services et commodités":
            displayBoroughDiversity();
            FRQueryInfo();
            break;
        case "Closeness of Services and Amenities":
            displayBoroughCloseness();
            break;
        case "Proximité des services et commodités":
            displayBoroughCloseness();
            FRQueryInfo();
            break;
        case "Greenery":
            displayBoroughGreenery();
            break;
        case "Verdure":
            displayBoroughGreenery();
            FRQueryInfo();
            break;
        case "Walkability":
            displayBoroughWalkability();
            break;
        case "Marchabilité":
            displayBoroughWalkability();
            FRQueryInfo();
            break;
        case "Transit Connectivity":
            displayBoroughConnectivity();
            break;
        case "Connectivité des transports en commun":
            displayBoroughConnectivity();
            FRQueryInfo();
            break;
        default: console.log("missing query");
    }

}

function displayBoroughQueryRating(ratingValue) {

    var ratingWord = "";
    if ((ratingValue >= 2) && (ratingValue < 5)) {
        ratingWord = "Needs to Improve";
    } else if ((ratingValue >= 5) && (ratingValue < 7)) {
        ratingWord = "Good";
        // ratingWord = "Good";
    } else if ((ratingValue >= 7) && (ratingValue < 9)) {
        ratingWord = "Very Good";
        // ratingWord = "Very Good";
    } else if ((ratingValue > 9)) {
        ratingWord = "Excellent";
        // ratingWord = "Excellent";
    }

    var queryRatingDiv = document.getElementById("borough-query-rating");
    var ratingHTML = "<span class=\"rating-value\">" + ratingValue + "</span><span style=\"color: #d81b60;\">/10\n</span><span class=\"rating-words\" id=\"rating-words\">" + ratingWord + "</span><div><progress id=\"rating-bar\" value=\"" + ratingValue * 10 + "\" max=\"100\"> 32% </progress></div>";
    queryRatingDiv.innerHTML = ratingHTML;
}

function displayBoroughMultimodality() {
    // Display multimodality query info for selected borough

    // if (myCityJson.Name_en == "Montreal") {
    var totalTransit = 0;
    for (key in myCityJson["TransitTypesStops"]) {
        var value = myCityJson["TransitTypesStops"][key];
        if (value != 0) {
            totalTransit += 1;
        }
    }
    // Adjusting for missing transit data for Montreal
    totalTransit += 1;

    console.log("Total transit");
    console.log(totalTransit);

    // Multimodality Rating Formula
    var boroughMultimodality = JSON.parse(boroughQueryProps.Multimodality);

    console.log("Borough Multimodality: ", boroughMultimodality.AvailableModes);

    var MultimodalityRating = (boroughMultimodality.AvailableModes.length / totalTransit) * 10;


    displayBoroughQueryRating(MultimodalityRating.toFixed(0));

    var transitIcons = ["fas fa-bus fa-2x", "fas fa-subway fa-2x", "fas fa-train fa-2x", "fas fa-train-tram fa-2x", "fas fa-car fa-2x", "fas fa-bicycle fa-2x"];
    var transitList = ["Bus", "Metro", "Rail", "Tramway", "Car-sharing", "Bike-sharing"];

    // Looping and inserting available transit modes

    var transitModeHTML = "<div id=\"transit-mode-section\">";

    for (mode in boroughMultimodality.AvailableModes) {
        for (transit in transitList) {
            if (transitList[transit] == boroughMultimodality.AvailableModes[mode]) {
                console.log("AVAILABLE MODE ", mode, " IS: ", transitList[transit]);
                transitModeHTML += "<div id=\"transit-mode\">" +
                    "<i class=\"" + transitIcons[transit] + "\"></i>" +
                    "<div id=\"transit-mode-name\">" +
                    "<p>" + boroughMultimodality.AvailableModes[mode] + "</p>" + "</div>" + "</div>";
            }
        }
    }
    // for (i = 0; i < transitIcons.length; i++) {

    //     // Displaying available transit modes for now
    //     if (transitList[i] == boroughMultimodality.AvailableModes[i]) {
    //         console.log("AVAILABLE MODE ", i + 1, " IS: ", transitList[i]);
    //         transitModeHTML += "<div id=\"transit-mode\">" +
    //             "<i class=\"" + transitIcons[i] + "\"></i>" +
    //             "<div id=\"transit-mode-name\">" +
    //             "<p>" + boroughMultimodality.AvailableModes[i] + "</p>" + "</div>" + "</div>";
    //     }
    // }
    // // }


    for (i = 0; i < transitIcons.length; i++) {

        if (transitList[i] != boroughMultimodality.AvailableModes[i])
            transitModeHTML += "<div id=\"transit-mode\">" +
                "<i class=\"" + transitIcons[i] + "\" style=\"color:#d3d3d3;\"></i>" +
                "<div id=\"transit-mode-name\">" +
                "<p>" + transitList[i] + "</p>" + "</div>" + "</div>";

    }

    console.log("TRANSIT MODES HTML: ", transitModeHTML);

    document.getElementById("borough-query-info").innerHTML = transitModeHTML + "</div><p id=\"mode-carousel-title\">Available Transit Modes</p>";
}

function displayDiversityGraphs(boroughDiversityServices) {

    var totalServices = boroughDiversityServices.NumOfPrimary + boroughDiversityServices.NumOfSecondary + boroughDiversityServices.NumOfTertiary;

    // Display the bar graph with numbers of services
    var primaryBarWidth = (boroughDiversityServices.NumOfPrimary / totalServices) * 500;
    var secondaryBarWidth = (boroughDiversityServices.NumOfSecondary / totalServices) * 500;
    var tertiaryBarWidth = (boroughDiversityServices.NumOfTertiary / totalServices) * 500;

    // Diversity Bar Graph HTML
    var diversityBarGraphHTML = "<div class=\"bar-graph\" id=\"primary-services\" style=\"width: " + primaryBarWidth + "px;\"><span class=\"service-type\">Primary</span><span class=\"service-number\">" + boroughDiversityServices.NumOfPrimary + "</span></div>" + "<div class=\"bar-graph\" id=\"secondary-services\" style=\"width: " + secondaryBarWidth + "px;\"><span class=\"service-type\">Secondary</span><span class=\"service-number\">" + boroughDiversityServices.NumOfSecondary + "</span></div>" + "<div class=\"bar-graph\" id=\"tertiary-services\" style=\"width: " + tertiaryBarWidth + "px;\"><span class=\"service-type\">Tertiary</span><span class=\"service-number\">" + boroughDiversityServices.NumOfTertiary + "</span></div>";

    document.getElementById("borough-query-info").innerHTML = diversityBarGraphHTML + "</div><p id=\"services-bargraph-title\">Types of Services</p>";
}

function displayAvailableServices() {

    var availableServices = JSON.parse(boroughQueryProps.AvailableServices);

    console.log("Available Services: ", availableServices);

    var availServiceMenuHTML = "<div class=\"service-option-menu\">";

    var serviceUnit;
    for (serviceType in availableServices) {
        {
            // loop through all categories and append into HTML string
            // console.log("Service Type: ", serviceType);
            // check if the service is primary/secondary/tertiary and assign color
            // check the category of the service and assign icon
            for (category in availableServices[serviceType]) {

                // check if the current query is diversity/closeness and display count or avg dist accordingly
                if (selectedQuery == "Diversity of Services and Amenities") {
                    serviceUnit = availableServices[serviceType][category][0];
                } else if (selectedQuery == "Closeness of Services and Amenities") {
                    serviceUnit = availableServices[serviceType][category][1];
                }

                var catName;
                if (category == "BeautyNFashion") {
                    catName = "BeautyNFashion";
                } else {
                    catName = category;
                }
                // console.log("Category: ", catName);

                availServiceMenuHTML += "<div class=\"service-option\" id=\"" + serviceType.toLowerCase() + "\">" + "<div class=\"borough-service-category-name\">" +
                    "<p>" + catName.toLowerCase() + "</p>" + "</div>" +
                    "<i class=\"" + serviceCategoryIcons[category] + "\"></i>" + "<div class=\"service-units\">" +
                    "<p>" + serviceUnit + "</p>" + "</div>" + "</div>";
            }

        }
    }

    // insert HTML into sidebar
    document.getElementById("borough-query-info").innerHTML += availServiceMenuHTML + "<p id=\"avail-services-text\">Available Services and Amenities</p>";
}

function displayBoroughDiversity() {
    // Display diversity of services query info for selected borough

    document.getElementById("borough-query-info").innerHTML = "";
    console.log("Borough-level Diversity of Services and Amenities!!");

    var boroughDiversityServices = JSON.parse(boroughQueryProps.DiversityOfServices);
    console.log("Borough Diversity of Services: ", boroughDiversityServices);

    // Calculate and display diversity rating
    var diversityRating = 0;

    if (boroughDiversityServices.NumOfPrimary > 0) {
        diversityRating += 5;
    }
    if (boroughDiversityServices.NumOfSecondary > 0) {
        diversityRating += 3;
    }
    if (boroughDiversityServices.NumOfTertiary > 0) {
        diversityRating += 2;
    }

    displayBoroughQueryRating(diversityRating);
    displayDiversityGraphs(boroughDiversityServices);
    displayAvailableServices();

}

function displayClosenessGraphs(boroughClosenessServices) {
    // Display avg distances in m to borough services and amenities

    var primaryBarWidth = boroughClosenessServices.AvgDistPrimary * 0.4;
    var secondaryBarWidth = boroughClosenessServices.AvgDistSecondary * 0.4;
    var tertiaryBarWidth = boroughClosenessServices.AvgDistTertiary * 0.4;

    // Service Bar Graph HTML
    var closenessBarGraphHTML = "<div class=\"bar-graph\" id=\"primary-services\" style=\"width: " + primaryBarWidth + "px;\"><span class=\"service-type\">Primary</span><span class=\"service-number\">" + boroughClosenessServices.AvgDistPrimary.toFixed(0) + "</span></div>" + "<div class=\"bar-graph\" id=\"secondary-services\" style=\"width: " + secondaryBarWidth + "px;\"><span class=\"service-type\">Secondary</span><span class=\"service-number\">" + boroughClosenessServices.AvgDistSecondary.toFixed(0) + "</span></div>" + "<div class=\"bar-graph\" id=\"tertiary-services\" style=\"width: " + tertiaryBarWidth + "px;\"><span class=\"service-type\">Tertiary</span><span class=\"service-number\">" + boroughClosenessServices.AvgDistTertiary.toFixed(0) + "</span></div>";

    // Inserting bar graphs into query info HTML
    document.getElementById("borough-query-info").innerHTML = closenessBarGraphHTML + "<div id=\"services-bargraph-title\">Distances to Services in m</div>";
}

function displayBoroughCloseness() {
    // Display closeness of services query info for selected borough
    document.getElementById("borough-query-info").innerHTML = "";
    console.log("Borough-level Closeness of Services and Amenities!!");

    var boroughClosenessServices = JSON.parse(boroughQueryProps.ClosenessOfServices);
    console.log(boroughClosenessServices);

    // Calculate and display closeness rating
    var closenessRating = 0;
    // var bufferLimit = 0;
    // if (boroughQueryProps.Type == "Hub") {
    //     bufferLimit = 800;
    // } else if (boroughQueryProps.Type == "Cluster") {
    //     bufferLimit = 400;
    // }

    if (boroughClosenessServices.AvgDistPrimary > 0) {
        closenessRating += 5;
    }
    if (boroughClosenessServices.AvgDistSecondary > 0) {
        closenessRating += 3;
    }
    if (boroughClosenessServices.AvgDistTertiary > 0) {
        closenessRating += 2;
    }

    displayBoroughQueryRating(closenessRating);
    displayClosenessGraphs(boroughClosenessServices);
    displayAvailableServices();
}

var totalAccessibility = 0;
var totalStops = 0;

function displayBoroughAccessGraphs(boroughAccessibility) {
    var accessibilityHTML = "";

    for (transitType in boroughAccessibility) {
        var transitAccessibility = boroughAccessibility[transitType];
        console.log(transitType, " Total Transit: ", transitAccessibility.Total);

        var accessibleBarWidth = 0;

        if (transitAccessibility.Total > 0) {

            accessibleBarWidth += (transitAccessibility.Accessible * 240) / transitAccessibility.Total;

            console.log("Accessible Bar Width: ", accessibleBarWidth);

            accessibilityHTML += "<i class=\"" + transitIcon(transitType) + "\"></i><div class=\"bar-graph\" id=\"accessible-bar-graph\"><div class=\"bar-graph\" id=\"" + transitType.toLowerCase() + "\" style=\"width: " + accessibleBarWidth + "px;\"><span class=\"accessible-number\">" + transitAccessibility.Accessible + "</span></div><span class=\"accessible-number\">" + transitAccessibility.Total + "</span></div>";
        }

        totalAccessibility += transitAccessibility.Accessible;
        totalStops += transitAccessibility.Total;
    }

    console.log("Accessibility HTML", accessibilityHTML);
    document.getElementById("borough-query-info").innerHTML = accessibilityHTML + "</div><p id=\"accessibility-graph-title\">Wheelchair Accessibility</p>";
}
function displayBoroughAccessibility() {
    // Display universal accessibility query info for selected borough
    document.getElementById("borough-query-info").innerHTML = "";


    var boroughAccessibility = JSON.parse(boroughQueryProps.UniversalAccessibility);

    console.log("Borough-level Universal Design & Accessibility!!");
    console.log(boroughAccessibility);

    displayBoroughAccessGraphs(boroughAccessibility);

    var accessibilityRating = 0;
    accessibilityRating = (totalAccessibility / totalStops) * 10;

    displayBoroughQueryRating(accessibilityRating.toFixed(0));
}

function displayBoroughConnectivityGraphs(boroughConnectvity) {
    var queryInfoDiv = document.getElementById("borough-query-info");

    var connectivityHTML = "<p id=\"connectivity-graph-title\">Network Analysis Metrics</p><div id=\"connectivity-graphs\">";

    var centralityWidth = boroughConnectvity.Centrality * 50 + 20;
    var closenessWidth = boroughConnectvity.Closeness * 50;
    var betweennessWidth = boroughConnectvity.Betweenness * 50 + 80;

    connectivityHTML += "<div class=\"bar-graph\" id=\"centrality\" style=\"width: " + centralityWidth + "px;\"><span class=\"metrics-type\">Centrality</span><span class=\"metrics-number\">" + boroughConnectvity.Centrality + "</span></div><p class=\"metrics-definition\">The higher the value, the better the connection to the rest of the transit network.</p>" + "<div class=\"bar-graph\" id=\"closeness\" style=\"width: " + closenessWidth + "px;\"><span class=\"metrics-type\">Closeness</span><span class=\"metrics-number\">" + boroughConnectvity.Closeness + "</span></div><p class=\"metrics-definition\">The higher the value, the more likely this node will be used in a trip.</p>" + "<div class=\"bar-graph\" id=\"betweenness\" style=\"width: " + betweennessWidth + "px;\"><span class=\"metrics-type\">Betweenness</span><span class=\"metrics-number\">" + boroughConnectvity.Betweenness + "</span></div><p class=\"metrics-definition\">The higher the value, the larger the number of connections to this node.</p>";

    queryInfoDiv.innerHTML = connectivityHTML + "</div>";
    console.log("Connectivity HTML: ", queryInfoDiv);
}

function displayBoroughConnectivity() {
    // Display connectivity query info for selected borough

    var boroughConnectvity = JSON.parse(boroughQueryProps.TransitConnectivity);

    console.log("Borough-level Connectivity!!");
    console.log(boroughConnectvity);

    displayBoroughConnectivityGraphs(boroughConnectvity);

    // Connectivity Rating
    var connectivityRating = 0;
    connectivityRating = (boroughConnectvity.Centrality + boroughConnectvity.Closeness + boroughConnectvity.Betweenness) / 3;

    displayBoroughQueryRating(connectivityRating.toFixed(0));
}
function displayBoroughGreenery() {
    // Display greenery query info for selected borough
    console.log("Borough-level Greenery");
    fetchGeoJson("greenery.geojson");
    loadGreeneryData();
}
// function displayBoroughWalkability() {
//     // Display walkability query info for selected borough
//     console.log("Borough-level Walkability");
//     // console.log(borboroughQueryProps.UniversalAccessibility);
// }


