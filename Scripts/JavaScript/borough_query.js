function boroughQueryDropDown() {

    var queryList = ["Multimodality", "Diversity of Services and Amenities", "Closeness of Services and Amenities", "Universal Design & Accessibility", "Transit Connectivity"
        // , "Greenery", "Walkability"
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
    document.getElementById("borough-dropbtn").innerHTML = selectedQuery + "<i class=\"fas fa-chevron-down\"></i>";
    callBoroughQueryCalFunc();

}

function callBoroughQueryCalFunc() {

    console.log("Running Query Function Calls with Switch Case");

    switch (selectedQuery) {
        case "Select Query": console.log("Please select the query");
            break;
        case "Multimodality":
            fetchGeoJson("city.geojson");
            // fetchGeoJson("Lines.geojson");
            setTimeout(displayBoroughMultimodality, 300);
            break;
        case "Universal Design & Accessibility":
            displayBoroughAccessibility();
            break;
        case "Diversity of Services and Amenities":
            displayBoroughDiversity();
            break;
        case "Closeness of Services and Amenities":
            displayBoroughCloseness();
            break;
        case "Greenery":
            displayBoroughGreenery();
            break;
        case "Walkability":
            displayBoroughWalkability();
            break;
        case "Transit Connectivity":
            displayBoroughConnectivity();
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
    } else if ((ratingValue >= 7) && (ratingValue < 9)) {
        ratingWord = "Very Good";
    } else if ((ratingValue > 9)) {
        ratingWord = "Excellent";
    }

    var queryRatingDiv = document.getElementById("borough-query-rating");
    var ratingHTML = "<span class=\"rating-value\">" + ratingValue + "</span><span style=\"color: #d81b60;\">/10\n</span><span class=\"rating-words\">" + ratingWord + "</span><div><progress id=\"rating-bar\" value=\"" + ratingValue * 10 + "\" max=\"100\"> 32% </progress></div>";
    queryRatingDiv.innerHTML = ratingHTML;
}

function displayBoroughMultimodality() {
    // Display multimodality query info for selected borough
    var myCityJson = readGeoJsonObj("city.geojson");

    if (myCityJson.City.Name_en == "Montreal") {
        var totalTransit = 0;
        for (key in myCityJson["City"]["TransitTypesStops"]) {
            var value = myCityJson["City"]["TransitTypesStops"][key];
            if (value != 0) {
                totalTransit += 1;
            }
        }
        // Adjusting for missing transit data for Montreal
        totalTransit += 4;

        console.log("Total transit");
        console.log(totalTransit);

        // Multimodality Rating Formula
        var MultimodalityRating = (boroughQueryProps.Multimodality.AvailableModes.length / totalTransit) * 10;

        displayBoroughQueryRating(MultimodalityRating);

        var transitIcons = ["fas fa-bus fa-2x", "fas fa-subway fa-2x", "fas fa-train fa-2x", "fas fa-train-tram fa-2x", "fas fa-car fa-2x", "fas fa-bicycle fa-2x"];

        // Looping and inserting available transit modes

        var transitModeHTML = "<div id=\"transit-mode-section\">";
        for (i = 0; i < transitIcons.length; i++) {

            // TODO: Displaying all transit modes for now
            transitModeHTML += "<div id=\"transit-mode\">" +
                "<i class=\"" + transitIcons[i] + "\"></i>" +
                "<div id=\"transit-mode-name\">" +
                "<p>" + boroughQueryProps.Multimodality.AvailableModes[i] + "</p>" + "</div>" + "</div>";

        }

        document.getElementById("borough-query-info").innerHTML = transitModeHTML + "</div>Available Transit Modes";

    }

}

function displayDiversityGraphs(boroughDiversityServices) {
    var totalServices = boroughDiversityServices.NumOfPrimary + boroughDiversityServices.NumOfSecondary + boroughDiversityServices.NumOfTertiary;

    // Display the bar graph with numbers of services
    var primaryBarWidth = (boroughDiversityServices.NumOfPrimary / totalServices) * 500;
    var secondaryBarWidth = (boroughDiversityServices.NumOfSecondary / totalServices) * 500;
    var tertiaryBarWidth = (boroughDiversityServices.NumOfTertiary / totalServices) * 500;

    // Diversity Bar Graph HTML
    var diversityBarGraphHTML = "<div class=\"bar-graph\" id=\"primary-services\" style=\"width: " + primaryBarWidth + "px;\"><span class=\"service-type\">Primary</span><span class=\"service-number\">" + boroughDiversityServices.NumOfPrimary + "</span></div>" + "<div class=\"bar-graph\" id=\"secondary-services\" style=\"width: " + secondaryBarWidth + "px;\"><span class=\"service-type\">Secondary</span><span class=\"service-number\">" + boroughDiversityServices.NumOfSecondary + "</span></div>" + "<div class=\"bar-graph\" id=\"tertiary-services\" style=\"width: " + tertiaryBarWidth + "px;\"><span class=\"service-type\">Tertiary</span><span class=\"service-number\">" + boroughDiversityServices.NumOfTertiary + "</span></div>";

    document.getElementById("borough-query-info").innerHTML = diversityBarGraphHTML + "</div>Types of Services";
}

function displayAvailableServices() {

    var availableServices = boroughQueryProps.AvailableServices;

    console.log("Available Services: ", availableServices);

    var availServiceMenuHTML = "<div class=\"service-option-menu\">";

    var serviceUnit;
    for (serviceType in availableServices) {
        {
            // loop through all categories and append into HTML string
            console.log("Service Type: ", serviceType);
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
                    catName = "Beauty & Fashion";
                } else {
                    catName = category;
                }
                console.log("Category: ", catName);

                availServiceMenuHTML += "<div class=\"service-option\" id=\"" + serviceType.toLowerCase() + "\">" + "<div class=\"borough-service-category-name\">" +
                    "<p>" + catName.toLowerCase() + "</p>" + "</div>" +
                    "<i class=\"" + serviceCategoryIcons[category] + "\"></i>" + "<div class=\"service-units\">" +
                    "<p>" + serviceUnit + "</p>" + "</div>" + "</div>";
            }

        }
    }

    // insert HTML into sidebar
    document.getElementById("borough-query-info").innerHTML += availServiceMenuHTML + "<p>Available Services and Amenities</p>";
}

