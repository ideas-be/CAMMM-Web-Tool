var selectedCluster, selectedHub;

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
            'text-offset': [0, 2],
            'text-max-width': 2,
            'text-ignore-placement': true,
        }
    });

    // Move the selected cluster layers to the top of the map
    map.moveLayer('selected_cluster_circle');
    map.moveLayer('selected_cluster_label');

}

function hideSelectedCluster() {
    // TODO: Hide selected cluster circle and label from mapbox
    // console.log("Hiding Selected Borough from Mapbox!!!");
    // map.removeLayer('selected_borough_polygon');
    // map.removeLayer('selected_borough_outline');
    // map.removeSource('selected_borough');
    // selectedBorough = [];
    // boroughCenter = [];
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