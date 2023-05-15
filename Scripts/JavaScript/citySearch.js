var cityList = ["Montreal Island", "Montreal Metropolitan Region", "Quebec City", "Trois Rivieres", "Gatineau"];
var cityMapURLList = ["./atlas_montreal_island.html", "./atlas_montreal_metropolitan_region.html", "./atlas_quebec_city.html", "./atlas_trois_rivieres.html", "./atlas_gatineau.html"];

var selectedCity = '';

var selectedCities = [];

var filterNumber = 0;

function addCity() {
    console.log("Adding City!!!");
    var searchBarInput = document.getElementsByClassName("city-search-input")[0].value;
    console.log(searchBarInput);
    insertCityFilter(searchBarInput);
    selectedCities.push(searchBarInput);
}

function insertCityFilter(cityName) {
    // cityList.push(cityName);

    filterNumber++;

    var cityFiltersDiv = document.getElementById("city-filters");
    var cityFiltersHTML = "<span class=\"city-filter\" id=\"" + cityName.toLowerCase() + "\"><a class=\"city-filter-btn\">" + cityName + "</a><i class=\"fas fa-close\" onclick=\"removeCity(" + filterNumber + ");\"></i></span>";
    cityFiltersDiv.innerHTML += cityFiltersHTML;
}

function removeCity(filterNum) {

    var cityToRemove = cityList[filterNum - 1];

    var index = selectedCities.indexOf(cityToRemove);

    console.log("Removing city: ", cityToRemove);
    // cityList.splice(filterNum - 1, 1);
    // console.log("New city list: ", cityList);
    selectedCities.splice(index, 1);

    document.getElementById(cityToRemove.toLowerCase()).remove();
}

// function openCityTabs() {
//     for (city in selectedCities) {
//         var index = cityList.indexOf(selectedCities[city]);
//         console.log("index of selected city: ", index);
//         window.open(cityMapURLList[index]);
//     }
// }

function openSelectedCityTab(selCity) {
    selectedCity = selCity;
    for (city in cityList) {
        if (selectedCity == cityList[city]) {
            window.open(cityMapURLList[city]);
        }
    }
}