var popJson = [];

function getPopJson(jsonData) {
    popJson = jsonData;
    console.log("Population JSON: ", popJson);
}
var demoButtonFlag = 0;
function displayPopData() {
    var MaleDemographicData = popJson.features[0].demographic_data.Males_demoData;
    var FemaleDemographicData = popJson.features[0].demographic_data.Females_demoData;

    var popDataHTML = "<table style=\"font-size: 11px;\"><tr><td>male</td><td style=\"text-align: right;\">female</td></tr>";

    if (demoButtonFlag == 0) {
        document.getElementById('demographics-button').style.backgroundColor = '#c21655';
        demoButtonFlag = 1;

        var maleKeys = Object.keys(MaleDemographicData);
        maleKeys.reverse();
        // console.log("Male demo data keys: ", maleKeys);

        var femaleKeys = Object.keys(FemaleDemographicData);
        femaleKeys.reverse();

        for (i = 0; i < maleKeys.length; i++) {
            popDataHTML += "<tr><td><div class=\"demo-data-bar\" id=\"male-demo-data\" style=\"width:" + MaleDemographicData[maleKeys[i]] * 0.02 + "px;\">" + MaleDemographicData[maleKeys[i]] + "</div></td><td><div class=\"demo-data-bar\" id=\"female-demo-data\" style=\"width:" + FemaleDemographicData[femaleKeys[i]] * 0.02 + "px;\">" + FemaleDemographicData[femaleKeys[i]] + "</div></td></tr>";
        }

        document.getElementById('borough-query-rating').innerHTML = "";

        document.getElementById("borough-query-info").innerHTML = "Borough Demographic Data<br><br>" + popDataHTML;

    } else if (demoButtonFlag == 1) {
        document.getElementById('demographics-button').style.backgroundColor = '#d81b60';
        demoButtonFlag = 0;
        document.getElementById("borough-query-info").innerHTML = "";
    }
}