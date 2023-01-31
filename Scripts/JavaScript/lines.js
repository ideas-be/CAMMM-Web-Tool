var nodeProperties = fetchNodeProps();

function displayLines() {
    // The objective of this function is:
    // To fetch lines geojson file and display associated lines with selected node on map
    // fetchGeoJson("Lines.geojson");

    var myLinesJson = readGeoJsonObj("Lines.geojson");
    console.log("Fetching and Displaying Lines!!!");
    console.log(myLinesJson);
    console.log(myLinesJson.features);

    // TODO: Refer tutorial and figure out how to display the lines

    console.log("Adding Lines as Source in MapBox");
    map.addSource('lines', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': myLinesJson.features,
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

}