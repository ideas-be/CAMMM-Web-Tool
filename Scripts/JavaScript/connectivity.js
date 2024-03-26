var nodeProperties = fetchNodeProps();

var myConnectivityJSON;

var connectivityProperties;

var connectivityIcons = [{ "Centrality": "fas fa-arrows-to-circle" }, { "Closeness": "fas fa-timeline" }, { "Betweenness": "fas fa-circle-nodes" }];

function displayConnectivityGraphs() {
    // Display bar graphs depicting connectivity metrics at node

    var queryInfoDiv = document.getElementById("query-info");
    var connectivityHTML = "<p>Network Analysis Metrics</p><div id=\"connectivity-graphs\">";

    var centralityWidth = connectivityProperties.Centrality * 50;
    var closenessWidth = connectivityProperties.Closeness * 50;
    var betweennessWidth = connectivityProperties.Betweenness * 50;

    connectivityHTML += "<div class=\"bar-graph\" id=\"centrality\" style=\"width: " + centralityWidth + "px;\"><span class=\"metrics-type\">Centrality</span><span class=\"metrics-number\">" + connectivityProperties.Centrality + "</span></div><p>The higher the value, the better the connection to the rest of the transit network.</p>" + "<div class=\"bar-graph\" id=\"closeness\" style=\"width: " + closenessWidth + "px;\"><span class=\"metrics-type\">Closeness</span><span class=\"metrics-number\">" + connectivityProperties.Closeness + "</span></div><p>The higher the value, the more likely this node will be used in a trip.</p>" + "<div class=\"bar-graph\" id=\"betweenness\" style=\"width: " + betweennessWidth + "px;\"><span class=\"metrics-type\">Betweenness</span><span class=\"metrics-number\">" + connectivityProperties.Betweenness + "</span></div><p>The higher the value, the larger the number of connections to this node.</p>";

    queryInfoDiv.innerHTML = connectivityHTML + "</div>";
    console.log("Connectivity HTML: ", queryInfoDiv);

}

function fetchConnectivityProps() {
    myConnectivityJSON = readGeoJsonObj("connectivity.geojson");

    for (i = 0; i < myConnectivityJSON.features.length; i++) {
        if (nodeProperties.Id == myConnectivityJSON.features[i].Id) {
            connectivityProperties = myConnectivityJSON.features[i];
        }
    }
    console.log("Connectivity properties: ", connectivityProperties);
    console.log("Centrality: ", connectivityProperties.Centrality);
    console.log("Betweenness: ", connectivityProperties.Betweenness);
    console.log("Closeness: ", connectivityProperties.Closeness);
}

function calConnectivity() {

    if (isLinesDisplayed) {
        hideLines();
    }
    document.getElementById("transit-option-menu").innerHTML = "";


    fetchConnectivityProps();
    displayConnectivityGraphs();

    var connectivityRatingVal = 0;

    // Assign query rating value

    connectivityRatingVal = (connectivityProperties.Centrality + connectivityProperties.Closeness + connectivityProperties.Betweenness) / 3;

    console.log("Connectivity Rating: ", connectivityRatingVal);

    displayQueryRating(connectivityRatingVal.toFixed(0));

}