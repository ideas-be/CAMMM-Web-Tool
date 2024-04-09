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