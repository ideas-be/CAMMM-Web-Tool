function displaySelectedCluster(selectedCluster) {
    // 
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