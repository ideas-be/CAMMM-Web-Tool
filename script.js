var cityContainer = "";

// function radioButtons() {
// 	var formHTML ="";
// 	var NameOfQueries = ["Centrality Degree", "Closeness"];
// 	for (const [i, value] of ListOfLayers.entries()) {
// 		formHTML += "<input type=\"radio\" name=\"mapRadios\" id=\"" + value + "\" value=\"" + value + "\" onclick=\"" + "loadLayer(value);" + "\">" +
// 			"<label for=\"" + value + "\">" + NameOfQueries[i] + "</label>"
// 		}
		
// 	var containerId = "radioForm"+cityNum;	
// 	document.getElementById(containerId).innerHTML = formHTML;
// }

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


