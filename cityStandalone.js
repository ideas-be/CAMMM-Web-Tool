var City;
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
    window.setTimeout(dropdownCities, 500);
}

function getCity(city) {
    City = city;
    console.log("This is City");
    console.log(City);
}

function getSelectedCity() {
    var selectedCity = document.getElementById("cityList").value;

    if (selectedCity != "Select City") {

        let city = new City(selectedCity, myJson["City"][selectedCity], 5);
        getCity(city);

        var mapdiv = document.getElementById("mapdiv");

        var mapdisplay = mapdiv.style.display;
        if (mapdisplay == 'none') {
            mapdiv.style.display = 'block';
        }

        var metricsDiv = document.getElementById("citytable");

        var metricsDisplay = metricsDiv.style.display;
        if (metricsDisplay == 'none') {
            metricsDiv.style.display = 'block';
        }

        var popUp3div = document.getElementsByClassName("popUp3");
        var popUp3display = popUp3div[num - 1].style.display;

        if (popUp3display == 'none') {
            popUp3div[num - 1].style.display = 'block';
        }
    }
}

function dropdownCities() {
    var cityHTML = "<option disabled selected>Select City</option>";
    var nameCity = "";

    for (key in myJson["City"]) {
        if (myJson["City"][key].name == key) {
            nameCity = myJson["City"][key].name;
        }
        else {
            nameCity = key + " - " + myJson["City"][key].name;
        }
        cityHTML += "<option value=\"" + key + "\">" + nameCity + "</option>";
    }

    document.getElementById("cityList").innerHTML = cityHTML;

}

function resetCity() {

    document.getElementById("mapdiv").style.display = "none";
    document.getElementById("citytable").style.display = "none";
    document.getElementById("cityList").selectedIndex = 0;
}

class City {
    constructor(city, cityJson, sliderValue) {
        this.city = city;
        this.cityJson = cityJson;
        this.readCityJson();
        this.injectDirectNodeToggleHTML();
        this.getDirectNodeToggle();
        this.sliderValue = sliderValue;
        this.displayCityMetrics();
    }
    readCityJson() {
        const { city, cityJson } = this;
        console.log("city", city);
        console.log(cityJson);

        let cityCoords = cityJson.Coords;
        let cityZoom = cityJson.Zoom;

        this.cityCoords = cityCoords;
        this.cityZoom = cityZoom;
        console.log("cityCoords", cityCoords, "cityZoom", cityZoom);
    }

    loadMap() {
        const { cityCoords, cityZoom, cityURL } = this;

        var mapContainer = "map";
        let map = new mapboxgl.Map({
            container: mapContainer,
            style: shortURL + cityURL,
            center: cityCoords,
            zoom: cityZoom,
        });
        this.map = map;

        //TODO: Check what this does and maybe move to another function
        var legendHTML = "";
        document.getElementById("mapLegend").innerHTML = legendHTML;
        console.log("undefined radio list and legend item");
    }

    injectDirectNodeToggleHTML() {
        console.log("Injecting toggle in HTML");
        var toggleHTML = "<p class=\"toggleText\">Individual" +
            "<label class=\"switch\" >" +
            "<input type=\"checkbox\" id=\"toggBtn\" onchange=\"City.getDirectNodeToggle();\">" +
            "<span class=\"slider round\"></span>" +
            "</label>     Cluster" +
            "</p>";
        document.getElementById("toggleCity").innerHTML = toggleHTML;
    }

    getDirectNodeToggle() {
        const { cityJson } = this;
        var selAnalysis = document.getElementById("toggBtn").checked;
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
        this.injectRadioButtons();
    }

    injectRadioButtons() {
        const { ListOfLayers } = this;
        var formHTML = "";
        var NameOfQueries = ["Centrality Degree", "Closeness"];
        for (const [i, value] of ListOfLayers.entries()) {
            this.value = value;
            formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "\" value=\"" + value
                + "\" onclick=\"{City.getRadioStatus(); City.turnOffAllLayers(); City.injectCatCumulToggleHTML(); City.injectCumulSlider(); City.loadCumulativeLayers();}\">"
                + "<label for=\"" + value + "\">" + NameOfQueries[i] + "</label><br>"
        }
        document.getElementById("radioForm").innerHTML = formHTML;
    }

