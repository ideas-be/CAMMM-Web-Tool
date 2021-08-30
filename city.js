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

function getSelectedCity(num) {
    var citylist = "cityList" + num;
    var selectedCity = document.getElementById(citylist).value;

    if (selectedCity != "Select City") {

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
        var popUp3display = popUp3div[num-1].style.display;

        // var popUp4div = document.getElementsByClassName("popUp4");

            if (popUp3display == 'none'){
                popUp3div[num - 1].style.display = 'block';
                // popUp4div[num - 1].style.display = 'block';
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
    constructor(city, cityNum, cityJson, sliderValue) {
        this.city = city;
        this.cityNum = cityNum;
        this.cityJson = cityJson;
        this.readCityJson();
        this.injectDirectNodeToggleHTML();
        this.injectCatCumulToggleHTML();
        this.getDirectNodeToggle();
        this.sliderValue = sliderValue;
        // this.injectCumulSlider();
        // this.displayCityMetrics();
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
    }
    
    injectDirectNodeToggleHTML() {
        const { cityNum } = this;
        console.log("Injecting toggle in HTML");
        var toggleHTML = "<p class=\"toggleText\">Direct" +
        "<label class=\"switch\" >" +
        "<input type=\"checkbox\" id=\"toggBtn" + cityNum + "\" onchange=\"City" + cityNum + ".getDirectNodeToggle();\">" +
        "<span class=\"slider round\"></span>" +
        "</label>     Node" +
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

    injectRadioButtons() { //TODO: Check this function for breakage
        const { cityNum, ListOfLayers } = this;
        var formHTML = "";
        var NameOfQueries = ["Centrality Degree", "Closeness"];
        for (const [i, value] of ListOfLayers.entries()) {
            this.value = value;
            formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "_" + cityNum + "\" value=\"" + value + "\" onclick=\"{City" + cityNum + ".getRadioStatus(); City" + cityNum + ".injectCatCumulToggleHTML(); \">" 
            +
                "<label for=\"" + value + "\">" + NameOfQueries[i] + "</label><br>"
        }
        var containerId = "radioForm" + cityNum;
        document.getElementById(containerId).innerHTML = formHTML;
    }

    getRadioStatus(){
        const { cityNum } = this;

        var radioList = [];
        for (const [i, val] of ListOfLayers.entries()) {
            var buttonStatus = document.getElementById(val+"_"+cityNum).checked;
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
        var toggleHTML = "<p class=\"toggleText\">Cumulative" +
            "<label class=\"switch\" >" +
            "<input type=\"checkbox\" id=\"toggCatCumulBtn" + cityNum + "\" onchange= \"City" + cityNum + ".getCatCumulToggle();\">"+
            "<span class=\"slider round\"></span>" +
            "</label>     Category" +
            "</p>";
        var toggleID = "toggleCategoryCumulative" + cityNum;
        document.getElementById(toggleID).innerHTML = toggleHTML;
    }

    getCatCumulToggle(){

        const { cityNum, cityJson } = this;
        var toggleID = "toggCatCumulBtn" + cityNum;
        var selSlider = document.getElementById(toggleID).checked;
        console.log("Selected slider for Category/Cumulative: ",selSlider);

        if(selSlider){
            // Switch Slider Function to Category
            this.loadCategoryLayer();
        }
        else{
            // Switch Slider Function to Cumulative
            console.log("Checking when the toggle is changed before calling injectCumulSlider");
            this.injectCumulSlider();
            console.log("Calling LoadCumulativeLayers function");
            this.loadCumulativeLayers();
        }
        this.catCumulValue = catCumulValue;
    }

    injectCumulSlider(){ // NEED TO FIX THIS!!!

        //DEFAULT: For Cumul Slider, the head of the slider will be at the extreme right (highest value) to display all layers on map

        const { cityNum, radioList } = this;

        var queryNum = 0;

        for (let i = 0; i < radioList.length; i++) {
            if(radioList[i]){
                queryNum = i+1;
            }
        }

        var mapLegendID = "mapLegend" + cityNum;
        var sliderHTML = "";
        sliderHTML = "<input id=\"slider" + queryNum + "\" type=\"range\" min=\"1\" max=\"5\" value=\"5\" step=\"1\" onchange =\"{City" + cityNum + ".sliderValue=this.value; City" + cityNum + ".turnOffAllLayers(); City" + cityNum +".loadCumulativeLayers();}\">" + "<p style=\"word-spacing:70px; font-size:10px; display:'block';\">Less More</p>";
        console.log("Injecting the Slider",sliderHTML);
        document.getElementById(mapLegendID).innerHTML = sliderHTML;
    }

    injectCatSlider(){
        //refer to injectCumulSlider to make corresponding slider functionality for category layers
    }

    turnOffAllLayers(){
        const { map, ListOfLayers, radioList } = this;

        for (let i = 0; i < radioList.length; i++){
            for (var j = 1; j < 6; j++) {
                var LayerInLoop = ListOfLayers[i] + "_" + j.toString();
                console.log("Turning off: ", LayerInLoop);
                map.setLayoutProperty(LayerInLoop, 'visibility', 'none');
            }
        }
    }

    loadCumulativeLayers() {
        const { map, ListOfLayers, radioList, sliderValue } = this;

        for (let i = 0; i < radioList.length; i++) {
            var LayerInLoop="";
            if (radioList[i]) {
                for (var j = 1; j <= sliderValue; j++){ 
                    LayerInLoop =ListOfLayers[i]+"_"+j.toString();
                    console.log("Turning on $LayerInLoop until slider value of $sliderValue"); 
                    map.setLayoutProperty(LayerInLoop, 'visibility', 'visible');
                }
            }
        }
    }


    loadCategoryLayer() {
        const { sliderValue, ListOfLayers, radioList, map } = this;
        console.log("Showing the value of sliderValue: ");
        console.log(sliderValue);
        for (let i = 0; i < radioList.length; i++) { // TODO: Fix length not defined error
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
    }
    
    displayCityMetrics() {
        const { city, cityNum, cityJson } = this;
        var IconList =  ["fas fa-bus", "fas fa-train", "fas fa-tram","fas fa-subway", "fas fa-taxi"];
        var StopType = ["Bus Stops","Train Stations" ,"Tram Stops", "Metro Stations", "Other Stops" ];
        //TODO: WORK ON THE FRICKIN CITY METRICS 2.0 !!!
        var cityTable ="<table class = \"table-contents\">";
        for (var i = 0; i < 5; i++) {
            if (cityJson["TransitSystems"][i].NumStops > 0) {
                cityTable += "<tr class=\"rowA\">" +
                    "<td class=\"columnA\">"+
                    "<i class=\"" + IconList[i] +"\"></i>"+ // icon
                    "</td>"+ //columnA
                    "<td class=\"columnB\">"+ //Metrics Are Displayed
                        "<tr class=\"row1\">"+
                            "<td class=\"column1a\">"+
                                "Number of " + StopType[i]+
                            "</td>"+ //column1a
                            "<td class=\"column1b\">"+
                                ":"+
                            "</td>"+ //column1b
                            "<td class=\"column1c\">"+
                                cityJson["TransitSystems"][i].NumStops+  // ADD VARIABLE HERE
                            "</td>"+ //column1c
                        "</tr>"+ //row1
                        "<tr class=\"row2\">"+
                            "<td class= \"column2a\">"+
                                "Number of Lines"+
                            "</td>"+ //column2a
                            "<td class= \"column2b\">"+
                                ":"+
                            "</td>"+  //column2b
                            "<td class=\"column2c\">"+
                                cityJson["TransitSystems"][i].NumLines+ // ADD VARIABLE HERE
                            "</td>"+  //column2c
                        "</tr>"+ //row2
                        "<tr class=\"row3\">"+
                            "<td class=\"column3a\">"+
                                "Average distance between "+ StopType[i] +
                            "</td>"+   //column3a
                            "<td class= \"column3b\">"+
                                ":"+
                            "</td>"+ //column3b
                            "<td class=\"column3c\">"+
                                cityJson["TransitSystems"][i].AvgDisStops+ // ADD VARIABLE HERE
                            "</td>"+ //column3c
                        "</tr>"+ //row3
                    "</td>"+ //columnB
                "</tr>"; //rowA
            }    // Closing the if
        }            // Clossing the loop
        cityTable += " </table>";
        var displayCityMetricsdivID = "city" + cityNum + "table";
        document.getElementById(displayCityMetricsdivID).innerHTML = cityTable;
    }

}