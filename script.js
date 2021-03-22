var selCity1 = "";
var selCity2 = "";
var selAnalysis1 = "";
var selAnalysis2 = "";
var shortURL = 'mapbox://styles/carmela-cucuzzella/';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybWVsYS1jdWN1enplbGxhIiwiYSI6ImNrZThua3M2djF0MmkzMnFodmlncjU1MzUifQ.kQ7CmjkzU5V5-sY7WFkzmg';
var map;

var city = "Quebec";
var cityURL = "";
var myJson;

// MAP 1 FUNCTIONS
//Function to Update Map 1 Key with City 1 Value

function CityUpdater1(selCity){
	selCity1=selCity;
	console.log(selCity1);
}

//Function to Update Map 1 Key with Analysis 1 Value
function AnalysisUpdater1(selAnalysis){
	selAnalysis1=selAnalysis;
	console.log(selAnalysis1);
}

// MAP 2 FUNCTIONS
//Function to Update Map 2 Key with City 2 Value
function CityUpdater2(selCity){
	selCity2=selCity;
	console.log(selCity2);
}

//Function to Update Map 2 Key with Analysis 2 Value
function AnalysisUpdater2(selAnalysis){
	selAnalysis2=selAnalysis;
	console.log(selAnalysis2);
}

var ListOfLayers = [];

function initJson(jsonObj){  // This creates a function to pull out the json
	myJson = jsonObj;          // The Data is asigned to an internal variable, so we don't destroy it by accident 

	if(selFormAnalysis1){   //get node map and layers
		console.log("Form of Analysis: Node");
		cityURL = myJson["City"][city].NodeStyleURL;
		ListOfLayers = myJson["City"][city].NodeLayers;
	}else{     //get direct map and layers
		console.log("Form of Analysis: Direct");
		cityURL = myJson["City"][city].DirectStyleURL;
		ListOfLayers = myJson["City"][city].DirectLayers;
	}

	var formHTML ="";
	var NameOfQueries = ["Centrality Degree", "Closeness"];
	for (const [i, value] of ListOfLayers.entries()) {
		console.log("---------------",i, value, NameOfQueries[i])
		formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "\" value=\"" + value + "\" onclick=\"" + "loadLayer(value);" + "\">" +
			"<label for=\"" + value + "\">" + NameOfQueries[i] + "</label>"
		}
	
	document.getElementById("radioForm").innerHTML = formHTML;

	console.log(city + ": " + cityURL);
	loadMap();
}

var prevLayer ="dummy-layer";
function loadLayer(currentLayer){
// MAPBOX EXAMPLE STARTS
// set up the corresponding toggle button for each layer
	console.log(prevLayer, currentLayer);

	var visibility = map.getLayoutProperty(currentLayer, 'visibility');

	console.log(visibility);
 
// toggle layer visibility by changing the layout object's visibility property
	if (visibility === 'visible') {
		map.setLayoutProperty(currentLayer, 'visibility', 'none');
		console.log("Current layer turned off");
		map.setLayoutProperty(prevLayer, 'visibility', 'visible');
		} else {
		map.setLayoutProperty(currentLayer, 'visibility', 'visible');
		console.log("Current layer turned on");
		map.setLayoutProperty(prevLayer, 'visibility', 'none');
		}

		prevLayer = currentLayer;

		console.log(prevLayer, currentLayer);
// MAPBOX EXAMPLE ENDS
// map.setLayoutProperty('my-layer', 'visibility', 'none');

}

function loadMap(){
	map = new mapboxgl.Map({
	container: 'map',
	style: "mapbox://styles/carmela-cucuzzella/"+ cityURL,
	center: myJson["City"][city].Coords,
	// center: [-71.26, 46.78],
	zoom: myJson["City"][city].Zoom,
	// zoom: 10.0
	});
	
	console.log(map.getStyle().layers);

	turnOffLayers();
}

function turnOffLayers(){

	var MapLayers = map.getStyle().layers;
	console.log(MapLayers);
	
	for (const [index, layer] of MapLayers.entries()){
		if(ListOfLayers.includes(layer.id)){
			
			console.log(layer.id +"Will be shut down")
		}
	}
	// if myJson["City"][city].DirectLayers.includes(layer) or myJson["City"][city].NodeLayers.includes(layer){
	// 	layer is turned offf
	}

}

