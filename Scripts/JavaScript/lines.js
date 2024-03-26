var nodeProperties = fetchNodeProps();

var myLinesJson = [];

function getLinesJSON(json) {
    myLinesJson = json;
    console.log("Lines GeoJSON is: ");
    console.log(myLinesJson);
}

function getCurrentLines() {
    // Fetch lines connected to current node
    var routes = [];
    var currentLines = [];
    var metroJSON = JSON.parse(nodeProperties.MetroData);
    var busJSON = JSON.parse(nodeProperties.BusData);
    var railJSON = JSON.parse(nodeProperties.RailData);
    var tramJSON = JSON.parse(nodeProperties.TramData);
    // for (i = 0; i < myLinesJson.features.length; i++) {
    for (metroStation in metroJSON) {
        for (j = 0; j < metroJSON[metroStation].length; j++) {
            console.log("Metro route: ", metroJSON[metroStation][j]);
            routes.push(metroJSON[metroStation][j]);
        }

    }
    for (busStop in busJSON) {
        for (k = 0; k < busJSON[busStop].length; k++) {
            console.log("Bus route: ", busJSON[busStop][k]);
            routes.push(busJSON[busStop][k]);
        }

    }
    for (tramStop in tramJSON) {
        for (l = 0; l < tramJSON[tramStop].length; l++) {
            console.log("Tram route: ", tramJSON[tramStop][l]);
            routes.push(tramJSON[tramStop][l]);
        }
    }
    for (railStation in railJSON) {
        for (m = 0; m < railJSON[railStation].length; m++) {
            console.log("Rail route: ", railJSON[railStation][m]);
            routes.push(railJSON[railStation][m]);
        }
    }

    // remove duplicate routes
    uniqueRoutes = [...new Set(routes)];

    console.log("All Routes: ", uniqueRoutes);

    for (i = 0; i < myLinesJson.features.length; i++) {
        for (route in uniqueRoutes) {
            if (uniqueRoutes[route] == myLinesJson.features[i].properties.Route) {
                currentLines.push(myLinesJson.features[i]);
            }
        }
    }

    console.log("Current Lines: ", currentLines);
    return currentLines;
}

var isLinesDisplayed = false;

function displayLines() {
    // The objective of this function is:
    // To fetch lines geojson file and display associated lines with selected node on map
    // fetchGeoJson("Lines.geojson");



    // console.log(myLinesJson.features);

    if (myLinesJson != null) {

        console.log("Adding Lines as Source in MapBox");
        map.addSource('lines', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': getCurrentLines(),
            }
        });

        // Add a layer showing the clusters.
        map.addLayer({
            'id': 'transit-lines',
            'type': 'line',
            'source': 'lines',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round',
            },
            'paint': {
                'line-color': '#000000',
                'line-width': 2,
                // 'circle-radius': 8,
            }
        }
        );

        map.setPaintProperty('transit-lines', 'line-color', '#008080');
        calMultiModality();
        isLinesDisplayed = true;
    }


}

function hideLines() {
    // map.setLayoutProperty('transit-lines', 'visibility', 'none');
    map.removeLayer('transit-lines');
    map.removeSource('lines');
    isLinesDisplayed = false;
}