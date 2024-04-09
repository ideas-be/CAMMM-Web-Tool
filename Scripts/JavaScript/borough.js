var myBoroughsJson;
// var myBoroughQueryJson;
var selectedBorough = [];
// var selectedBoroughQuery = [];
var boroughCenter = [];



// function getBoroughsJson() {
//     // Read the boroughs.geojson file and assign to variable
//     myBoroughsJson = readGeoJsonObj("borough.geojson");
//     console.log("Fetching Boroughs JSON!!!");
//     console.log(myBoroughsJson);
//     console.log(myBoroughsJson.features);
// }

// var c = new XMLHttpRequest();  // This is creating the variable that reads the JSON file
// function readBoroughs() {
//     c.open('GET', "Data/Montreal_Island/borough.geojson", true);  // This is reading the JSON FILE 

//     c.onreadystatechange = function () {  //When the JSON file is open it starts a function 
//         // this.readyState = 4;
//         console.log("Ready State Change: ", this.readyState);

//         if (this.readyState == 4) {     //When the file is read, code 4, this IF is True
//             myBoroughsJson = JSON.parse(this.responseText);   // This line parses the response text which is a string into a proper JSON 
//             // getPopJson(jsonObj);
//         }
//         console.log("Reading Borough GeoJSON: ", myBoroughsJson);
//     }
//     c.send();        // Closes the XMLHttpRequest   
// }

function getBoroughJSON(json) {
    myBoroughsJson = json;
    console.log("Borough GeoJSON is: ", myBoroughsJson);
    // displayBoroughs();
    setTimeout(displayBoroughs, 300);
}

function displayBoroughs() {
    // Display the borough polygons onto mapbox from json
    // getBoroughsJson();
    // readBoroughs();


    console.log("Adding Boroughs as Source in MapBox");
    if (myBoroughsJson != null) {
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
                'fill-color': '#AD84E3',
                'fill-outline-color': '#7d4cbe',
                'fill-opacity': 0.4,
            }
        });

        // Add a layer showing the borough outlines.
        map.addLayer({
            'id': 'borough_outlines',
            'type': 'line',
            'source': 'boroughs',
            'paint': {
                'line-color': '#7d4cbe',
                'line-width': 2
            }
        });
    } else {
        console.log("My Boroughs JSON is NULL");
    }


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

        // setTimeout(boroughQueryDropDown, 50);
        // fetchGeoJson("borough_query.geojson");
        // setTimeout(getBoroughQueryJson, 100);
        // setTimeout(getBoroughQueryProp, 400);

        selectedBorough.push(e.features[0]);
        console.log("Selected borough is: ", selectedBorough);
        boroughCenter = [selectedBorough[0].properties.Longitude + 0.0125, selectedBorough[0].properties.Latitude];
        console.log("Center of the Selected Borough is: ", boroughCenter);
        setTimeout(displaySelectedBorough, 500);

        hideBoroughs();

        console.log("Opening Sidebar for Borough-level Info!!!");
        setTimeout(function () {
            console.log("Type of Selected Borough Properties: ", typeof (selectedBorough[0].properties));
            openBoroughSidebar(selectedBorough[0].properties);
        }, 600);
        // setTimeout(responsiveSidebar, 500);

    });
}

function displaySelectedBorough() {
    // Render the selected borough under the existing clusters and hubs
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
            'fill-color': '#AD84E3',
            'fill-outline-color': '#7d4cbe',
            'fill-opacity': [
                'interpolate',
                ['exponential', 0.5],
                ['zoom'],
                11,
                0.6,
                14,
                0.2
            ],
        },
    }, 'small-clusters');


    // Add a layer showing the selected borough outline.
    map.addLayer({
        'id': 'selected_borough_outline',
        'type': 'line',
        'source': 'selected_borough',
        'paint': {
            'line-color': '#7d4cbe',
            'line-width': 2.5
        }
    }, 'selected_borough_polygon');

    // Push the selected borough layers underneath the node layers in the map
    map.moveLayer('small-clusters');
    map.moveLayer('medium-clusters');
    map.moveLayer('large-clusters');
    map.moveLayer('hub-labels');
    map.moveLayer('hubs');

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