var city = [
    {
        cityName: "Montreal",
        cityNameFR: "Montréal",
        cityURL: "./atlas_montreal.html"
    },
    {
        cityName: "Quebec City",
        cityNameFR: "Ville de Québec",
        cityURL: "./atlas_quebec_city.html"
    },
    {
        cityName: "Trois Rivières",
        cityNameFR: "Trois Rivières",
        cityURL: "./atlas_trois_rivieres.html"
    },
    {
        cityName: "Gatineau",
        cityNameFR: "Gatineau",
        cityURL: "./atlas_gatineau.html"
    },
    {
        cityName: "Sherbrooke",
        cityNameFR: "Sherbrooke",
        cityURL: "./atlas_sherbrooke.html"
    }
];

// var selectedCity = '';

var selectedCities = [];

var filterNumber = 0;

function insertCityButtons() {
    var cityCounter = 1;
    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';
    var cityButtonsDiv = document.getElementById("city-buttons");
    var startText = "";
    startText = result == 'Yes' ? "Lancer" : "Start";
    var citySelectCTA = "";
    citySelectCTA = result == 'Yes' ? "Sélectionnez les villes et cliquez sur Lancer" : "Select Cities and Click Start";
    var cityButtonsHTML = "<p id=\"city-button-cta\" style=\"color: #a3a3a3; font-size: 12px; padding-bottom: 5px;\"><em>" + citySelectCTA + "</em></p>";
    console.log("Cities Processed in the Atlas are: ");
    for (cityObj in city) {
        console.log(city[cityObj].cityName, " / ", city[cityObj].cityNameFR);
        var cName = "";
        cName = result == 'Yes' ? city[cityObj].cityNameFR : city[cityObj].cityName;
        cityButtonsHTML += "<span class=\"city-filter\" id=\"city" + cityCounter + "\"><a onclick=\"addCity('" + cName + "', " + cityCounter + ");\"> " + cName + " </a></span>";
        cityCounter += 1;
    }
    cityButtonsDiv.innerHTML = cityButtonsHTML + "<span class=\"city-filter\" id=\"start-button\"><a onclick=\"openCityTabs();\"><i class=\"fas fa-forward-fast\"></i>" + startText + "</a></span>";
}

function addCity(selCity, num) {
    var cityID = "city" + num;
    if (selectedCities.includes(selCity)) {
        var index = selectedCities.indexOf(selCity);
        selectedCities.splice(index, 1);
        document.getElementById(cityID).style.backgroundColor = '#f6daa5';
        document.getElementById(cityID).style.color = '#cd9326';
    } else {
        console.log("Adding City!!!");
        selectedCities.push(selCity);
        document.getElementById(cityID).style.backgroundColor = '#f2c674';
        document.getElementById(cityID).style.color = '#a76f06';
    }
    if (selectedCities.length >= 1) {
        document.getElementById('start-button').style.cursor = 'pointer';
        document.getElementById('start-button').style.backgroundColor = '#d81b60';
        // document.getElementById('start-button').style.color = '#d81b60';
    }
}

function openCityTabs() {
    for (selCity in selectedCities) {
        var selectedCity = selectedCities[selCity];
        console.log("Selected City: ", selectedCity);
        for (cityObj in city) {
            console.log(city[cityObj].cityName);
            if ((city[cityObj].cityName == selectedCity) || (city[cityObj].cityNameFR == selectedCity)) {
                window.open(city[cityObj].cityURL);
            }
        }
    }
    console.log("Opening cities: ", selectedCities);
}