var nodeProperties = fetchNodeProps();

var myConnectivityJSON;

var connectivityProperties;

var connectivityIcons = [{ "Centrality": "fas fa-arrows-to-circle" }, { "Closeness": "fas fa-timeline" }, { "Betweenness": "fas fa-circle-nodes" }];

function displayConnectivityGraphs() {
    // Display bar graphs depicting connectivity metrics at node

    var queryInfoDiv = document.getElementById("query-info");
    var connectivityHTML = "<div id=\"connectivity-graphs\">";

    var centralityWidth = connectivityProperties.Centrality * 50;
    var closenessWidth = connectivityProperties.Closeness * 50;
    var betweennessWidth = connectivityProperties.Betweenness * 50;

    var connectivityHTML = "<div class=\"bar-graph\" id=\"centrality\" style=\"width: " + centralityWidth + "px;\"><span class=\"metrics-type\">Centrality</span><span class=\"metrics-number\">" + connectivityProperties.Centrality + "</span></div>" + "<div class=\"bar-graph\" id=\"closeness\" style=\"width: " + closenessWidth + "px;\"><span class=\"metrics-type\">Closeness</span><span class=\"metrics-number\">" + connectivityProperties.Closeness + "</span></div>" + "<div class=\"bar-graph\" id=\"betweenness\" style=\"width: " + betweennessWidth + "px;\"><span class=\"metrics-type\">Betweenness</span><span class=\"metrics-number\">" + connectivityProperties.Betweenness + "</span></div>";

    queryInfoDiv.innerHTML = connectivityHTML + "</div>Connectivity Metrics";
    console.log("Connectivity HTML: ", queryInfoDiv);

}

function fetchConnectivityProps() {
    for (i = 0; i < myConnectivityJSON.features.length; i++) {
        if (nodeProperties.Id == myConnectivityJSON.features[i].Id) {
            connectivityProperties = myConnectivityJSON.features[i];
        }
    }
    console.log("Connectivity properties: ", connectivityProperties);
}

function calConnectivity() {
    // TODO: Calculate Connectivity rating for node

    hideLines();
    document.getElementById("transit-option-menu").innerHTML = "";

    myConnectivityJSON = readGeoJsonObj("connectivity.geojson");
    fetchConnectivityProps();
    displayConnectivityGraphs();

    var connectivityRatingVal = 0;

    // Assign query rating value

    connectivityRatingVal = (connectivityProperties.Centrality + connectivityProperties.Closeness + connectivityProperties.Betweenness) / 3;

    console.log("Connectivity Rating: ", connectivityRatingVal);

    displayQueryRating(connectivityRatingVal);

}