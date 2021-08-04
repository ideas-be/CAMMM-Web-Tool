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
    constructor(city, cityNum, cityJson) {
        this.city = city;
        this.cityNum = cityNum;
        this.cityJson = cityJson;
        this.readCityJson();
        this.injectToggleHTML();
        this.injectCategoryCumulativeToggleHTML();
        this.getToggleTest();
        // this.cityData();
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

    injectCategoryCumulativeToggleHTML() {
        const { cityNum } = this;
        console.log("Injecting category/cumulative toggle in HTML");
        var toggleHTML = "<p class=\"toggleText\">Category" +
            "<label class=\"switch\" >" +
            "<input type=\"checkbox\" id=\"toggCatCumulBtn" + cityNum + "\" onchange=\"console.log(\"Category/Cumulative Toggle is being used!!!\");\">" +
            "<span class=\"slider round\"></span>" +
            "</label>     Cumulative" +
            "</p>";
        var toggleID = "toggleCategoryCumulative" + cityNum;
        document.getElementById(toggleID).innerHTML = toggleHTML;
    }

    loadCumulativeLayers() {
        const { cityNum ,map, ListOfLayers } = this;
        var radioList = [];
        for (const [i, val] of ListOfLayers.entries()) {
            var buttonStatus = document.getElementById(val+"_"+cityNum).checked;
            console.log("buttonStatus", i, buttonStatus);
            radioList.push(buttonStatus);
        }
        this.radioList = radioList;
        console.log("This is all the radio buttons");
        console.log(this.radioList);

        for (let i = 0; i < this.radioList.length; i++) {
            var LayerInLoop="";
            if (this.radioList[i]) {
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
            formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "_"+cityNum+"\" value=\"" + value + "\" onclick=\"{" + "City" + cityNum + ".loadCumulativeLayers();}\">" +
                "<label for=\"" + value + "\">" + NameOfQueries[i] + "</label><br>"
        }
        var containerId = "radioForm" + cityNum;
        document.getElementById(containerId).innerHTML = formHTML;
    }
    cityData() {
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
        console.log("cityTable: ", cityTable);
        var citydatadivID = "city" + cityNum + "table";
        document.getElementById(citydatadivID).innerHTML = cityTable;

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

        // this.map.on('load', function () {
        //     var layers = map.getStyle().layers;
        //     for (var i = 0; i < ListOfLayers.length; i++) {
        //         map.setLayoutProperty(ListOfLayers[i], 'visibility', 'none');
        //     }
        // }

        // )
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