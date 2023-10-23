var popJson = [];

function getPopJson(jsonData) {
    popJson = jsonData;
    console.log("Population JSON: ", popJson);
}

function displayPopData() {
    var popDemographicData = popJson.features[0].demographic_data;

    console.log(popDemographicData);
    // console.log("Printing population demographic data: ");
    var popDataHTML = "<table>";
    for (demoData in popDemographicData.Males_demoData) {
        //     console.log(demoData, ": ", popDemographicData[demoData]);
        popDataHTML += "<tr><td>" + demoData + "</td>" + "<td> : </td><td>" + popDemographicData.Males_demoData[demoData] + "</td></tr>";
    }
    popDataHTML += "</table><br><em>Females: </em><table>";
    for (demoData in popDemographicData.Females_demoData) {
        //     console.log(demoData, ": ", popDemographicData[demoData]);
        popDataHTML += "<tr><td>" + demoData + "</td>" + "<td> : </td><td>" + popDemographicData.Females_demoData[demoData] + "</td></tr>";
    }

    document.getElementById("borough-query-info").innerHTML = "<em>Males: </em>" + popDataHTML;
}