function displayBoroughDiversity() {
    // Display diversity of services query info for selected borough

    document.getElementById("borough-query-info").innerHTML = "";
    console.log("Borough-level Diversity of Services and Amenities!!");

    var boroughDiversityServices = boroughQueryProps.DiversityOfServices;
    console.log(boroughDiversityServices);

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
    document.getElementById("borough-query-info").innerHTML = closenessBarGraphHTML + "<div>Distances to Services in m</div>";
}

function displayBoroughCloseness() {
    // Display closeness of services query info for selected borough
    document.getElementById("borough-query-info").innerHTML = "";
    console.log("Borough-level Closeness of Services and Amenities!!");

    var boroughClosenessServices = boroughQueryProps.ClosenessOfServices;
    console.log(boroughClosenessServices);

    // TODO: Calculate and display closeness rating
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

function displayBoroughAccessGraphs(boroughAccessibility, totalAccessibility, totalStops) {

    for (transitType in boroughAccessibility) {
        var transitAccessibility = boroughAccessibility[transitType];

        var accessibleBarWidth = 0;
        accessibleBarWidth += (transitAccessibility.Accessible * 280) / transitAccessibility.Total;

        var accessibilityHTML = "";

        if (transitAccessibility.Total > 0) {
            accessibilityHTML += "<i class=\"" + transitIcon(transitType) + "\"></i><div class=\"bar-graph\" id=\"accessible-bar-graph\"><div class=\"bar-graph\" id=\"" + transitType.toLowerCase() + "\" style=\"width: " + accessibleBarWidth + "px;\"><span class=\"accessible-number\">" + transitAccessibility.Accessible + "</span></div><span class=\"accessible-number\">" + transitAccessibility.Total + "</span></div>";
        }
        totalAccessibility += transitAccessibility.Accessible;
        totalStops += transitAccessibility.Total;
    }


    document.getElementById("borough-query-info").innerHTML = accessibilityHTML + "</div>Wheelchair Accessibility";
}
function displayBoroughAccessibility() {
    // TODO: Display universal accessibility query info for selected borough
    document.getElementById("borough-query-info").innerHTML = "";
    console.log("Borough-level Universal Design & Accessibility!!");
    console.log(boroughQueryProps.UniversalAccessibility);

    var boroughAccessibility = boroughQueryProps.UniversalAccessibility;

    var totalAccessibility = 0;
    var totalStops = 0;

    displayBoroughAccessGraphs(boroughAccessibility, totalAccessibility, totalStops);

    var accessibilityRating = 0;
    accessibilityRating = (totalAccessibility / totalStops) * 10;

    displayBoroughQueryRating(accessibilityRating);
}

function displayBoroughConnectivity() {
    // TODO: Display connectivity query info for selected borough
    console.log("Borough-level Connectivity!!");
    console.log(boroughQueryProps.TransitConnectivity);
}
// function displayBoroughGreenery() {
//     // Display greenery query info for selected borough
//     console.log("Borough-level Greenery");
//     // console.log(borboroughQueryProps.UniversalAccessibility);
// }
// function displayBoroughWalkability() {
//     // Display walkability query info for selected borough
//     console.log("Borough-level Walkability");
//     // console.log(borboroughQueryProps.UniversalAccessibility);
// }
