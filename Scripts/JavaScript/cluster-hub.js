// moved from html
var smallClusterFeatures = [];
var mediumClusterFeatures = [];
var largeClusterFeatures = [];
var hubFeatures = [];
var obj;

var a = new XMLHttpRequest();  // This is creating the variable that reads the JSON file
function readNodes() {
    var nodeFilePath = "Data/" + cityName + "/general.geojson";
    console.log("NODE FILE PATH: ", nodeFilePath);
    a.open('GET', nodeFilePath, true);  // This is reading the JSON FILE 
    // console.log("Reading the popup info file to load JSON");

    a.onreadystatechange = function () {  //When the JSON file is open it starts a function 

        if (this.readyState == 4) {     //When the file is read, code 4, this IF is True
            obj = JSON.parse(this.responseText);   // This line parses the response text which is a string into a proper JSON 
            newJson(obj);
            queryDropDown();
            boroughQueryDropDown();
            smallClusterFeatures = getSmallClusters();
            // console.log("Small Cluster Features:\n");
            // console.log(smallClusterFeatures);
            mediumClusterFeatures = getMediumClusters();
            // console.log("Medium Cluster Features:\n");
            // console.log(mediumClusterFeatures);
            largeClusterFeatures = getLargeClusters();
            // console.log("Large Cluster Features:\n");
            // console.log(largeClusterFeatures);
            hubFeatures = getHubs();
            // console.log("Hub Features:\n");
            // console.log(hubFeatures);
        }
    }

    a.send();        // Closes the XMLHttpRequest   
}
// moved from html

