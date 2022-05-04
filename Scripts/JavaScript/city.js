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
    window.setTimeout(dropdownCities, 500);
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

function getSelectedCity(selectedCity, num) {
    // var citylist = "cityList" + num;
    // var selectedCity = document.getElementById(citylist).value;

    var dropBtnDivID = "dropbtn" + num;

    if (selectedCity != "Select City") {

        document.getElementById(dropBtnDivID).innerHTML = selectedCity;

        let city = new City(selectedCity, num, myJson["City"][selectedCity], 5);
        getCity(city, num);

        var mapdivId = "map" + num + "div";
        var mapdiv = document.getElementById(mapdivId);

        var mapdisplay = mapdiv.style.display;
        if (mapdisplay == 'none') {
            mapdiv.style.display = 'block';
        }

        var metricsDivId = "city" + num + "table";
        var metricsDiv = document.getElementById(metricsDivId);

        var metricsDisplay = metricsDiv.style.display;
        if (metricsDisplay == 'none') {
            metricsDiv.style.display = 'block';
        }

        var popUp3div = document.getElementsByClassName("popUp3");
        var popUp3display = popUp3div[num - 1].style.display;

        // var popUp4div = document.getElementsByClassName("popUp4");

        if (popUp3display == 'none') {
            popUp3div[num - 1].style.display = 'block';
            // popUp4div[num - 1].style.display = 'block';
        }
    }
}

function dropdownCities() {

    var nameCity, cityFlag;
    var dropDown1DivId = "dropdown1-content";
    var dropDown2DivId = "dropdown2-content";
    var dropDown1HTML = "";
    var dropDown2HTML = "";

    for (key in myJson["City"]) {
        if (myJson["City"][key].name == key) {
            nameCity = myJson["City"][key].name;
            cityFlag = myJson["City"][key].flag;
        }
        else {
            nameCity = key + " - " + myJson["City"][key].name;
            cityFlag = myJson["City"][key].flag;
        }

        dropDown1HTML += "<a href=\"#\" onclick=\"getSelectedCity(\'" + key + "\', 1);\"><img src=" + cityFlag + " width=\"20\" height=\"15\"> " + nameCity + "</a>";
        dropDown2HTML += "<a href=\"#\" onclick=\"getSelectedCity(\'" + key + "\', 2);\"><img src=" + cityFlag + " width=\"20\" height=\"15\"> " + nameCity + "</a>";
        console.log("Injecting ", nameCity, "with its flag", cityFlag);
    }

    document.getElementById(dropDown1DivId).innerHTML = dropDown1HTML;
    document.getElementById(dropDown2DivId).innerHTML = dropDown2HTML;
}




function resetCity(num) {
    // console.log("BUTTON IS PRESSED!! CITY HAS BEEN RESET!!");
    // console.log(num);
    var mapdivId = "map" + num + "div";
    var metricsDivId = "city" + num + "table";
    var dropdownID = "cityList" + num;
    // console.log(dropdownID)

    document.getElementById(mapdivId).style.display = "none";
    document.getElementById(metricsDivId).style.display = "none";
    document.getElementById(dropdownID).selectedIndex = 0;
}

function printmsg(msg) {

    switch (msg) {
        case 1: console.log("zoom in");
            break;
        case 2: console.log("zoom out");
            break;
        case 3: console.log("reset orientation");
            break;
        case 4: console.log("transfer zoom");
            break;
        case 5: console.log("transfer coordinates");
            break;
        default: console.log("whatever");
    }

}

