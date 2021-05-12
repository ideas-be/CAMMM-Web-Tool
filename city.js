// let City1 = new City("Montreal", 1, myJson["City"]["Montreal"]);
// let City2 = new City("Vienna", 2, myJson["City"]["Vienna"]);
var City1, City2;
var myJson;
var shortURL = 'mapbox://styles/carmela-cucuzzella/';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybWVsYS1jdWN1enplbGxhIiwiYSI6ImNrZThua3M2djF0MmkzMnFodmlncjU1MzUifQ.kQ7CmjkzU5V5-sY7WFkzmg';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function newJson(obj) {
    myJson = obj;
    console.log("Initializing new Json obj");
    dropdownCities();
}

function getCity(city, num) {
    if (num == 1) {
        City1 = city;
        console.log("This is City 1");
        console.log(City1);
    } else if (num == 2) {
        City2 = city;
        console.log("This is City 2");
        console.log(City2);
    }
}

function getSelectedCity(num) {
    var citylist = "cityList" + num;
    var selectedCity = document.getElementById(citylist).value;

    if (selectedCity != "Select City") {

        let city = new City(selectedCity, num, myJson["City"][selectedCity]);
        getCity(city, num);
        // readCityJson(selectedCity, 2);
        // CityDataDisplay(selectedCity);

        var mapdivId = "map" + num + "div";
        var mapdiv = document.getElementById(mapdivId);

        var mapdisplay = mapdiv.style.display;
        if (mapdisplay == 'none') {
            mapdiv.style.display = 'block';
        }
    }
}

function dropdownCities() {
    var cityHTML = "<option disabled selected>Select City</option>";

    for (key in myJson["City"]) {
        cityHTML += "<option value=\"" + myJson["City"][key].name + "\">" + myJson["City"][key].name + "</option>";
    }

    document.getElementById("cityList1").innerHTML = cityHTML;
    document.getElementById("cityList2").innerHTML = cityHTML;

}

class City {
    constructor(city, cityNum, cityJson) {
        this.city = city;
        this.cityNum = cityNum;
        this.cityJson = cityJson;
        this.readCityJson();
        this.injectToggleHTML();
        this.getToggleTest();
        this.cityData();
    }
    readCityJson() {
        const { city, cityNum, cityJson } = this;
        console.log("city", city, "cityNum", cityNum);
        console.log(cityJson);

        let cityCoords = cityJson.Coords;
        let cityZoom = cityJson.Zoom;

        this.cityCoords = cityCoords;
        this.cityZoom = cityZoom;
        console.log("cityCoords", cityCoords, "cityZoom", cityZoom);
    }
    injectToggleHTML() {
        const { cityNum } = this;
        console.log("Injecting toggle in HTML");
        var toggleHTML = "<p class=\"toggleText\">Direct" +
            "<label class=\"switch\" >" +
            "<input type=\"checkbox\" id=\"toggBtn" + cityNum + "\" onchange=\"City" + cityNum + ".getToggleTest();\">" +
            "<span class=\"slider round\"></span>" +
            "</label>     Node" +
            "</p>";
        var toggleID = "toggleCity" + cityNum;
        document.getElementById(toggleID).innerHTML = toggleHTML;
    }

    getToggleTest() {
        const { cityNum, cityJson } = this;
        var toggleID = "toggBtn" + cityNum;
        var selAnalysis = document.getElementById(toggleID).checked;
        console.log("selToggle:", selAnalysis);
        let cityURL = "";
        let ListOfLayers = [];
        if (selAnalysis) {
            console.log("Loading map type: Node");
            cityURL = cityJson.NodeStyleURL;
            ListOfLayers = cityJson.NodeLayers;

        } else {
            console.log("Loading map type: Direct");
            cityURL = cityJson.DirectStyleURL;
            ListOfLayers = cityJson.DirectLayers;
        }
        this.selAnalysis = selAnalysis;
        this.cityURL = cityURL;
        this.ListOfLayers = ListOfLayers;
        this.loadMap();
        this.radioButtons();
    }

