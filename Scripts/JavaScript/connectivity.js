var nodeProperties = fetchNodeProps();

var connectivityData;

var connectivityIcons = [{ "Centrality": "fas fa-arrows-to-circle" }, { "Closeness": "fas fa-timeline" }, { "Betweenness": "fas fa-circle-nodes" }];

function displayConnectivityGraphs() {
    // Display bar graphs depicting connectivity metrics at node

    var queryInfoDiv = document.getElementById("query-info");
    var accessibilityHTML = "<div id=\"accessible-transit-graphs\">";

    accessibilityData = JSON.parse(nodeProperties.AccessibilityIndex);

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

    }

    queryInfoDiv.innerHTML = accessibilityHTML + "</div>Wheelchair Accessibility";
    console.log("accessibility HTML: ", queryInfoDiv);

}

function calConnectivity() {
    // TODO: Calculate Connectivity rating for node


}