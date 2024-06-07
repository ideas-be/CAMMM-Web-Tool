/* This js file contains functions to display
stats at city level such as population, area,
density and available transit modes.
*/

var myCityJson = [];

// function readCityJSON() {
//     // fetchGeoJson("city.geojson");
//     myCityJson = readGeoJsonObj("city.json");
// }

function getCityJSON(json) {
    myCityJson = json;
    console.log("City JSON is: ", myCityJson);
    // loadCitySidebar();
}

function loadCitySidebar() {
    // myCityJson = fetchGeoJson("city.json");
    // console.log("City JSON: ", myCityJson);

    var citySidebarDiv = document.getElementById("myCitySidebar");

    citySidebarDiv.style.width = "300px";
    citySidebarDiv.style.padding = "20px";
    document.getElementById("myCitySidebar").style.color = "#000000";
    // document.getElementById("map").style.marginRight = "300px";
    // document.getElementById("city-stats").style.color = "#000000";

    console.log("City Area is: ", myCityJson.Area_in_sq_km);
    insertCityStats();
    displayCityTransitModes();
}

function closeCitySidebar() {

    var citySidebarDiv = document.getElementById("myCitySidebar");

    document.getElementById("myCitySidebar").style.color = "#ffffff";
    citySidebarDiv.style.width = "0";
    citySidebarDiv.style.padding = "0";

    document.getElementById("main").style.marginRight = "0";

    // document.getElementById("myCitySidebar").innerHTML = "";
    document.getElementById("city-area").innerHTML = "Area: ";
    document.getElementById("city-population").innerHTML = "Population in mil: ";
    document.getElementById("city-density").innerHTML = "Density: ";

}

function insertCityStats() {
    document.getElementById("city-name-text").innerHTML = myCityJson.Name_en;
    var cityArea = myCityJson.Area_in_sq_km;
    document.getElementById("city-area").innerHTML += cityArea.toString() + " sq.km.";
    document.getElementById("city-population").innerHTML += myCityJson.Population_in_mil.toString();
    document.getElementById("city-density").innerHTML += myCityJson.Density.toString() + " people/sq.km.";
}

var transitIconDictionary = [
    {
        "transitType": "Tram",
        "transitIcon": "fas fa-train-tram fa-2x"
    },
    {
        "transitType": "Metro",
        "transitIcon": "fas fa-subway fa-2x"
    },
    {
        "transitType": "Rail",
        "transitIcon": "fas fa-train fa-2x"
    },
    {
        "transitType": "Bus",
        "transitIcon": "fas fa-bus fa-2x"
    },
    {
        "transitType": "Car-Sharing",
        "transitIcon": "fas fa-car fa-2x"
    },
    {
        "transitType": "Bike-sharing",
        "transitIcon": "fas fa-bicycle fa-2x"
    },
];

function displayCityTransitModes() {
    var cityTransitDiv = document.getElementById("city-transit-modes");
    var transitModeHTML = "";

    console.log("Finding available transit modes from City JSON");

    var availCityModes = [];
    for (transit in myCityJson.TransitTypesStops) {
        if (myCityJson.TransitTypesStops[transit] != 0) {
            // console.log(transit);
            availCityModes.push(transit);
        }
    }

    console.log("Available City Transit Modes are: ", availCityModes);

    for (transitMode in availCityModes) {
        for (i = 0; i < transitIconDictionary.length; i++) {
            if (availCityModes[transitMode] == transitIconDictionary[i].transitType) {
                // console.log("Matching transit type is : ", transitIconDictionary[i].transitType);
                transitModeHTML += "<div id=\"transit-mode\">" +
                    "<i class=\"" + transitIconDictionary[i].transitIcon + "\"></i>" +
                    "<div id=\"transit-mode-name\">" +
                    "<p>" + transitIconDictionary[i].transitType.toLowerCase() + "</p>" + "</div>" + "</div>";
            }
        }
    }

    console.log("Displaying City-level Available Transit Modes");

    cityTransitDiv.innerHTML = transitModeHTML;
}

function displayPopTransitRadialGraph() {
    // TODO: Write a function to display radial graph of city population distribution wrt transit nodes
}
