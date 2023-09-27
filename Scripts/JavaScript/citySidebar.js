/* This js file contains functions to display
stats at city level such as population, area,
density and available transit modes.
*/

function loadCitySidebar() {
    fetchGeoJson("city_sample.geojson");
    var myCityJson = readGeoJsonObj("city_sample.geojson");
    console.log("City GeoJSON: ", myCityJson);

    var citySidebarDiv = document.getElementById("myCitySidebar");

    citySidebarDiv.style.width = "300px";
    citySidebarDiv.style.padding = "20px";
    document.getElementById("myCitySidebar").style.color = "#000000";
    // document.getElementById("map").style.marginRight = "300px";
    // document.getElementById("city-stats").style.color = "#000000";
}

