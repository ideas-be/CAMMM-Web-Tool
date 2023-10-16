var popJson = [];

function getPopJson(jsonData) {
    popJson = jsonData;
    console.log("Population JSON: ", popJson);
}

function displayPopData() {
    var popDemographicData = popJson.features[0].demographic_data;
    console.log(popJson.features[0].deomgraphic_data);
    console.log("Printing population demographic data: ");
    for (demoData in popDemographicData) {
        console.log(demoData, ": ", popDemographicData[demoData]);
    }
}