// also moved from html
function loadNodes() {
    map.on('load', () => {
        map.addSource('small-clusters', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': smallClusterFeatures,
            }
        });

        map.addSource('medium-clusters', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': mediumClusterFeatures,
            }
        });

        map.addSource('large-clusters', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': largeClusterFeatures,
            }
        });

        map.addSource('hubs', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': hubFeatures,
            }
        });

        // // Add labels for small clusters
        map.addLayer({
            'id': 'small-cluster-labels',
            'type': 'symbol',
            'source': 'small-clusters',
            'paint': {
                // 'text-halo-blur': 1,
                'text-halo-color': "#f5f5f5",
                'text-halo-width': 0.5,
                // 'text-opacity': ['case',
                //     ['boolean', ['feature-state', 'click'], false],
                //     1,
                //     0]
            },
            'layout': {
                'visibility': 'none',
                'text-field': [
                    'format',
                    ['upcase', ['get', 'Name']],
                    { 'font-scale': 0.8 },
                ],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 2],
                'text-max-width': 2,
                'text-ignore-placement': true,
            }
        });

        // // Add labels for medium clusters
        map.addLayer({
            'id': 'medium-cluster-labels',
            'type': 'symbol',
            'source': 'medium-clusters',
            'paint': {
                // 'text-halo-blur': 1,
                'text-halo-color': "#f5f5f5",
                'text-halo-width': 0.5,
                // 'text-opacity': ['case',
                //     ['boolean', ['feature-state', 'click'], false],
                //     1,
                //     0]
            },
            'layout': {
                'visibility': 'none',
                'text-field': [
                    'format',
                    ['upcase', ['get', 'Name']],
                    { 'font-scale': 0.8 },
                ],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 2],
                'text-max-width': 2,
                'text-ignore-placement': true,
            }
        });

        // // Add labels for large clusters
        map.addLayer({
            'id': 'large-cluster-labels',
            'type': 'symbol',
            'source': 'large-clusters',
            'paint': {
                // 'text-halo-blur': 1,
                'text-halo-color': "#f5f5f5",
                'text-halo-width': 0.5,
                // 'text-opacity': ['case',
                //     ['boolean', ['feature-state', 'click'], false],
                //     1,
                //     0]
            },
            'layout': {
                'visibility': 'none',
                'text-field': [
                    'format',
                    ['upcase', ['get', 'Name']],
                    { 'font-scale': 0.8 },
                ],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 2],
                'text-max-width': 2,
                'text-ignore-placement': true,
            }
        });

        // Add a layer showing the small clusters.
        map.addLayer({
            'id': 'small-clusters',
            'type': 'circle',
            'source': 'small-clusters',
            'paint': {
                'circle-color': '#f15924',
                'circle-opacity': [
                    'interpolate',
                    ['exponential', 0.5],
                    ['zoom'],
                    11,
                    0,
                    14,
                    1
                ],
                'circle-radius': 8,
            }
        }
        );

        // Add a layer showing the medium clusters.
        map.addLayer({
            'id': 'medium-clusters',
            'type': 'circle',
            'source': 'medium-clusters',
            'paint': {
                'circle-color': '#f15924',
                'circle-opacity': [
                    'interpolate',
                    ['exponential', 0.5],
                    ['zoom'],
                    11,
                    0.2,
                    14,
                    1
                ],
                'circle-radius': 8,
            }
        }
        );

        // Add a layer showing the large clusters.
        map.addLayer({
            'id': 'large-clusters',
            'type': 'circle',
            'source': 'large-clusters',
            'paint': {
                'circle-color': '#f15924',
                'circle-opacity': 0.7,
                'circle-radius': 8,
            }
        }
        );

        // Add a layer showing the hubs.
        map.addLayer({
            'id': 'hubs',
            'type': 'circle',
            'source': 'hubs',
            'paint': {
                'circle-color': '#d81b60',
                'circle-opacity': [
                    'interpolate',
                    ['exponential', 0.5],
                    ['zoom'],
                    11,
                    0.7,
                    14,
                    1
                ],
                'circle-radius': [
                    'interpolate',
                    ['exponential', 0.5],
                    ['zoom'],
                    11,
                    9,
                    14,
                    14
                ],
            }
        }
        );

        // Add labels for hubs
        map.addLayer({
            'id': 'hub-labels',
            'type': 'symbol',
            'source': 'hubs',
            'paint': {
                // 'text-halo-blur': 1,
                'text-halo-color': "#f5f5f5",
                'text-halo-width': 0.5,
                // 'text-opacity': ['case',
                //     ['boolean', ['feature-state', 'click'], false],
                //     1,
                //     0]
            },
            'layout': {
                'visibility': 'none',
                'text-field': [
                    'format',
                    ['upcase', ['get', 'Name']],
                    { 'font-scale': 0.8 },
                ],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 2],
                'text-max-width': 2,
                'text-ignore-placement': true,
            }
        });

        // Click Small Cluster Function
        map.on('click', 'small-clusters', (e) => {
            // Isolate the selected cluster in another layer and show label

            // Hide borough query dropdown at node click
            // document.getElementById("borough-query-dropdown").style.display = "none";
            // Change the cursor style as a UI indicator.
            var boroughLayer = map.getLayer("selected_borough_polygon");

            if (typeof (boroughLayer) != "undefined") {
                console.log("Borough was selected before this cluster");

                // Now start cluster interactions
                map.getCanvas().style.cursor = 'pointer';
                // hideSelectedCluster();
                if (selectedHub.length == 1) {
                    hideSelectedHub();
                }
                if (selectedCluster.length != 1) {
                    selectedCluster.push(e.features[0]);
                } else {
                    hideSelectedCluster();
                    selectedCluster.push(e.features[0]);
                }

                setTimeout(displaySelectedCluster, 400);

                getMapCenter(e.features[0].geometry.coordinates);

                map.flyTo({
                    'center': centerTemp,
                    'zoom': 16, 'pitch': 60,
                    // 'bearing': 90,
                    'speed': 0.2,
                    'curve': 1,
                    'duration': 2000,
                    'essential': true,
                    'easing': function (t) {
                        return t;
                    }
                });

                // Show node query dropdown on click
                document.getElementById("query-dropdown").style.display = "block";
                openSidebar(e.features[0].properties);

            } else {
                console.log("click a borough first!");
            }

        });

        // Click Medium Cluster Function
        map.on('click', 'medium-clusters', (e) => {
            // Isolate the selected cluster in another layer and show label

            // Hide borough query dropdown at node click
            // document.getElementById("borough-query-dropdown").style.display = "none";

            // Change the cursor style as a UI indicator.
            var boroughLayer = map.getLayer("selected_borough_polygon");

            if (typeof (boroughLayer) != "undefined") {
                console.log("Borough was selected before this cluster");

                // Now start cluster interactions
                map.getCanvas().style.cursor = 'pointer';
                if (selectedHub.length == 1) {
                    hideSelectedHub();
                }
                if (selectedCluster.length != 1) {
                    selectedCluster.push(e.features[0]);
                } else {
                    hideSelectedCluster();
                    selectedCluster.push(e.features[0]);
                }
                setTimeout(displaySelectedCluster, 400);

                getMapCenter(e.features[0].geometry.coordinates);

                map.flyTo({
                    'center': centerTemp,
                    'zoom': 16, 'pitch': 60,
                    // 'bearing': 90,
                    'speed': 0.2,
                    'curve': 1,
                    'duration': 2000,
                    'essential': true,
                    'easing': function (t) {
                        return t;
                    }
                });

                openSidebar(e.features[0].properties);
            } else {
                console.log("click a borough first!");
            }
        });

        // Click Large Cluster Function
        map.on('click', 'large-clusters', (e) => {
            // Isolate the selected cluster in another layer and show label

            // Hide borough query dropdown at node click
            // document.getElementById("borough-query-dropdown").style.display = "none";

            // Change the cursor style as a UI indicator.
            var boroughLayer = map.getLayer("selected_borough_polygon");

            if (typeof (boroughLayer) != "undefined") {
                console.log("Borough was selected before this cluster");

                // Now start cluster interactions
                map.getCanvas().style.cursor = 'pointer';
                if (selectedHub.length == 1) {
                    hideSelectedHub();
                }
                if (selectedCluster.length != 1) {
                    selectedCluster.push(e.features[0]);
                } else {
                    hideSelectedCluster();
                    selectedCluster.push(e.features[0]);
                }
                setTimeout(displaySelectedCluster, 400);

                getMapCenter(e.features[0].geometry.coordinates);

                map.flyTo({
                    'center': centerTemp,
                    'zoom': 16, 'pitch': 60,
                    // 'bearing': 90,
                    'speed': 0.2,
                    'curve': 1,
                    'duration': 2000,
                    'essential': true,
                    'easing': function (t) {
                        return t;
                    }
                });

                openSidebar(e.features[0].properties);
            } else {
                console.log("click a borough first!");
            }
        });

        // Click Hub Function
        map.on('click', 'hubs', (e) => {
            // Isolate the selected hub in another layer and show label
            // Change the cursor style as a UI indicator.
            var boroughLayer = map.getLayer("selected_borough_polygon");

            if (typeof (boroughLayer) != "undefined") {
                console.log("Borough was selected before this cluster");

                // Now start cluster interactions
                map.getCanvas().style.cursor = 'pointer';
                if (selectedCluster.length == 1) {
                    hideSelectedCluster();
                }
                if (selectedHub.length != 1) {
                    selectedHub.push(e.features[0]);
                } else {
                    hideSelectedHub();
                    selectedHub.push(e.features[0]);
                }
                setTimeout(displaySelectedHub, 400);

                getMapCenter(e.features[0].geometry.coordinates);

                map.flyTo({
                    'center': centerTemp,
                    'zoom': 14, 'pitch': 60,
                    // 'bearing': 90,
                    'speed': 0.2,
                    'curve': 1,
                    'duration': 2000,
                    'essential': true,
                    'easing': function (t) {
                        return t;
                    }
                });

                openSidebar(e.features[0].properties);
            } else {
                console.log("click a borough first!");
            }
        });

    });
}
// also moved from html