class City {
    constructor(city, cityNum, cityJson, sliderValue) {
        this.city = city;
        this.cityNum = cityNum;
        this.cityJson = cityJson;
        this.readCityJson();
        this.injectDirectNodeToggleHTML();
        this.getDirectNodeToggle();
        this.sliderValue = sliderValue;
        this.injectCityGeneral();
        this.displayCityMetrics();
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

    loadMap() {
        const { cityNum, cityCoords, cityZoom, cityURL, ListOfLayers } = this;

        var mapContainer = "map" + cityNum;
        let map = new mapboxgl.Map({
            container: mapContainer,
            style: shortURL + cityURL,
            center: cityCoords,
            zoom: cityZoom,
        });
        this.map = map;

        //TODO: Check what this does and maybe move to another function
        var legendHTML = "";
        var legendivID = "mapLegend" + cityNum;
        document.getElementById(legendivID).innerHTML = legendHTML;
        console.log("undefined radio list and legend item");

        this.injectMapControls(); //CALLING MAP CONTROLS ON LOAD MAP
    }

    injectMapControls() {
        const { cityNum, cityCoords, cityZoom } = this;
        var iconZoomPath = ["", "Images/CustomNavigationIcons/TransferZoomLeft.png", "Images/CustomNavigationIcons/TransferZoomRight.png"];
        var iconCordPath = ["", "Images/CustomNavigationIcons/TransferCoordsLeft.png", "Images/CustomNavigationIcons/TransferCoordsRight.png"];
        var floatSide = ["right", "left"];
        console.log("Injecting map controls in HTML!!!");
        var mapControlsHTML = "<nav style=\"width: 40px; height: 180px; background-color: #d81b60; border-radius: 5px; color: white; text-align: center; float: " + floatSide[cityNum] + "; margin: 10px; z-index: 10; position: relative;\">" +
            "<div style=\"padding: 8px;\">" +
            "<span style=\"font-size: 1.5em; color: white;\">" +
            "<i class=\"fas fa-search-plus\" onclick=\"{City" + cityNum + ".zoomInMap();}\"></i></span></div>" +
            "<div style=\"padding: 8px;\">" +
            "<span style=\"font-size: 1.5em; color: white;\">" +
            "<i class=\"fas fa-search-minus\" onclick=\"{City" + cityNum + ".zoomOutMap();}\"></i></span></div>" +
            "<div style=\"padding: 8px;\">" +
            "<span style=\"font-size: 1.5em; color: white;\">" +
            "<img width=\"25\" height=\"28\" src=\"" + iconZoomPath[cityNum] + "\"onclick=\"{City" + cityNum + ".transferMapZoom();}\"></img></span></div>" +
            "<div style=\"padding: 3px;\">" +
            "<span style=\"font-size: 1.5em; color: white;\">" +
            "<img width=\"25\" height=\"28\" src=\"" + iconCordPath[cityNum] + "\"onclick=\"{City" + cityNum + ".transferMapCoords();}\"></img></span>" +
            "</div></nav>";
        var mapControlsDivID = "map" + cityNum + "controls";
        document.getElementById(mapControlsDivID).innerHTML = mapControlsHTML;
    }

    zoomInMap() {
        //get current zoom value from the mapbox and increase it by 1
        const { map } = this;

        console.log("Zooming In!!!");
        map.zoomIn();

    }

    zoomOutMap() {
        //get current zoom value from the mapbox and decrease it by 1
        const { map } = this;

        console.log("Zooming Out!!!");
        map.zoomOut();

    }

    transferMapZoom() {
        //get current zoom value for one City object map and move it to the other City object map
        const { cityNum, map } = this;
        var currentZoom = map.getZoom();
        console.log("Transfering Zoom: ", currentZoom);
        if (cityNum == 1) {
            console.log("from map 1 to map 2");
            City2.map.setZoom(currentZoom);
        }
        else {
            console.log("from map 2 to map 1");
            City1.map.setZoom(currentZoom);
        }
    }

    transferMapCoords() {
        //get current center value for one City object map and move it to the other City object map
        const { cityNum, map } = this;
        var currentCoords = map.getCenter();
        console.log("Center coords: ", currentCoords);
        if (cityNum == 1) {
            console.log("from map 1 to map 2");
            City2.map.setCenter(currentCoords);
        }
        else {
            console.log("from map 2 to map 1");
            City1.map.setCenter(currentCoords);
        }
    }

    injectDirectNodeToggleHTML() {
        const { cityNum } = this;
        console.log("Injecting toggle in HTML");
        var toggleHTML = "<p class=\"toggleText\">Individual" +
            "<label class=\"switch\" >" +
            "<input type=\"checkbox\" id=\"toggBtn" + cityNum + "\" onchange=\"City" + cityNum + ".getDirectNodeToggle();\">" +
            "<span class=\"slider round\"></span>" +
            "</label>     Cluster" +
            "</p>";
        var toggleID = "toggleCity" + cityNum;
        document.getElementById(toggleID).innerHTML = toggleHTML;
    }

    getDirectNodeToggle() {
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
        this.injectRadioButtons();
    }

    injectRadioButtons() {
        const { cityNum, ListOfLayers } = this;
        var formHTML = "";
        var NameOfQueries = ["Node Centrality", "Node Connectivity", "Transit Network Density"];
        var QueryAltText = ["How central a node is to the rest of the network", "How desirable a node is in a given trip based on network shape", "How dense the transit systems are in the grid"]
        for (const [i, value] of ListOfLayers.entries()) {
            this.value = value;
            formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "_" + cityNum + "\" value=\"" + value
                + "\" onclick=\"{City" + cityNum + ".getRadioStatus(); City" + cityNum + ".turnOffAllLayers(); City" + cityNum + ".injectCatCumulToggleHTML(); City" + cityNum + ".injectCumulSlider(); City" + cityNum + ".loadCumulativeLayers();}\">"
                + "<label for=\"" + value + "\" alt=\"" + QueryAltText[i] + "\">" + NameOfQueries[i] + "</label><br>"
        }
        var containerId = "radioForm" + cityNum;
        document.getElementById(containerId).innerHTML = formHTML;
    }

    getRadioStatus() {
        const { cityNum, ListOfLayers } = this;

        var radioList = [];
        for (const [i, val] of ListOfLayers.entries()) {
            var buttonStatus = document.getElementById(val + "_" + cityNum).checked;
            console.log("buttonStatus", i, buttonStatus);
            radioList.push(buttonStatus);
        }
        this.radioList = radioList;
        console.log("This is all the radio buttons");
        console.log(this.radioList);
    }

    injectCatCumulToggleHTML() {

        //DEFAULT: This toggle will be false on Cumulative to show all 5 layers inside map

        const { cityNum } = this;
        console.log("Injecting category/cumulative toggle in HTML");
        var toggleHTML = "<p class=\"toggleText\">All Layers" +
            "<label class=\"switch\" >" +
            "<input type=\"checkbox\" id=\"toggCatCumulBtn" + cityNum + "\" onchange= \"City" + cityNum + ".getCatCumulToggle();\">" +
            "<span class=\"slider round\"></span>" +
            "</label>     Isolate Layers" +
            "</p>";
        var toggleID = "toggleCategoryCumulative" + cityNum;
        document.getElementById(toggleID).innerHTML = toggleHTML;
    }

    getCatCumulToggle() {

        const { cityNum, cityJson } = this;
        var toggleID = "toggCatCumulBtn" + cityNum;
        var selSlider = document.getElementById(toggleID).checked;
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

    injectCumulSlider() { // NEED TO FIX THIS!!!

        //DEFAULT: For Cumul Slider, the head of the slider will be at the extreme right (highest value) to display all layers on map

        const { cityNum, radioList } = this;

        var queryNum = 0;

        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i]) {
                queryNum = i + 1;
            }
        }