    getRadioStatus() {
        const { ListOfLayers } = this;

        var radioList = [];
        for (const [i, val] of ListOfLayers.entries()) {
            var buttonStatus = document.getElementById(val).checked;
            console.log("buttonStatus", i, buttonStatus);
            radioList.push(buttonStatus);
        }
        this.radioList = radioList;
        console.log("This is all the radio buttons");
        console.log(this.radioList);
    }

    injectCatCumulToggleHTML() {

        //DEFAULT: This toggle will be false on Cumulative to show all 5 layers inside map

        console.log("Injecting category/cumulative toggle in HTML");
        var toggleHTML = "<p class=\"toggleText\">Stacked" +
            "<label class=\"switch\" >" +
            "<input type=\"checkbox\" id=\"toggCatCumulBtn\" onchange= \"City.getCatCumulToggle();\">" +
            "<span class=\"slider round\"></span>" +
            "</label>     Single" +
            "</p>";
        document.getElementById("toggleCategoryCumulative").innerHTML = toggleHTML;
    }

    getCatCumulToggle() {
        var selSlider = document.getElementById("toggCatCumulBtn").checked;
        console.log("Selected slider for Category/Cumulative: ", selSlider);

        if (selSlider) {
            // Switch Slider Function to Category
            this.turnOffAllLayers();
            console.log("Checking when the toggle is changed before calling injectCatSlider");
            this.injectCatSlider();
            console.log("Calling LoadCatLayers function");
            this.loadCategoryLayer();
        }
        else {
            // Switch Slider Function to Cumulative
            console.log("Checking when the toggle is changed before calling injectCumulSlider");
            this.injectCumulSlider();
            console.log("Calling LoadCumulativeLayers function");
            this.loadCumulativeLayers();
        }
        this.catCumulValue = catCumulValue;
    }

