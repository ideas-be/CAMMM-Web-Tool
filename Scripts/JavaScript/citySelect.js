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

function addCity(selCity) {
    if (selectedCities.includes(selCity)) {
        var index = selectedCities.indexOf(selCity);
        selectedCities.splice(index, 1);
    } else {
        console.log("Adding City!!!");
        selectedCities.push(selCity);
    }
}

function openCityTabs() {
    for (selCity in selectedCities) {
        var selectedCity = selectedCities[selCity];
        console.log("Selected City: ", selectedCity);
        for (cityObj in city) {
            if (city[cityObj].cityName == selectedCity) {
                window.open(city[cityObj].cityURL);
            }
        }
    }
    console.log("Opening cities: ", selectedCities);
}