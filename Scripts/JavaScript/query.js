function queryDropDown() {
    var queryList = ["Multimodality", "Diversity of Services and Amenities", "Closeness of Services and Amenities", "Accessibility", "Greenery", "Walkability", "Connectivity"];
    var dropDownDiv = document.getElementById("dropdown-content");
    var dropDownHTML = "";

    for (i = 0; i < queryList.length; i++) {
        // console.log(queryList[i]);
        dropDownHTML += "<a href=\"#\" onclick=\"getSelectedQuery(\'" + queryList[i] + "\');\">" + queryList[i] + "</a>";
    }

    dropDownDiv.innerHTML += dropDownHTML;
}

var selectedQuery = "Select Query";
// displayQueryRating(8);

function getSelectedQuery(queryName) {
    selectedQuery = queryName;
    document.getElementById("dropbtn").innerHTML = selectedQuery + "<i class=\"fas fa-chevron-down\"></i>";
    if (selectedQuery == "Diversity of Services and Amenities") {
        document.getElementById("query-name").innerHTML = "Diversity rating:";
    } else if (selectedQuery == "Closeness of Services and Amenities") {
        document.getElementById("query-name").innerHTML = "Closeness rating:";
    } else {
        document.getElementById("query-name").innerHTML = selectedQuery + " rating:";
    }
    callQueryCalFunc();

}

function callQueryCalFunc() {

    console.log("Running Query Function Calls with Switch Case");

    switch (selectedQuery) {
        case "Select Query": console.log("Please select the query");
            break;
        case "Multimodality":
            fetchGeoJson("city.geojson");
            displayLines();
            setTimeout(calMultiModality, 200);
            break;
        case "Accessibility": console.log("Accessibility");
            break;
        case "Diversity of Services and Amenities":
            fetchGeoJson("services.geojson");
            setTimeout(calDiversityServices, 200);
            break;
        case "Closeness of Services and Amenities":
            fetchGeoJson("services.geojson");
            setTimeout(calClosenessServices, 200);
            break;
        case "Greenery": console.log("Greenery");
            break;
        case "Walkability": console.log("Walkability");
            break;
        case "Connectivity": console.log("Connectivity");
            break;
        default: console.log("missing query");
    }

}


