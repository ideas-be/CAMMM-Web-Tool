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
    var popDataHTML = "<table style=\"font-size: 11px;\">";
    for (demoData in MaleDemographicData) {
        //     console.log(demoData, ": ", popDemographicData[demoData]);
        popDataHTML += "<tr><td>" + demoData + "</td>" + "<td> : </td><td><div style=\"width:" + MaleDemographicData[demoData] * 0.025 + "px; height:15px; background-color:#3148c1; color: #ffffff; font-size: 10px; text-align: right; padding-top: 4px; padding-right: 4px;\">" + MaleDemographicData[demoData] + "</div></td></tr>";
        // TODO: Make bar graph div
    }
    popDataHTML += "</table><br><em>Females: </em><table style=\"font-size: 11px;\">";
    for (demoData in FemaleDemographicData) {
        //     console.log(demoData, ": ", popDemographicData[demoData]);
        popDataHTML += "<tr><td>" + demoData + "</td>" + "<td> : </td><td><div style=\"width:" + FemaleDemographicData[demoData] * 0.025 + "px; height:15px; background-color:#d81b60; color: #ffffff; font-size: 10px; text-align: right;  padding-top: 4px; padding-right: 4px;\">" + FemaleDemographicData[demoData] + "</div></td></tr>";
    }

    document.getElementById("borough-query-info").innerHTML = "<em>Males: </em>" + popDataHTML;
}