        var mapLegendID = "mapLegend" + cityNum;
        var sliderHTML = "";
        sliderHTML = "<input id=\"slider" + queryNum + "\" type=\"range\" min=\"1\" max=\"5\" value=\"5\" step=\"1\" onchange =\"{City" + cityNum + ".sliderValue=this.value; City" + cityNum + ".turnOffAllLayers(); City" + cityNum + ".loadCumulativeLayers();}\">" + "<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
        console.log("Injecting the Cumulative Slider ", sliderHTML);
        document.getElementById(mapLegendID).innerHTML = sliderHTML;
    }

    injectCatSlider() {
        //refer to injectCumulSlider to make corresponding slider functionality for category layers

        const { cityNum, radioList } = this;

        var queryNum = 0;

        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i]) {
                queryNum = i + 1;
            }
        }

        var mapLegendID = "mapLegend" + cityNum;
        var sliderHTML = "";
        sliderHTML = "<input id=\"slider" + queryNum + "\" type=\"range\" min=\"1\" max=\"5\" value=\"5\" step=\"1\" onchange =\"{City" + cityNum + ".sliderValue=this.value; City" + cityNum + ".turnOffAllLayers(); City" + cityNum + ".loadCategoryLayer();}\">" + "<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
        console.log("Injecting the Category Slider", sliderHTML);
        document.getElementById(mapLegendID).innerHTML = sliderHTML;
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

    injectCityGeneral() {
        const { cityJson, cityNum } = this;
        var generalTableDiv = "general-metrics" + cityNum;

        var generalTableHTML = "<table style=\"margin-left: 20px;\">" +
            "<tr>" +
            "<td>" +
            "<div id=\"general-card\">" +
            "<table>" +
            "<tr>" +
            "<td class=\"icon\"><i class=\"fas fa-vector-square fa-2x\"></i></td>" +
            "<td class=\"info\"><h3>Area in km<sup>2</sup></h3><h4>" + cityJson["AreaSqKm"] + "</h4></td>" +
            "</tr>" +
            "</table>" +
            "</div>" +
            "</td>" +
            "<td>" +
            "<div id=\"general-card\">" +
            "<table>" +
            "<tr>" +
            "<td class=\"icon\"><i class=\"fas fa-users fa-2x\"></i></td>" +
            "<td class=\"info\"><h3>Population in million</h3><h4>" + cityJson["PopulationMillion"] + "</h4></td>" +
            "</tr>" +
            "</table>" +
            "</div>" +
            "</td>" +

            "</tr>" +
            "<tr>" +
            "<td>" +
            "<div id=\"general-card\">" +
            "<table>" +
            "<tr>" +
            "<td class=\"icon\"><i class=\"fa-solid fa-users-line fa-2x\"></i></td>" +
            "<td class=\"info\"><h3>Density in person/km<sup>2</sup></h3><h4>" + cityJson["DensityPersonSqKm"] + "</h4></td>" +
            "</tr>" +
            "</table>" +
            "</div>" +
            "</td>" +
            "<td>" +
            "<div id=\"general-card\">" +
            "<table>" +
            "<tr>" +
            "<td class=\"icon\"><i class=\"fa-solid fa-city fa-2x\"></i></td>" +
            "<td class=\"info\"><h3>Number of Boroughs</h3><h4>" + cityJson["NumBoroughs"] + "</h4></td>" +
            "</tr>" +
            "</table>" +
            "</div>" +
            "</td>" +
            "</tr>" +
            "</table>";

        document.getElementById(generalTableDiv).innerHTML = generalTableHTML;

    }

    displayCityMetrics() {
        const { city, cityNum, cityJson } = this;
        var IconList = ["fas fa-bus", "fas fa-train", "fas fa-subway", "fa-cable-car", "fas fa-taxi"];
        var StopType = ["Bus Stops", "Train Stations", "Metro Stations", "Tram Stops", "Other Stops"];
        var TransitColors = ["#f85a63ff", "#5ebea0ff", "#6379eaff", "#dd4e14ff", "#98d04eff"];

        var rowStyle = "style=\" height:25px; text-align: center; color: black;\"";
        var colStyle = "style=\"width: 45%; text-align: left; color: black; font-size: 11px;\"";

        var cityTable = "<table style=\"padding-left:25px; width:100%; \">" +
            "<tbody style=\"height:30px;\">" +
            "<tr " + rowStyle + "> <td " + colStyle + "> Statistics last updated  :      " + cityJson["YearOfStats"] +
            "</td><td " + colStyle + ">Source of GTFS :     " + "<a href={" + cityJson["SourceGTFS"] + "}>Source</a>" + " (" + cityJson["DateUpdatedGTFS"] + ")" +
            "</td></tr>" +
            "</tbody>" + "</table>";

        for (var i = 0; i < 5; i++) {
            if (cityJson["TransitSystems"][i].NumStops > 0) {
                cityTable +=
                    "<table style=\"width:40vw; margin:20px;\">" +
                    "<tbody>" +
                    "<tr style=\"height: 40px;\">" +
                    "<td style=\"width: 20%; text-align: center;\">" +
                    "<div class=\"transit-icon\" style=\"color: " + TransitColors[i] + "; \">" +
                    "<i class=\"" + IconList[i] + " fa-2x\"></i>" +
                    "</div>" +
                    "</td>" +
                    "<td style=\"width: 25%; border-right: 3px solid lightgray; padding-right: 14px;\">" +
                    "<div>" +
                    "<h4 class=\"metrics-values\">" +
                    cityJson["TransitSystems"][i].NumStops +
                    "</h4>" +
                    "<p class=\"metrics-labels\">stops</p>" +
                    "</div>" +
                    "</td>" +
                    "<td style=\"width: 25%; border-right: 3px solid lightgray; padding-right: 14px;\">" +
                    "<div>" +
                    "<h4 class=\"metrics-values\">" +
                    cityJson["TransitSystems"][i].NumLines +
                    "</h4>" +
                    "<p class=\"metrics-labels\">lines</p>" +
                    "</div>" +
                    "</td>" +
                    "<td style=\"width: 30%;\">" +
                    "<div>" +
                    "<h4 class=\"metrics-values\">" +
                    cityJson["TransitSystems"][i].AvgDisStops +
                    " m</h4>" +
                    "<p class=\"metrics-labels\">avg. distance</p>" +
                    "</div>" +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>";

            }    // Closing the if
        }          // Clossing the loop
        cityTable += "<span class=\"popUp4\" style=\"font-size: 1em; color: #d81b60; padding-left:10%; padding-bottom: 50px;\">" +
            "<i class=\"fas fa-info-circle\" onclick=\"show_popup(4);\"></i>" +
            "</span>";
        var displayCityMetricsdivID = "city" + cityNum + "table";
        document.getElementById(displayCityMetricsdivID).innerHTML = cityTable;
    }

}