    loadLayer() {
        const { map, ListOfLayers } = this;
        var radioList = [];
        // console.log("ListOfLayers.length", ListOfLayers.length);
        for (const [i, val] of ListOfLayers.entries()) {
            // for(let i=0;i++;i<ListOfLayers.length){
            var buttonStatus = document.getElementById(val).checked;
            console.log("buttonStatus", i, buttonStatus);
            radioList.push(buttonStatus);
            // TODO Make this for loop work properly BEGIN HERE NEXT SESSION !!!!!
        }
        this.radioList = radioList;
        console.log("This is all the radio buttons");
        console.log(this.radioList);

        for (let i = 0; i < this.radioList.length; i++) {
            if (this.radioList[i]) {
                map.setLayoutProperty(ListOfLayers[i], 'visibility', 'visible');
                console.log("Turning on: ", ListOfLayers[i]);
                this.mapLegend();
            }
            else {
                map.setLayoutProperty(ListOfLayers[i], 'visibility', 'none');
                console.log("Turning off: ", ListOfLayers[i]);
            }
        }
    }

    radioButtons() {
        const { cityNum, ListOfLayers } = this;
        var formHTML = "";
        var NameOfQueries = ["Centrality Degree", "Closeness"];
        for (const [i, value] of ListOfLayers.entries()) {
            this.value = value;
            formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "\" value=\"" + value + "\" onclick=\"" + "City" + cityNum + ".loadLayer();" + "\">" +
                "<label for=\"" + value + "\">" + NameOfQueries[i] + "</label>"
        }
        var containerId = "radioForm" + cityNum;
        document.getElementById(containerId).innerHTML = formHTML;
    }
    cityData() {
        const { city, cityNum, cityJson } = this;
        var cityContainer = "";
        cityContainer =
            "<table class = \"table-contents\">" +
            "<tr>" +
            "<td>City " + cityNum + "</td>" +
            "<td>:</td>" +
            "<td>" + city + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Number of Transport Systems</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.NumTransportSystem + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Number of Bus Stops</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.NumBusStops + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Number of Rail Stations</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.NumRailStations + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Number of Metro Stations</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.NumMetroStations + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Number of Boroughs</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.NumBoroughs + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Area in sq. km.</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.AreaSqKm + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Population in million</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.PopulationMillion + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Density per sq. km.</td>" +
            "<td>:</td>" +
            "<td>" + cityJson.DensityPersonSqKm + "</td>" +
            "</tr>" +
            "</table>";
        var citydatadivID = "city" + cityNum + "table";
        document.getElementById(citydatadivID).innerHTML = cityContainer;

    }
    loadMap() {
        const { cityNum, cityCoords, cityZoom, cityURL, ListOfLayers } = this;

        var mapContainer = "map" + cityNum;
        let map = new mapboxgl.Map({
            container: mapContainer,
            style: shortURL + cityURL,
            center: cityCoords, //need to make global
            // center: [-71.26, 46.78],
            zoom: cityZoom,
            // zoom: 10.0
        });
        this.map = map;

        this.map.on('load', function () {
            var layers = map.getStyle().layers;
            // console.log("Layers on load", layers);
            // // Find the index of the first symbol layer in the map style
            // var firstSymbolId;
            for (var i = 0; i < ListOfLayers.length; i++) {
                map.setLayoutProperty(ListOfLayers[i], 'visibility', 'none');
            }
        }

        )
    }

    mapLegend() {
        const { cityNum } = this;
        console.log("This function loads the map legend");
        var legendHTML = "";
        legendHTML = "<div style=\"width: 50px; height:6px; background-image: linear-gradient(to right, #D1ECCB, #006127);\"></div>";
        var legendivID = "mapLegend" + cityNum;
        document.getElementById(legendivID).innerHTML = legendHTML;
    }

}


// loadLayer(){
//     const{value, map} =this;
//     let currentButton = document.getElementById(value).checked;
//     let prevLayer = currentLayer;
//     // set up the corresponding toggle button for each layer

//     var visibility = map.getLayoutProperty(currentLayer, 'visibility');

//     // toggle layer visibility by changing the layout object's visibility property
//     if (visibility === 'visible') {
//         map.setLayoutProperty(currentLayer, 'visibility', 'none');
//         console.log(currentLayer+ " turned off");
//         map.setLayoutProperty(prevLayer, 'visibility', 'visible');
//         } else {
//             map.setLayoutProperty(currentLayer, 'visibility', 'visible');
//             console.log(currentLayer+" turned on");
//             map.setLayoutProperty(prevLayer, 'visibility', 'none');
//             }

//     prevLayer = currentLayer;

// }