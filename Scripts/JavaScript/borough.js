// This is where the JS related to the boroughs for each city will go
var myBoroughsJson;
fetchGeoJson("borough.geojson");

function getBoroughsJson() {
    // Read the boroughs.geojson file and assign to variable
    myBoroughsJson = readGeoJsonObj("borough.geojson");
    console.log("Fetching Boroughs JSON!!!");
    console.log(myBoroughsJson);
    console.log(myBoroughsJson.features);
}

function displayBoroughs() {
    // Display the borough polygons onto mapbox from json
    getBoroughsJson();

    console.log("Adding Boroughs as Source in MapBox");
    map.addSource('boroughs', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': myBoroughsJson.features,
        }
    });

    // Add a layer showing the borough polygons.
    map.addLayer({
        'id': 'borough_polygons',
        'type': 'fill',
        'source': 'boroughs',
        'paint': {
            'fill-color': '#eda18c',
            'fill-outline-color': '#d7380c',
        }
    });

    // Add a layer showing the borough outlines.
    map.addLayer({
        'id': 'borough_outlines',
        'type': 'line',
        'source': 'boroughs',
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
    });

}

function hideBoroughs() {
    // Hide borough polygons from mapbox
}