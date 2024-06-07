var popJson;
var demoButtonFlag = 0;

// fetchGeoJson("population_borough.json");
// setTimeout(function () { popJson = readGeoJsonObj("population_borough.json"); }, 100);

// moved this from html
// var b = new XMLHttpRequest();  // This is creating the variable that reads the JSON file
// function readPopulation() {
//     b.open('GET', "Data/Montreal_Island/population_borough.json", true);  // This is reading the JSON FILE 

//     b.onreadystatechange = function () {  //When the JSON file is open it starts a function 

//         if (this.readyState == 4) {     //When the file is read, code 4, this IF is True
//             popJson = JSON.parse(this.responseText);   // This line parses the response text which is a string into a proper JSON 
//             // getPopJson(jsonObj);
//         }
//         console.log("Population JSON: ", popJson);
//     }
//     b.send();        // Closes the XMLHttpRequest   

// }
// moved this from html

function getPopJson(json) {
    // get the population_borough.json file from parallel reading js
    popJson = json;
    console.log("Population JSON is: ", popJson);
}



function displayPopData() {
    var MaleDemographicData = popJson.features[19].demographic_data.Males_demoData;
    var FemaleDemographicData = popJson.features[19].demographic_data.Females_demoData;

    var popDataHTML = "<table style=\"font-size: 11px;\"><tr><td>male</td><td></td><td style=\"text-align: right;\">female</td></tr>";

    if (demoButtonFlag == 0) {
        document.getElementById('demographics-button').style.backgroundColor = '#c21655';
        demoButtonFlag = 1;

        var maleKeys = Object.keys(MaleDemographicData);
        maleKeys.reverse();
        // console.log("Male demo data keys: ", maleKeys);

        var femaleKeys = Object.keys(FemaleDemographicData);
        femaleKeys.reverse();

        var popAge = ["100+", "95-99", "90-94", "85-89", "80-84", "75-79", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49", "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"];

        for (i = 0; i < maleKeys.length; i++) {
            popDataHTML += "<tr><td><div class=\"demo-data-bar\" id=\"male-demo-data\" style=\"width:" + MaleDemographicData[maleKeys[i]] * 0.0175 + "px;\">" + MaleDemographicData[maleKeys[i]] + "</div></td><td><div id=\"pop-age\" style=\"text-align: center; width: 30px;\"> " + popAge[i] + " </div></td><td><div class=\"demo-data-bar\" id=\"female-demo-data\" style=\"width:" + FemaleDemographicData[femaleKeys[i]] * 0.0175 + "px;\">" + FemaleDemographicData[femaleKeys[i]] + "</div></td></tr>";
        }

        document.getElementById('borough-query-rating').innerHTML = "";

        document.getElementById("borough-query-info").innerHTML = "Borough Demographic Data<br><br>" + popDataHTML;

    } else if (demoButtonFlag == 1) {
        document.getElementById('demographics-button').style.backgroundColor = '#d81b60';
        demoButtonFlag = 0;
        document.getElementById("borough-query-info").innerHTML = "";
    }
}