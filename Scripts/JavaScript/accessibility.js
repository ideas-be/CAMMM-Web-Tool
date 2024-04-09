var nodeProperties = fetchNodeProps();

var accessibilityData;

var transitTotal, transitAccessible, accessibleRating, totalRating;

function transitIcon(transit) {
    switch (transit) {
        case "Bus": return "fas fa-bus fa-2x";
            break;
        case "Metro": return "fas fa-subway fa-2x";
            break;
        case "Rail": return "fas fa-train fa-2x";
            break;
        case "Tram": return "fas fa-train-tram fa-2x";
            break;
        default: console.log("Unknown transit mode");
    }
}

function displayAccessibilityGraphs() {
    // Display bar graphs depicting accessible stops/stations at node

    var queryInfoDiv = document.getElementById("query-info");
    var accessibilityHTML = "<div id=\"accessible-transit-graphs\">";

    accessibleRating = 0;
    totalRating = 0;

    for (key in accessibilityData) {

        transitTotal = 0;
        transitAccessible = 0;

        if (accessibilityData[key].length > 0) {
            transitTotal = accessibilityData[key].length;
            for (i = 0; i < accessibilityData[key].length; i++) {
                if (accessibilityData[key][i] == 1) {
                    transitAccessible += 1;
                }
            }

        }

        console.log("The accessibility of ", key, " is ", transitAccessible, " out of ", transitTotal);

        var accessibleBarWidth = 0;
        accessibleBarWidth += (transitAccessible * 280) / transitTotal;

        if (transitTotal > 0) {
            accessibilityHTML += "<i class=\"" + transitIcon(key) + "\"></i><div class=\"bar-graph\" id=\"accessible-bar-graph\"><div class=\"bar-graph\" id=\"" + key.toLowerCase() + "\" style=\"width: " + accessibleBarWidth + "px;\"><span class=\"accessible-number\">" + transitAccessible + "</span></div><span class=\"accessible-number\">" + transitTotal + "</span></div>";
        }
        accessibleRating += transitAccessible;
        totalRating += transitTotal;
    }

    queryInfoDiv.innerHTML = accessibilityHTML + "</div>Wheelchair Accessibility";
    console.log("accessibility HTML: ", queryInfoDiv);

}

function calAccessibility() {
    // Calculate Accessibility rating for node
    if (isLinesDisplayed) {
        hideLines();
    }
    document.getElementById("transit-option-menu").innerHTML = "";

    accessibilityData = JSON.parse(nodeProperties.AccessibilityIndex);
    displayAccessibilityGraphs();

    var accessibilityRatingVal = 0;

    // Assign query rating value

    accessibilityRatingVal = (accessibleRating / totalRating) * 10;

    console.log("Accessibility Rating: ", accessibilityRatingVal);

    displayQueryRating(accessibilityRatingVal.toFixed(0));

}