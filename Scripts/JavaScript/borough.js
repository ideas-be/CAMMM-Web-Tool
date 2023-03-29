// This is where the JS related to the boroughs for each city will go
var myBoroughsJson;
var selectedBorough = [];
var boroughCenter = [];
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
            'fill-opacity': 0.4,
        }
    });

    // Add a layer showing the borough outlines.
    map.addLayer({
        'id': 'borough_outlines',
        'type': 'line',
        'source': 'boroughs',
        'paint': {
            'line-color': '#d7380c',
            'line-width': 2
        }
    });

}

function showBoroughs() {
    // Hide borough polygons from mapbox
    console.log("Showing Boroughs back on Mapbox!!!");
    map.setLayoutProperty('borough_polygons', 'visibility', 'visible');
    map.setLayoutProperty('borough_outlines', 'visibility', 'visible');
}

function hideBoroughs() {
    // Hide borough polygons from mapbox
    console.log("Hiding Boroughs from Mapbox!!!");
    map.setLayoutProperty('borough_polygons', 'visibility', 'none');
    map.setLayoutProperty('borough_outlines', 'visibility', 'none');
}

function clickBoroughs() {
    // Change color, display label and zoom into node
    map.on('click', 'borough_polygons', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        selectedBorough.push(e.features[0]);
        boroughCenter = [selectedBorough[0].properties.cent_Lon - 0.01, selectedBorough[0].properties.cent_Lat + 0.04];
        console.log("Center of the Selected Borough is: ", boroughCenter);
        setTimeout(displaySelectedBorough, 300);

        hideBoroughs();

        console.log("Opening Sidebar for Borough-level Info!!!");
        openBoroughSidebar(selectedBorough[0].properties);
    });
}

function displaySelectedBorough() {

    map.addSource('selected_borough', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': selectedBorough,
        }
    });

    // Add a layer showing the selected borough polygon.
    map.addLayer({
        'id': 'selected_borough_polygon',
        'type': 'fill',
        'source': 'selected_borough',
        'paint': {
            'fill-color': '#eda18c',
            'fill-outline-color': '#d7380c',
            'fill-opacity': 0.6,
        }
    });

    // Add a layer showing the selected borough outline.
    map.addLayer({
        'id': 'selected_borough_outline',
        'type': 'line',
        'source': 'selected_borough',
        'paint': {
            'line-color': '#d7380c',
            'line-width': 2.5
        }
    });

    // Zoom into selected borough.
    map.flyTo({
        'center': boroughCenter,
        'zoom': 13, 'pitch': 45,
        // 'bearing': 90,
        'speed': 0.2,
        'curve': 1,
        'duration': 3000,
        'essential': true,
        'easing': function (t) {
            return t;
        }
    });

}

function hideSelectedBorough() {
    // Hide selected borough polygon and outline from mapbox
    console.log("Hiding Selected Borough from Mapbox!!!");
    map.removeLayer('selected_borough_polygon');
    map.removeLayer('selected_borough_outline');
    map.removeSource('selected_borough');
    selectedBorough = [];
    boroughCenter = [];
}
//  ~(=^‥^)ノ

function insertBoroughToggle() {
    var boroughToggleHTML = "<p class=\"toggleText\">" +
        "<label class=\"switch\" >" +
        "<input type=\"checkbox\" id=\"boroughtoggBtn\" onchange=\"\">" +
        "<span class=\"slider round\"></span>" +
        "</label>     Borough" +
        "</p>";
    document.getElementById("borough-toggle").innerHTML = boroughToggleHTML;
}