var selectedCluster = [];
var selectedHub = [];

// Display and Hide Selected Cluster
function displaySelectedCluster() {
    // Render the selected cluster over the existing clusters and hubs
    console.log("Adding a new layer for selected cluster!!!");
    map.addSource('selected_cluster', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': selectedCluster,
        }
    });

    console.log("Selected Cluster is: ", selectedCluster);

    // Add a layer showing the selected cluster circle.
    map.addLayer({
        'id': 'selected_cluster_circle',
        'type': 'circle',
        'source': 'selected_cluster',
        'paint': {
            'circle-color': '#008080',
            'circle-opacity': [
                'interpolate',
                ['exponential', 0.5],
                ['zoom'],
                11,
                0,
                14,
                1
            ],
            'circle-radius': 10,
        },
    });

    // Add a layer showing the selected cluster label.
    map.addLayer({
        'id': 'selected_cluster_label',
        'type': 'symbol',
        'source': 'selected_cluster',
        'paint': {
            'text-halo-color': "#f5f5f5",
            'text-halo-width': 0.5,
        },
        'layout': {
            // 'visibility': 'none',
            'text-field': [
                'format',
                ['upcase', ['get', 'Name']],
                { 'font-scale': 0.8 },
            ],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 3],
            'text-max-width': 2,
            'text-ignore-placement': true,
        }
    });

    // Move the selected cluster layers to the top of the map
    map.moveLayer('selected_cluster_circle');
    map.moveLayer('selected_cluster_label');

}