    injectCumulSlider() {

        //DEFAULT: For Cumul Slider, the head of the slider will be at the extreme right (highest value) to display all layers on map

        const { radioList } = this;

        var queryNum = 0;

        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i]) {
                queryNum = i + 1;
            }
        }

        var sliderHTML = "";
        sliderHTML = "<input id=\"slider" + queryNum + "\" type=\"range\" min=\"1\" max=\"5\" value=\"5\" step=\"1\" onchange =\"{City.sliderValue=this.value; City.turnOffAllLayers(); City.loadCumulativeLayers();}\">" + "<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
        console.log("Injecting the Cumulative Slider ", sliderHTML);
        document.getElementById("mapLegend").innerHTML = sliderHTML;
    }

    injectCatSlider() {
        //refer to injectCumulSlider to make corresponding slider functionality for category layers

        const { radioList } = this;

        var queryNum = 0;

        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i]) {
                queryNum = i + 1;
            }
        }

        var sliderHTML = "";
        sliderHTML = "<input id=\"slider" + queryNum + "\" type=\"range\" min=\"1\" max=\"5\" value=\"5\" step=\"1\" onchange =\"{City.sliderValue=this.value; City.turnOffAllLayers(); City.loadCategoryLayer();}\">" + "<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
        console.log("Injecting the Category Slider", sliderHTML);
        document.getElementById("mapLegend").innerHTML = sliderHTML;
    }

    turnOffAllLayers() {
        const { map, ListOfLayers, radioList } = this;
        for (let i = 0; i < radioList.length; i++) {
            if (typeof (ListOfLayers[i]) == "string") {
                for (var j = 1; j < 6; j++) {
                    var LayerInLoop = ListOfLayers[i] + "_" + j.toString();
                    console.log("Turning off: ", LayerInLoop);
                    map.setLayoutProperty(LayerInLoop, 'visibility', 'none');
                }
            }
            else {
                for (var transit in ListOfLayers[i]) {
                    console.log("transit layer", ListOfLayers[i][transit]);
                    for (var j = 1; j <= 5; j++) {
                        LayerInLoop = ListOfLayers[i][transit] + "_" + j.toString();
                        console.log("Turning off: ", LayerInLoop);
                        map.setLayoutProperty(LayerInLoop, 'visibility', 'none');
                    }
                }
            }

        }
    }

    loadCumulativeLayers() {
        const { map, ListOfLayers, radioList, sliderValue } = this;
        for (let i = 0; i < radioList.length; i++) {
            if (typeof (ListOfLayers[i]) == "string") {
                var LayerInLoop = "";
                if (radioList[i]) {
                    for (var j = 1; j <= sliderValue; j++) {
                        LayerInLoop = ListOfLayers[i] + "_" + j.toString();
                        console.log("Turning on $LayerInLoop until slider value of $sliderValue");
                        map.setLayoutProperty(LayerInLoop, 'visibility', 'visible');
                    }
                }
            }
            else {
                var LayerInLoop = "";
                for (var transit in ListOfLayers[i]) {
                    if (radioList[i]) {
                        console.log("transit layer", ListOfLayers[i][transit]);
                        for (var j = 1; j <= sliderValue; j++) {
                            LayerInLoop = ListOfLayers[i][transit] + "_" + j.toString();
                            console.log("Turning on $LayerInLoop until slider value of $sliderValue");
                            map.setLayoutProperty(LayerInLoop, 'visibility', 'visible');
                        }
                    }
                }
            }
        }
    }


    loadCategoryLayer() {
        const { sliderValue, ListOfLayers, radioList, map } = this;
        console.log("Showing the value of sliderValue: ");
        console.log(sliderValue);
        for (let i = 0; i < radioList.length; i++) {
            if (typeof (ListOfLayers[i]) == "string") {

                var LayerInLoop = "";
                if (radioList[i]) {
                    for (var j = 1; j < 6; j++) {
                        LayerInLoop = ListOfLayers[i] + "_" + j.toString();
                        if (j == sliderValue) {
                            console.log("Turning on: ", LayerInLoop);
                            map.setLayoutProperty(LayerInLoop, 'visibility', 'visible');
                        }
                    }
                }
            }
            else {
                var LayerInLoop = "";
                for (var transit in ListOfLayers[i]) {
                    if (radioList[i]) {
                        for (var j = 1; j < 6; j++) {
                            LayerInLoop = ListOfLayers[i][transit] + "_" + j.toString();
                            if (j == sliderValue) {
                                console.log("Turning on: ", LayerInLoop);
                                map.setLayoutProperty(LayerInLoop, 'visibility', 'visible');
                            }
                        }
                    }
                }
            }
        }
    }

    displayCityMetrics() {
        const { cityJson } = this;
        var IconList = ["fas fa-bus", "fas fa-train", "fas fa-subway", "fas fa-tram", "fas fa-taxi"];
        var StopType = ["Bus Stops", "Train Stations", "Metro Stations", "Tram Stops", "Other Stops"];
        var TransitColors = ["#f85a63ff", "#5ebea0ff", "#6379eaff", "#dd4e14ff", "#98d04eff"];

        var rowStyle = "style=\"width:80%; height:25px; text-align: center; color: black;\"";
        var labelColStyle = "style=\"width: 65%; text-align: right; color: black; font-size: 11px;\"";
        var colonColStyle = "style=\"width: 5%; text-align: center; color: black; font-size: 11px;\"";
        var valueColStyle = "style=\"width: 30%; text-align: center; color: black; font-size: 11px;\"";

        var cityTable = "<table style=\"padding-bottom: 20px; padding-left:25%;\">" +
            "<tbody style=\"width:600px; height:75px;\">" +
            "<tr " + rowStyle + ">" +
            "<td " + labelColStyle + ">Area (Sq Km)</td>" +
            "<td " + colonColStyle + ">:</td>" +
            "<td " + valueColStyle + ">" + cityJson["AreaSqKm"] + "</td>" +
            "</tr>" +
            "<tr " + rowStyle + ">" +
            "<td " + labelColStyle + ">Population (Million)</td>" +
            "<td " + colonColStyle + ">:</td>" +
            "<td " + valueColStyle + ">" + cityJson["PopulationMillion"] + "</td>" +
            "</tr>" +
            "<tr " + rowStyle + ">" +
            "<td " + labelColStyle + ">Density (Person/SqKm)</td>" +
            "<td " + colonColStyle + ">:</td>" +
            "<td " + valueColStyle + ">" + cityJson["DensityPersonSqKm"] + "</td>" +
            "</tr>" +
            "<tr " + rowStyle + ">" +
            "<td " + labelColStyle + ">Number of Boroughs </td>" +
            "<td " + colonColStyle + ">:</td>" +
            "<td " + valueColStyle + ">" + cityJson["NumBoroughs"] + "</td>" +
            "</tr>" +
            "<tr " + rowStyle + ">" +
            "<td " + labelColStyle + ">Statistics last updated</td>" +
            "<td " + colonColStyle + ">:</td>" +
            "<td " + valueColStyle + ">" + cityJson["YearOfStats"] + "</td>" +
            "</tr>" +
            "<tr " + rowStyle + ">" +
            "<td " + labelColStyle + ">Source of GTFS </td>" +
            "<td " + colonColStyle + ">:</td>" +
            "<td " + valueColStyle + ">" + "<a href={" + cityJson["SourceGTFS"] + "}>Source</a>" + " (" + cityJson["DateUpdatedGTFS"] + ")" + "</td>" +
            "</tr>" +
            "</tbody>" + "</table>";

        //TODO: WORK ON THE FRICKIN CITY METRICS 2.0 !!!
        for (var i = 0; i < 5; i++) {
            if (cityJson["TransitSystems"][i].NumStops > 0) {
                cityTable += "<table style=\"padding-bottom: 20px; padding-left:10%;\">" +
                    "<tbody style=\"width:600px; height:75px;\">" +
                    "<tr>" +
                    "<td style=\"width: 75px; height:75px; text-align: right; color: " + TransitColors[i] + ";\">" +
                    "<i class=\"" + IconList[i] + " fa-3x\"></i>" +
                    "</td>" +
                    "<td style=\"width: 268px; height:75px; text-align: center; color: black;\">" +
                    "<table style=\"width: 268px; height:75px; text-align: center; color: black;\">" +
                    "<tbody>" +
                    "<tr style=\"width:80%; height:25px; text-align: center; color: black;\">" +
                    "<td style=\"width: 65%; text-align: right; color: black; font-size: 11px;\">" +
                    "Number of " + StopType[i] +
                    "</td>" +
                    "<td style=\"width: 5%; text-align: center; color: black; font-size: 11px;\">:</td>" +
                    "<td style=\"width: 30%; text-align: center; color: black; font-size: 11px;\">" +
                    cityJson["TransitSystems"][i].NumStops +
                    "</td>" +
                    "</tr>" +
                    "<tr style=\"width:80%; height:25px; text-align: center; color: black;\">" +
                    "<td style=\"width: 65%; text-align: right; color: black; font-size: 11px;\">" +
                    "Number of Lines" +
                    "</td>" +
                    "<td style=\"width: 5%; text-align: center; color: black; font-size: 11px;\">:</td>" +
                    "<td style=\"width: 30%; text-align: center; color: black; font-size: 11px;\">" +
                    cityJson["TransitSystems"][i].NumLines +
                    "</td>" +
                    "</tr>" +
                    "<tr style=\"width:80%; height:25px; text-align: center; color: black;\">" +
                    "<td style=\"width: 65%; text-align: right; color: black; font-size: 11px;\">" +
                    "Average distance between " + StopType[i] +
                    "</td>" +
                    "<td style=\"width: 5%; text-align: center; color: black; font-size: 11px;\">:</td>" +
                    "<td style=\"width: 30%; text-align: center; color: black; font-size: 11px;\">" +
                    cityJson["TransitSystems"][i].AvgDisStops +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>";
            }    // Closing the if
        }          // Clossing the loop
        cityTable += "<span class=\"popUp3\" style=\"font-size: 1em; color: #d81b60; padding-left:10%; padding-bottom: 50px;\">" +
            "<i class=\"fas fa-info-circle\" onclick=\"show_popup(4);\"></i>" +
            "</span>";
        document.getElementById("citytable").innerHTML = cityTable;
    }

}