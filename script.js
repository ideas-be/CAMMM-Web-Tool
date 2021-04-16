var selCity1 = "";
var selCity2 = "";
var selAnalysis1 = "";
var selAnalysis2 = "";
var shortURL = 'mapbox://styles/carmela-cucuzzella/';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybWVsYS1jdWN1enplbGxhIiwiYSI6ImNrZThua3M2djF0MmkzMnFodmlncjU1MzUifQ.kQ7CmjkzU5V5-sY7WFkzmg';
var map;

var selAnalysis=false;

var city="";
var cityURL = "";
var myJson;
var cityCoords = [];
var cityZoom = 10.0;

var cityNum = 0;
var mapContainer = "";
var cityContainer = "";

var ListOfLayers = [];
var prevLayer ="dummy-layer";

var readCount = 0;

function initJson(jsonObj, analysisVal, consoleText){ // This creates a function to pull out the json
	console.log(consoleText);
	selAnalysis=analysisVal;
	console.log("Init Json selAnalysis:" + selAnalysis);
	myJson = jsonObj; // The Data is asigned to an internal variable, so we don't destroy it by accident
	if(readCount>0){
		readCityJson(city, cityNum);
	}
	dropdownCities(); //initialize city dropdown on load
}

function readCityJson(selCity, num){  // This creates a function to read the json for each city
	cityNum=num;
	city=selCity;
	cityCoords=myJson["City"][city].Coords;
	cityZoom=myJson["City"][city].Zoom;
	
	if(selAnalysis){   //get node map and layers
		console.log("Form of Analysis: Node");
		cityURL = myJson["City"][selCity].NodeStyleURL;
		ListOfLayers = myJson["City"][selCity].NodeLayers;
	}else{     //get direct map and layers
		console.log("Form of Analysis: Direct");
		cityURL = myJson["City"][selCity].DirectStyleURL;
		ListOfLayers = myJson["City"][selCity].DirectLayers;
	}
	
	console.log(city + ": " + cityURL);
	checkMapContainer();
	loadMap();
	radioButtons(); //display the radio buttons
	readCount++;
}


function checkMapContainer(){
	if(cityNum == 1){
		mapContainer="map1";
	}else if(cityNum == 2){
		mapContainer="map2";
	}
	// mapContainer="";
}

function loadMap(){
	console.log("City: "+city);

	map = new mapboxgl.Map({
	container: mapContainer,
	style: "mapbox://styles/carmela-cucuzzella/"+ cityURL,
	center: cityCoords, //need to make global
	// center: [-71.26, 46.78],
	zoom: cityZoom,
	// zoom: 10.0
	});

}

function dropdownCities(){
	var cityHTML = "<option disabled selected>Select City</option>";
	// console.log(typeof (myJson["City"]));
	// console.log( myJson["City"]);

	for(key in myJson["City"]){
		cityHTML += "<option value=\"" + myJson["City"][key].name + "\">"+myJson["City"][key].name +"</option>";
		// console.log("City: " + key + "  Name: " + myJson["City"][key].name);
	}

	document.getElementById("cityList1").innerHTML = cityHTML;
	document.getElementById("cityList2").innerHTML = cityHTML;

}

function radioButtons() {
	var formHTML ="";
	var NameOfQueries = ["Centrality Degree", "Closeness"];
	for (const [i, value] of ListOfLayers.entries()) {
		console.log("---------------",i, value, NameOfQueries[i])
		formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "\" value=\"" + value + "\" onclick=\"" + "loadLayer(value);" + "\">" +
			"<label for=\"" + value + "\">" + NameOfQueries[i] + "</label>"
		}
	
	document.getElementById("radioForm").innerHTML = formHTML;
}

function loadLayer(currentLayer){
// set up the corresponding toggle button for each layer

	var visibility = map.getLayoutProperty(currentLayer, 'visibility');
 
// toggle layer visibility by changing the layout object's visibility property
if (visibility === 'visible') {
	map.setLayoutProperty(currentLayer, 'visibility', 'none');
	console.log(currentLayer+ " turned off");
	map.setLayoutProperty(prevLayer, 'visibility', 'visible');
	} else {
		map.setLayoutProperty(currentLayer, 'visibility', 'visible');
		console.log(currentLayer+" turned on");
		map.setLayoutProperty(prevLayer, 'visibility', 'none');
		}

		prevLayer = currentLayer;

}


function CityDataDisplay(selCity){
	for(key in myJson["City"]){
		if (myJson["City"][key].name == selCity) {
			cityContainer+="<table id=>"+
			"<td>"+
				"<tr>City "+ cityNum + ": </tr>"+
				"<tr>Number of Transport Systems:</tr>"+
				"<tr>Number of Bus Stops:</tr>"+
				"<tr>Number of Rail Stops:</tr>"+
				"<tr>Number Metro Stations:</tr>"+
				"<tr>Number Boroughs:</tr>"+
				"<tr>Area in sq. km.:</tr>"+
				"<tr>Population in million:</tr>"+
				"<tr>Density per sq. km.:</tr>"+
			"</td>"+

			"<td>" +
				"<tr>" + myJson["City"][key].name + "</tr>"+
				"<tr>" + myJson["City"][key].NumTransportSystem + "</tr>"+
				"<tr>" + myJson["City"][key].NumBusStops + "</tr>"+
				"<tr>" + myJson["City"][key].NumRailStations + "</tr>"+
				"<tr>" + myJson["City"][key].NumMetroStations + "</tr>"+
				"<tr>"+ myJson["City"][key].NumBoroughs + "</tr>"+
				"<tr>" + myJson["City"][key].AreaSqKm + "</tr>"+
				"<tr>" + myJson["City"][key].PopulationMillion + "</tr>"+
				"<tr>" + myJson["City"][key].DensityPersonSqKm + "</tr>"+
			"</td>"+"</table>";
	
		}
	  }
	console.log("cityNum " + cityNum)
	if(cityNum == 1){
		document.getElementById("city1table").innerHTML = cityContainer;
	}else if(cityNum == 2){
		document.getElementById("city2table").innerHTML = cityContainer;
	}
	cityContainer="";
}


