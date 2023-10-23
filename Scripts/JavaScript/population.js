var popJson = [];

function getPopJson(jsonData) {
    popJson = jsonData;
    console.log("Population JSON: ", popJson);
}

function displayPopData() {
    var MaleDemographicData = popJson.features[0].demographic_data.Males_demoData;
    var FemaleDemographicData = popJson.features[0].demographic_data.Females_demoData;

    // console.log(popDemographicData);
    // console.log("Printing population demographic data: ");
    var popDataHTML = "<table>";
    for (demoData in MaleDemographicData) {
        //     console.log(demoData, ": ", popDemographicData[demoData]);
        popDataHTML += "<tr><td>" + demoData + "</td>" + "<td> : </td><td>" + MaleDemographicData[demoData] + "</td></tr>";
        // TODO: Make bar graph div
        // style=\"width:" + MaleDemographicData[demoData] * 0.025 + "px; height:20px; background-color:#d81b60;\"
    }
    popDataHTML += "</table><br><em>Females: </em><table>";
    for (demoData in FemaleDemographicData) {
        //     console.log(demoData, ": ", popDemographicData[demoData]);
        popDataHTML += "<tr><td>" + demoData + "</td>" + "<td> : </td><td>" + FemaleDemographicData[demoData] + "</td></tr>";
    }

    document.getElementById("borough-query-info").innerHTML = "<em>Males: </em>" + popDataHTML;
}