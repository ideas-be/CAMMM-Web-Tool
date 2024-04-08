var flag = 0;
var queryDictionary = [
    // {
    //     title: "Demographics",
    //     definition: "The population pyramids on a borough level based on gender and age."
    // },
    {
        title: "Multimodality",
        definition: "The number of alternative public transport options available at a given node."
    },
    {
        title: "Diversity of Services and Amenities",
        definition: "The different types of services available-primary, secondary, tertiary-and their respective categories (store, food, finance, etc.)."
    },
    {
        title: "Closeness of Services and Amenities",
        definition: "The closeness of the services and amenities focuses on the geographical distribution of the categories."
    },
    {
        title: "Universal Design & Accessibility",
        definition: "The comparison of the number of bus/tram stops and if applicable stations declared with facilities that allow access to wheelchairs."
    },
    {
        title: "Transit Connectivity",
        definition: "The mathematical abstraction of the transit network that represents each of the point of access as nodes building up the network."
    },
    {
        title: "Greenery",
        definition: "The observed level of natural vegetation around the transit nodes."
    }
];

function queryDropDown() {
    // var queryList = ["Multimodality", "Diversity of Services and Amenities", "Closeness of Services and Amenities", "Universal Design & Accessibility", "Transit Connectivity"
    //     // , "Greenery", "Walkability"
    // ];
    var dropDownDiv = document.getElementById("dropdown-content");
    var dropDownHTML = "";

    for (i = 0; i < queryDictionary.length; i++) {
        // console.log(queryList[i]);
        dropDownHTML += "<a href=\"#\" onclick=\"getSelectedQuery(\'" + queryDictionary[i].title + "\');\">" + queryDictionary[i].title + "</a>";
        // console.log("Query inserted in the dropdown is: ", queryDictionary[i].title);
        // console.log("Query definition is: ", queryDictionary[i].definition);
    }

    dropDownDiv.innerHTML += dropDownHTML;
    insertQueryInfoButton();
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

function insertQueryInfoButton() {
    var queryDropdownDiv = document.getElementById("query-dropdown");
    var boroughQueryDropdownDiv = document.getElementById("borough-query-dropdown");

    var infoButtonHTML = "<span id=\"query-info-button\" style=\"font-size: 1em; color: #d81b60;\">" +
        "<i class=\"fas fa-info-circle\" onclick=\"showQueryDefinition();\"></i></span>";

    queryDropdownDiv.innerHTML += infoButtonHTML;
    boroughQueryDropdownDiv.innerHTML += infoButtonHTML;
    // console.log("Info Button HTML is: ", infoButtonHTML);
    // console.log("Query Dropdown HTML contains: ", queryDropdownDiv.innerHTML);
    // console.log("Borough Query Dropdown HTML contains: ", boroughQueryDropdownDiv.innerHTML);

}

function showQueryDefinition() {

    var queryDefinitionDiv = document.getElementById("query-definition");
    var boroughQueryDefinitionDiv = document.getElementById("borough-query-definition");
    if (flag == 0) {
        for (i = 0; i < queryDictionary.length; i++) {
            if (selectedQuery == queryDictionary[i].title) {
                queryDefinitionDiv.innerHTML = "<p>" + queryDictionary[i].definition + "</p>";
                boroughQueryDefinitionDiv.innerHTML = "<p>" + queryDictionary[i].definition + "</p>";
                flag = 1;
            }
        }
    } else if (flag == 1) {
        queryDefinitionDiv.innerHTML = "";
        boroughQueryDefinitionDiv.innerHTML = "";
        flag = 0;
    }

}

function callQueryCalFunc() {

    console.log("Running Query Function Calls with Switch Case");

    switch (selectedQuery) {
        case "Select Query": console.log("Please select the query");
            break;
        case "Multimodality":
            // fetchGeoJson("city.geojson");
            // fetchGeoJson("Lines.geojson");
            // myLinesJson = fetchGeoJson("Lines.geojson");
            setTimeout(displayLines, 300);
            break;
        case "Universal Design & Accessibility":
            // fetchGeoJson("city.geojson");
            setTimeout(calAccessibility, 200);
            break;
        case "Diversity of Services and Amenities":
            // fetchGeoJson("services.geojson");
            fetchGeoJson("category_services.geojson");
            setTimeout(calDiversityServices, 200);
            break;
        case "Closeness of Services and Amenities":
            fetchGeoJson("services.geojson");
            fetchGeoJson("category_services.geojson");
            setTimeout(calClosenessServices, 200);
            break;
        case "Greenery": console.log("Greenery");
            break;
        case "Walkability": console.log("Walkability");
            break;
        case "Transit Connectivity":
            fetchGeoJson("connectivity.geojson");
            setTimeout(calConnectivity, 200);
            break;
        default: console.log("missing query");
    }

}

function displayQueryRating(ratingValue) {

    console.log("Calculating query rating!!");

    var ratingWord = "";
    if ((ratingValue >= 2) && (ratingValue < 5)) {
        ratingWord = "Needs to Improve";
    } else if ((ratingValue >= 5) && (ratingValue < 7)) {
        ratingWord = "Good";
    } else if ((ratingValue >= 7) && (ratingValue < 9)) {
        ratingWord = "Very Good";
    } else if ((ratingValue > 9)) {
        ratingWord = "Excellent";
    }

    var queryRatingDiv = document.getElementById("query-rating");
    var ratingHTML = "<span class=\"rating-value\">" + ratingValue + "</span><span style=\"color: #d81b60;\">/10\n</span><span class=\"rating-words\">" + ratingWord + "</span><div><progress id=\"rating-bar\" value=\"" + ratingValue * 10 + "\" max=\"100\"> 32% </progress></div>";
    queryRatingDiv.innerHTML = ratingHTML;
}
