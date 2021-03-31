var selCity1 = "";
var selCity2 = "";
var selAnalysis1 = "";
var selAnalysis2 = "";
var shortURL = 'mapbox://styles/carmela-cucuzzella/';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybWVsYS1jdWN1enplbGxhIiwiYSI6ImNrZThua3M2djF0MmkzMnFodmlncjU1MzUifQ.kQ7CmjkzU5V5-sY7WFkzmg';
var map;

var city="";
var cityURL = "";
var myJson;

var ListOfLayers = [];

function initJson(jsonObj){ // This creates a function to pull out the json
	myJson = jsonObj; // The Data is asigned to an internal variable, so we don't destroy it by accident 
	dropdownCities(); //initialize city dropdown on load
}

function readCityJson(selCity, selAnalysis){  // This creates a function to read the json for each city
	city=selCity;
	
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
	loadMap();
	radioButtons(); //display the radio buttons
}

function loadMap(){
	console.log("City: "+city);

	map = new mapboxgl.Map({
	container: 'map',
	style: "mapbox://styles/carmela-cucuzzella/"+ cityURL,
	center: myJson["City"][city].Coords,
	// center: [-71.26, 46.78],
	zoom: myJson["City"][city].Zoom,
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



var cityContainer = "";

function CityDataDisplay(selCity, cityNum){
	for(key in myJson["City"]){
		if (myJson["City"][key].name == selCity) {
			cityContainer+=
			"City "+ cityNum + ": " + myJson["City"][key].name + "<br>" +
			"Number of Transport Systems: " + myJson["City"][key].NumTransportSystem + "<br>" + 
			"Number of Bus Stops: " + myJson["City"][key].NumBusStops + "<br>"+ 
			"Number of Rail Stops: " + myJson["City"][key].NumTransportSystem + "<br>" + 
			"Number Metro Stations: " + myJson["City"][key].NumMetroStations + "<br>" + 
			"Number Boroughs: " + myJson["City"][key].NumBoroughs + "<br>" + 
			"Area in sq. km.: " + myJson["City"][key].AreaSqKm + "<br>" + 
			"Population in million: " + myJson["City"][key].PopulationMillion + "<br>" + 
			"Density per sq. km.: " + myJson["City"][key].DensityPersonSqKm + "<br>";		
		}
	  }
	if(cityNum == 1){
		document.getElementById("city1table").innerHTML = cityContainer;
	}else if(cityNum == 2){
		document.getElementById("city2table").innerHTML = cityContainer;
	}
	cityContainer="";
}


