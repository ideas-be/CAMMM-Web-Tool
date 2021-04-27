// var selCity1 = "";
// var selCity2 = "";
// var selAnalysis1 = "";
// var selAnalysis2 = "";
// var map;

// var selAnalysis=false;

// var city="";
// var cityURL = "";
// var myJson;
// var cityCoords = [];
// var cityZoom = 10.0;

// var cityNum = 0;
// var mapContainer = "";
// var cityContainer = "";

// var ListOfLayers = [];
// var prevLayer ="dummy-layer";


// function initJson(jsonObj, analysisVal, consoleText){ // This creates a function to pull out the json
// 	console.log(consoleText);
// 	selAnalysis=analysisVal;
// 	myJson = jsonObj; // The Data is asigned to an internal variable, so we don't destroy it by accident
// 	if(readCount>0){
// 		readCityJson(city, cityNum); //reading and reloading map on toggle
// 	}
// 	dropdownCities(); //initialize city dropdown on load
// }

// function readCityJson(selCity, num){  // This creates a function to read the json for each city
// 	cityNum=num;
// 	city=selCity;
// 	cityCoords=myJson["City"][city].Coords;
// 	cityZoom=myJson["City"][city].Zoom;
	
// 	if(selAnalysis){   //get node map and layers
// 		console.log("Form of Analysis: Node");
// 		cityURL = myJson["City"][selCity].NodeStyleURL;
// 		ListOfLayers = myJson["City"][selCity].NodeLayers;
// 	}else{     //get direct map and layers
// 		console.log("Form of Analysis: Direct");
// 		cityURL = myJson["City"][selCity].DirectStyleURL;
// 		ListOfLayers = myJson["City"][selCity].DirectLayers;
// 	}
	
// 	checkMapContainer();
// 	loadMap();
// 	radioButtons(); //display the radio buttons
// 	readCount++;
// }


// function checkMapContainer(){
// 	if(cityNum == 1){
// 		mapContainer="map1";
// 	}else if(cityNum == 2){
// 		mapContainer="map2";
// 	}
// 	// mapContainer="";
// }

// var mapDirVar, mapNodeVar;

// function loadMap(){
// 	console.log("City: "+city);

// 	map = new mapboxgl.Map({
// 	container: mapContainer,
// 	style: shortURL+ cityURL,
// 	center: cityCoords, //need to make global
// 	// center: [-71.26, 46.78],
// 	zoom: cityZoom,
// 	// zoom: 10.0
// 	});
	
// 	if(!selAnalysis){
// 		mapDirVar={    //storing map in the variable that loads Direct analysis
// 			id: cityNum,
// 			storeMap: map
// 		};
	
// 		console.log("Loading Direct Map of city" + cityNum+ " in Variable...");
// 		console.log(mapDirVar);
// 	}else{
// 		mapNodeVar={    //storing map in the variable that loads Node analysis
// 			id: cityNum,
// 			storeMap: map
// 		};
	
// 		console.log("Loading Node Map of city" + cityNum+ " in Variable...");
// 		console.log(mapNodeVar);
// 	}
	
// }

function radioButtons() {
	var formHTML ="";
	var NameOfQueries = ["Centrality Degree", "Closeness"];
	for (const [i, value] of ListOfLayers.entries()) {
		formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "\" value=\"" + value + "\" onclick=\"" + "loadLayer(value);" + "\">" +
			"<label for=\"" + value + "\">" + NameOfQueries[i] + "</label>"
		}
		
	var containerId = "radioForm"+cityNum;	
	document.getElementById(containerId).innerHTML = formHTML;
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
			cityContainer+=
				"<table class = \"table-contents\">"+
					"<tr>"+
						"<td>City "+ cityNum + "</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].name + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Number of Transport Systems</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].NumTransportSystem + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Number of Bus Stops</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].NumBusStops + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Number of Rail Stations</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].NumRailStations + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Number of Metro Stations</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].NumMetroStations + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Number of Boroughs</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].NumBoroughs + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Area in sq. km.</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].AreaSqKm + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Population in million</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].PopulationMillion + "</td>"+
					"</tr>"+
					"<tr>"+
						"<td>Density per sq. km.</td>"+
						"<td>:</td>"+
						"<td>"+ myJson["City"][key].DensityPersonSqKm + "</td>"+
					"</tr>"+
				"</table>";
	
		}
	  }

	if(cityNum == 1){
		document.getElementById("city1table").innerHTML = cityContainer;
	}else if(cityNum == 2){
		document.getElementById("city2table").innerHTML = cityContainer;
	}
	cityContainer="";
}


