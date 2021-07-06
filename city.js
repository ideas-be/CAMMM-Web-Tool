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
    var selectedCity = document.getElementById(citylist).value;

    if (selectedCity != "Select City") {

        let city = new City(selectedCity, num, myJson["City"][selectedCity], true);
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
        var popUp3display = popUp3div[num-1].style.display;

        var popUp4div = document.getElementsByClassName("popUp4");

            if (popUp3display == 'none'){
                popUp3div[num - 1].style.display = 'block';
                popUp4div[num - 1].style.display = 'block';
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

function resetCity(num){
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

class City {
    constructor(city, cityNum, cityJson, showAllCheckFlag) {
        this.city = city;
        this.cityNum = cityNum;
        this.cityJson = cityJson;
        this.showAllCheckFlag = showAllCheckFlag;
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


    loadOneLayer(){
        const {sliderValue, ListOfLayers, radioList, map} =this;

        console.log("Showing the value of sliderValue: ");
        console.log(sliderValue);
        for (let i = 0; i < radioList.length; i++) {
            var LayerInLoop="";
            if (radioList[i]) {
                for (var j = 1; j < 6; j++){
                    LayerInLoop =ListOfLayers[i]+"_"+j.toString();
                    if (j ==sliderValue) { 
                        console.log("Turning on: ", LayerInLoop);
                        map.setLayoutProperty(LayerInLoop, 'visibility', 'visible');
                        } 
                    else{ 
                        console.log("Turning off: ", LayerInLoop);
                        map.setLayoutProperty(LayerInLoop, 'visibility', 'none');
                        }
                    
                 }
            }
        }
    }

    toggleSlider(){
        const { showAllCheckFlag, cityNum, ListOfLayers, radioList, map} =this;
        console.log("Inside our toggle layer the value for showAllCheckFlag is:");
        console.log(showAllCheckFlag);
        var sliderValue=1;
        this.sliderValue =sliderValue;

        var queryNum = 0;

        for (let i = 0; i < this.radioList.length; i++) {
            if(radioList[i]){
                queryNum = i+1;
            }
        }

        var mapLegendID = "mapLegend"+cityNum;
        var legendHTML = "";

        if(!showAllCheckFlag){
            console.log("We are going to slide!!!!");

            legendHTML = "<input id=\"slider"+queryNum+"\" type=\"range\" min=\"1\" max=\"5\" value=\"1\" step=\"1\" onchange =\"{City"+cityNum+".sliderValue=this.value; City"+cityNum+".loadOneLayer();}\">"+"<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
            document.getElementById(mapLegendID).innerHTML = legendHTML;

            this.loadOneLayer();
            }
        else{
            this.loadAllLayers();
            console.log("Back to 5 categories");
            // we go back to all 5 categories
        }

    }

    loadAllLayers() {
        const { cityNum ,map, ListOfLayers, showAllCheckFlag } = this;
        var radioList = [];
        for (const [i, val] of ListOfLayers.entries()) {
            var buttonStatus = document.getElementById(val+"_"+cityNum).checked;
            console.log("buttonStatus", i, buttonStatus);
            radioList.push(buttonStatus);
        }
        this.radioList = radioList;
        console.log("This is all the radio buttons");
        console.log(this.radioList);

        var showAllDivName = "showAll" + cityNum + "Div";
        var showAllDiv = document.getElementById(showAllDivName);
        var showAllDivStyle = showAllDiv.style.display;
  
        var showAllCheckHTML = "<input type=\"checkbox\" id=\"showAll" + cityNum + "\" name=\"showAll" + cityNum + "\" checked onchange=\"{City" + cityNum + ".showAllCheckFlag = this.checked; City" + cityNum +".toggleSlider();}\"><label for=\"showAll"+cityNum+"\">Show All</label>";
        showAllDiv.innerHTML = showAllCheckHTML;

        if(showAllDivStyle == "none")
        {
            console.log("Making Show All Checkbox Visible");
            showAllDiv.style.display = "block";
        }

        for (let i = 0; i < this.radioList.length; i++) {
            var LayerInLoop="";
            if ((this.radioList[i])&&(showAllCheckFlag)) {
                for (var j = 1; j < 6; j++){
                    LayerInLoop =ListOfLayers[i]+"_"+j.toString();
                    console.log("Turning on: ", LayerInLoop);
                    map.setLayoutProperty(LayerInLoop, 'visibility', 'visible');
                }

                this.mapLegend();
            }
            else {
                for (var j = 1; j < 6; j++) {
                    LayerInLoop = ListOfLayers[i] + "_" + j.toString();
                    console.log("Turning off: ", LayerInLoop);
                    map.setLayoutProperty(LayerInLoop, 'visibility', 'none');
                }
            }
        }
    }
    
    radioButtons() {
        const { cityNum, ListOfLayers } = this;
        var formHTML = "";
        var NameOfQueries = ["Centrality Degree", "Closeness"];
        for (const [i, value] of ListOfLayers.entries()) {
            this.value = value;
            formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "_"+cityNum+"\" value=\"" + value + "\" onclick=\"{" + "City" + cityNum + ".loadAllLayers();}\">" +
                "<label for=\"" + value + "\">" + NameOfQueries[i] + "</label><br>"
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
            "<span class=\"popUp4\" style=\"font-size: 1em; color: #d81b60; display: none;\"><i class=\"fas fa-info-circle\" onclick=\"show_popup();\"></i></span>"+
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
            center: cityCoords,
            zoom: cityZoom,
        });
        this.map = map;

        this.map.on('load', function () {
            var layers = map.getStyle().layers;
            for (var i = 0; i < ListOfLayers.length; i++) {
                map.setLayoutProperty(ListOfLayers[i], 'visibility', 'none');
            }
        }

        )
        var legendHTML = "";
        var legendivID = "mapLegend" + cityNum;
        document.getElementById(legendivID).innerHTML = legendHTML;
        console.log("undefined radio list and legend item");


    }

    mapLegend() {
        const { cityNum, radioList } = this;
        console.log("This function loads the map legend");
        var legendHTML = "";
        if (typeof (radioList) != "undefined") {
            switch (radioList.indexOf(true)) {
                case 0:
                    legendHTML = "<div id=\"query1Legend\"></div>" + "<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
                    break;
                case 1:
                    legendHTML = "<div id=\"query2Legend\"></div>" + "<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
                    break;
                default:
                    legendHTML = "";
                    console.log("undefined legend item");
                    break;
            }
        }

        var legendivID = "mapLegend" + cityNum;
        document.getElementById(legendivID).innerHTML = legendHTML;
    }

}