function displayLines() {
    // The objective of this function is:
    // To fetch lines geojson file and display associated lines with selected node on map
    fetchGeoJson("Lines.geojson");

    var myLinesJson = readGeoJsonObj("Lines.geojson");
    console.log("Fetching and Displaying Lines!!!");
    console.log(myLinesJson);

    // TODO: Refer tutorial and figure out how to display the lines

    map.on('click', 'hubs', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        console.log("Adding Lines as Source in MapBox");
        map.addSource('lines', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': myLinesJson.features,
            }
        });

        // Add a layer showing the clusters.
        // map.addLayer({
        //     'id': 'lines',
        //     'type': 'circle',
        //     'source': 'clusters',
        //     'paint': {
        //         'circle-color': '#f15924',
        //         'circle-opacity': 0.5,
        //         'circle-radius': 8,
        //     }
        // }
        // );
    });
}