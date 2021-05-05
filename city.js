// let City1 = new City("Montreal", 1, myJson["City"]["Montreal"]);
// let City2 = new City("Vienna", 2, myJson["City"]["Vienna"]);
var City1, City2;
var myJson;
var shortURL = 'mapbox://styles/carmela-cucuzzella/';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybWVsYS1jdWN1enplbGxhIiwiYSI6ImNrZThua3M2djF0MmkzMnFodmlncjU1MzUifQ.kQ7CmjkzU5V5-sY7WFkzmg';

function newJson(obj){
    myJson=obj;
    console.log("Initializing new Json obj");
    dropdownCities();
}

function getCity(city, num){
    if(num==1){
        City1 = city;
        console.log("This is City 1");
        console.log(City1);
    }else if(num==2){
        City2 = city;
        console.log("This is City 2");
        console.log(City2);
    }
}

function getSelectedCity(num){
    var citylist="cityList"+num;
    var selectedCity = document.getElementById(citylist).value;

    if(selectedCity != "Select City"){
        
        let city = new City(selectedCity, num, myJson["City"][selectedCity]);
        getCity(city, num);
        // readCityJson(selectedCity, 2);
        // CityDataDisplay(selectedCity);

        var mapdivId = "map"+num+"div";
        var mapdiv = document.getElementById(mapdivId);
        
        var mapdisplay = mapdiv.style.display;
        if(mapdisplay == 'none')
            {
                mapdiv.style.display = 'block';
            }
    }
}

function dropdownCities(){
	var cityHTML = "<option disabled selected>Select City</option>";

	for(key in myJson["City"]){
		cityHTML += "<option value=\"" + myJson["City"][key].name + "\">"+myJson["City"][key].name +"</option>";
	}

	document.getElementById("cityList1").innerHTML = cityHTML;
	document.getElementById("cityList2").innerHTML = cityHTML;

}

class City{
    constructor(city, cityNum, cityJson){
        this.city = city;
        this.cityNum = cityNum;
        this.cityJson = cityJson;
        this.readCityJson();
        this.injectToggleHTML();
        this.getToggleTest();
    }
    readCityJson() {
        const { city, cityNum, cityJson} = this;
        console.log("city", city,"cityNum",cityNum);
        console.log(cityJson);

        let cityCoords = cityJson.Coords;
        let cityZoom = cityJson.Zoom;
        
        this.cityCoords = cityCoords;
        this.cityZoom = cityZoom;
        console.log("cityCoords", cityCoords,"cityZoom",cityZoom);
    }
    injectToggleHTML(){
        const { cityNum } = this;
        console.log("Injecting toggle in HTML");
        var toggleHTML="<p class=\"toggleText\">Direct"+
			"<label class=\"switch\" >"+
            "<input type=\"checkbox\" id=\"toggBtn" + cityNum+"\" onchange=\"City"+cityNum+".getToggleTest();\">"+
                        "<span class=\"slider round\"></span>"+
			"</label>     Node"+
		"</p>";
        var toggleID = "toggleCity" + cityNum;
        document.getElementById(toggleID).innerHTML = toggleHTML;
    }

    getToggleTest(){
        const { cityNum, cityJson} = this;
        var toggleID = "toggBtn" + cityNum;
        var selAnalysis = document.getElementById(toggleID).checked;
		console.log("selToggle:", selAnalysis);
        let cityURL="";
        let ListOfLayers = [];
        if(selAnalysis){
            console.log("Loading map type: Node");
            cityURL = cityJson.NodeStyleURL;
            ListOfLayers = cityJson.NodeLayers;

            // TODO Load radio buttons
        }else{
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

    loadLayer(){
        const{map, ListOfLayers} =this;
        let radioList = [];
        for(let i=0;i++;i<ListOfLayers.length){
            var buttonStatus=document.getElementById(ListOfLayers[i]).checked;
            radioList.push(buttonStatus);
        }
        this.radioList=radioList;
        console.log("This is all the radio buttons");
        console.log(this.radioList);
    }

    radioButtons() {
        const { cityNum, ListOfLayers } = this;
        var formHTML ="";
        var NameOfQueries = ["Centrality Degree", "Closeness"];
        for (const [i, value] of ListOfLayers.entries()) {
            this.value = value;
            formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "\" value=\"" + value + "\" onclick=\"" + "City"+cityNum+".loadLayer();" + "\">" +
                "<label for=\"" + value + "\">" + NameOfQueries[i] + "</label>"
        }
        var containerId = "radioForm"+cityNum;	
        document.getElementById(containerId).innerHTML = formHTML;
    }

    loadMap() {
        const { cityNum, cityCoords, cityZoom, cityURL } = this;

        var mapContainer="map"+cityNum;
        let map = new mapboxgl.Map({
            container: mapContainer,
            style: shortURL + cityURL,
            center: cityCoords, //need to make global
            // center: [-71.26, 46.78],
            zoom: cityZoom,
            // zoom: 10.0
        });

        this.map = map;
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