function hideSelectedCluster() {
    // Hide selected cluster circle and label from mapbox
    console.log("Hiding Selected Cluster from Mapbox!!!");
    map.removeLayer('selected_cluster_circle');
    map.removeLayer('selected_cluster_label');
    map.removeSource('selected_cluster');
    selectedCluster = [];
}

// Display and Hide Selected Hub
function displaySelectedHub() {
    // Render the selected hub over the existing clusters and hubs
    console.log("Adding a new layer for selected hub!!!");
    map.addSource('selected_hub', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': selectedHub,
        }
    });

    console.log("Selected Hub is: ", selectedHub);

    // Add a layer showing the selected hub circle.
    map.addLayer({
        'id': 'selected_hub_circle',
        'type': 'circle',
        'source': 'selected_hub',
        'paint': {
            'circle-color': '#000000',
            'circle-opacity': [
                'interpolate',
                ['exponential', 0.5],
                ['zoom'],
                11,
                0.7,
                14,
                1
            ],
            'circle-radius': 14,
        },
    });

    // Add a layer showing the selected hub label.
    map.addLayer({
        'id': 'selected_hub_label',
        'type': 'symbol',
        'source': 'selected_hub',
        'paint': {
            'text-halo-color': "#f5f5f5",
            'text-halo-width': 0.5,
        },
        'layout': {
            // 'visibility': 'none',
            'text-field': [
                'format',
                ['upcase', ['get', 'Name']],
                { 'font-scale': 0.8 },
            ],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 3],
            'text-max-width': 2,
            'text-ignore-placement': true,
        }
    });

    // Move the selected hub layers to the top of the map
    map.moveLayer('selected_hub_circle');
    map.moveLayer('selected_hub_label');

}

function hideSelectedHub() {
    // Hide selected hub circle and label from mapbox
    console.log("Hiding Selected Hub from Mapbox!!!");
    map.removeLayer('selected_hub_circle');
    map.removeLayer('selected_hub_label');
    map.removeSource('selected_hub');
    selectedHub = [];
}

