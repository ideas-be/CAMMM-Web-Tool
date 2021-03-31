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


// MAP 2 FUNCTIONS
//Function to Update Map 2 Key with City 2 Value
function CityUpdater2(selCity){
	selCity2=selCity;
	console.log(selCity2);
}


var ListOfLayers = [];

function initJson(jsonObj, selAnalysis){  // This creates a function to pull out the json
	myJson = jsonObj;          // The Data is asigned to an internal variable, so we don't destroy it by accident 

	dropdownCities();

	if(selAnalysis){   //get node map and layers
		console.log("Form of Analysis: Node");
		cityURL = myJson["City"][city].NodeStyleURL;
		ListOfLayers = myJson["City"][city].NodeLayers;
	}else{     //get direct map and layers
		console.log("Form of Analysis: Direct");
		cityURL = myJson["City"][city].DirectStyleURL;
		ListOfLayers = myJson["City"][city].DirectLayers;
	}
	
	radioButtons();

	console.log(city + ": " + cityURL);
	loadMap();
}

function dropdownCities(){
	var cityHTML = "<option disabled selected>Select City</option>";
	// console.log(typeof (myJson["City"]));
	// console.log( myJson["City"]);

	for(key in myJson["City"]){
		cityHTML += "<option value=\"" + key + "\">"+myJson["City"][key].name+"</option>";
		// console.log("City: " + key + "  Name: " + myJson["City"][key].name);
	}

	document.getElementById("cityList").innerHTML = cityHTML;

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

var prevLayer ="dummy-layer";
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

function loadMap(){
	map = new mapboxgl.Map({
	container: 'map',
	style: "mapbox://styles/carmela-cucuzzella/"+ cityURL,
	center: myJson["City"][city].Coords,
	// center: [-71.26, 46.78],
	zoom: myJson["City"][city].Zoom,
	// zoom: 10.0
	});

}



