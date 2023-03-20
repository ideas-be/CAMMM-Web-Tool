var cityList = ["Montreal Island", "Montreal Metropolitan Region", "Quebec City", "Trois Rivieres", "Sherbrooke", "Gatineau"];

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

function openCityTabs() {
    for (city in selectedCities) {
        window.open("./cammm_atlas.html");
    }
}