function zoomOutNode() {

    if (nodeProperties.Type == "Cluster") {
        hideSelectedCluster();
    } else if (nodeProperties.Type == "Hub") {
        hideSelectedHub();
    }

    var currentCity = document.getElementById("city-name").innerHTML;
    if (currentCity == "Gatineau") {
        map.flyTo({
            'center': [-75.721433, 45.457787],
            'zoom': 11.24,
            'pitch': 0,
            // 'bearing': 90,
            'speed': 0.2,
            'curve': 1,
            'duration': 2000,
            'essential': true,
            'easing': function (t) {
                return t;
            }
        });

        setTimeout(function () { window.location.reload(); }, 2000);
    }
    if (currentCity == "Sherbrooke") {
        map.flyTo({
            'center': [-71.924396, 45.398415],
            'zoom': 11.46,
            'pitch': 0,
            // 'bearing': 90,
            'speed': 0.2,
            'curve': 1,
            'duration': 2000,
            'essential': true,
            'easing': function (t) {
                return t;
            }
        });

        setTimeout(function () { window.location.reload(); }, 2000);
    }
    if (currentCity == "Quebec City") {
        map.flyTo({
            'center': [-71.262953, 46.831758],
            'zoom': 11.10,
            'pitch': 0,
            // 'bearing': 90,
            'speed': 0.2,
            'curve': 1,
            'duration': 2000,
            'essential': true,
            'easing': function (t) {
                return t;
            }
        });

        setTimeout(function () { window.location.reload(); }, 2000);
    }
    else {
        map.flyTo({
            'center': boroughCenter,
            'zoom': 13, 'pitch': 45,
            // 'bearing': 90,
            'speed': 0.2,
            'curve': 1,
            'duration': 2000,
            'essential': true,
            'easing': function (t) {
                return t;
            }
        });
    }

}

function getSmallClusters() {
    var smallClusterList = [];
    var NumBusStops;
    var BusesData;
    var count = 0;
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        NumBusStops = 0;
        if (myJson.features[i].properties.Type == "Cluster") {
            BusesData = myJson.features[i].properties.BusData;
            // console.log(BusesData);
            for (const key in BusesData) {
                // console.log(key);
                NumBusStops += 1;
            }
            // console.log("Number of Bus Stops: ", NumBusStops);
            if ((NumBusStops >= 1) && (NumBusStops <= 2)) {
                count++;
                smallClusterList.push(myJson.features[i]);
            }
        }

    }
    console.log("Number of Small Clusters: ", count);
    // console.log("Large Clusters are: ", largeClusterList);
    return (smallClusterList);
}

function getMediumClusters() {
    var mediumClusterList = [];
    var NumBusStops;
    var BusesData;
    var count = 0;
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        NumBusStops = 0;
        if (myJson.features[i].properties.Type == "Cluster") {
            BusesData = myJson.features[i].properties.BusData;
            // console.log(BusesData);
            for (const key in BusesData) {
                // console.log(key);
                NumBusStops += 1;
            }
            // console.log("Number of Bus Stops: ", NumBusStops);
            if ((NumBusStops >= 3) && (NumBusStops <= 5)) {
                count++;
                mediumClusterList.push(myJson.features[i]);
            }
        }

    }
    console.log("Number of Medium Clusters: ", count);
    // console.log("Large Clusters are: ", largeClusterList);
    return (mediumClusterList);
}

function getLargeClusters() {
    var largeClusterList = [];
    var NumBusStops;
    var BusesData;
    var count = 0;
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        NumBusStops = 0;
        if (myJson.features[i].properties.Type == "Cluster") {
            BusesData = myJson.features[i].properties.BusData;
            // console.log(BusesData);
            for (const key in BusesData) {
                // console.log(key);
                NumBusStops += 1;
            }
            // console.log("Number of Bus Stops: ", NumBusStops);
            if (NumBusStops >= 6) {
                count++;
                largeClusterList.push(myJson.features[i]);
            }
        }

    }
    console.log("Number of Large Clusters: ", count);
    // console.log("Large Clusters are: ", largeClusterList);
    return (largeClusterList);
}


function getHubs() {
    var hubList = [];
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        if (myJson.features[i].properties.Type == "Hub")
            hubList.push(myJson.features[i]);
    }
    return (hubList);
}