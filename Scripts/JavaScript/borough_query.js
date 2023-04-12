function boroughQueryDropDown() {
    // Show borough query dropdown at inital load
    // document.getElementById("borough-query-dropdown").style.display = "block";

    var queryList = ["Multimodality", "Diversity of Services and Amenities", "Closeness of Services and Amenities", "Universal Design & Accessibility", "Transit Connectivity", "Greenery", "Walkability"];
    var dropDownDiv = document.getElementById("borough-dropdown-content");
    var dropDownHTML = "";

    for (i = 0; i < queryList.length; i++) {
        // console.log(queryList[i]);
        dropDownHTML += "<a href=\"#\" onclick=\"getSelectedBoroughQuery(\'" + queryList[i] + "\');\">" + queryList[i] + "</a>";
    }

    dropDownDiv.innerHTML = dropDownHTML;
}

var selectedQuery = "Select Query";
// displayQueryRating(8);

function getSelectedBoroughQuery(queryName) {
    selectedQuery = queryName;
    document.getElementById("borough-dropbtn").innerHTML = selectedQuery + "<i class=\"fas fa-chevron-down\"></i>";
    // if (selectedQuery == "Diversity of Services and Amenities") {
    //     document.getElementById("query-name").innerHTML = "Diversity rating:";
    // } else if (selectedQuery == "Closeness of Services and Amenities") {
    //     document.getElementById("query-name").innerHTML = "Closeness rating:";
    // } else {
    //     document.getElementById("query-name").innerHTML = selectedQuery + " rating:";
    // }
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
    // TODO: Display multimodality query info for selected borough
    console.log("Borough-level Multimodality!!");
    console.log(boroughQueryProps.Multimodality.AvailableModes);
}
function displayBoroughDiversity() {
    // TODO: Display diversity of services query info for selected borough
    console.log("Borough-level Diversity of Services and Amenities!!");
    console.log(boroughQueryProps.DiversityOfServices);
}
function displayBoroughCloseness() {
    // TODO: Display closeness of services query info for selected borough
    console.log("Borough-level Closeness of Services and Amenities!!");
    console.log(boroughQueryProps.ClosenessOfServices);
}
function displayBoroughAccessibility() {
    // TODO: Display universal accessibility query info for selected borough
    console.log("Borough-level Universal Design & Accessibility!!");
    console.log(boroughQueryProps.UniversalAccessibility);
}
function displayBoroughConnectivity() {
    // TODO: Display connectivity query info for selected borough
    console.log("Borough-level Connectivity!!");
    console.log(boroughQueryProps.TransitConnectivity);
}
function displayBoroughGreenery() {
    // TODO: Display greenery query info for selected borough
    console.log("Borough-level Greenery");
    // console.log(borboroughQueryProps.UniversalAccessibility);
}
function displayBoroughWalkability() {
    // TODO: Display walkability query info for selected borough
    console.log("Borough-level Walkability");
    // console.log(borboroughQueryProps.UniversalAccessibility);
}
