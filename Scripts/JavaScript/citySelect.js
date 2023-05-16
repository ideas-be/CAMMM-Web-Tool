var city = [
    {
        cityName: "Montreal Island",
        cityURL: "./atlas_montreal_island.html"
    },
    {
        cityName: "Montreal Metropolitan Region",
        cityURL: "./atlas_montreal_metropolitan_region.html"
    },
    {
        cityName: "Quebec City",
        cityURL: "./atlas_quebec_city.html"
    },
    {
        cityName: "Trois Rivieres",
        cityURL: "./atlas_trois_rivieres.html"
    },
    {
        cityName: "Gatineau",
        cityURL: "./atlas_gatineau.html"
    }
];

// var selectedCity = '';

var selectedCities = [];

var filterNumber = 0;

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
            if (city[cityObj].cityName == selectedCity) {
                window.open(city[cityObj].cityURL);
            }
        }
    }
    console.log("Opening cities: ", selectedCities);
}