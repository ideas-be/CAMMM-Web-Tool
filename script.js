var long = -73.6825;
var lat = 45.559;
var long2 = 19.125;
var lat2 = 47.408;
var zoom = 12;
var map1url = 'cki1wtg7h54mm19pjbvydycxd';
var map2url = 'cki3o047r4ues19o6n13z7p5e';
var map1key = "";
var map2key = "";
var selQuery = "";
var selCity1 = "";
var selCity2 = "";
var selAnalysis1 = "";
var selAnalysis2 = "";
var shortURL = 'mapbox://styles/carmela-cucuzzella/';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybWVsYS1jdWN1enplbGxhIiwiYSI6ImNrZThua3M2djF0MmkzMnFodmlncjU1MzUifQ.kQ7CmjkzU5V5-sY7WFkzmg';


// Map 1
var map1 = new mapboxgl.Map({
container: 'map1', // container id
style: shortURL+ map1url, // stylesheet location
center: [long, lat], // starting position [long, lat]
zoom: zoom // starting zoom
});
  

// Map 2
var map2 = new mapboxgl.Map({
container: 'map2', // container id
style: shortURL+ map2url, // stylesheet location
center: [long2, lat2], // starting position [long, lat]
zoom: 10 // starting zoom
});


//Function to Update Map Keys with Query Value
function QueryUpdater(selVal){
	selQuery=selVal;
	console.log(selQuery);
}
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

//Functions to Update City Metrics
function City1Metric(){
	switch(selCity1)
		{
			case "Montreal": return 1;
				break;
			case "Budapest": return 2;
				break;
			default: return null;
		}
}

function City2Metric(){
	switch(selCity2)
		{
			case "Montreal": return 1;
				break;
			case "Budapest": return 2;
				break;
			default: return null;
		}
}

//Main Function to Update and Compare Maps + Reset Map Key Values
function MapUpdater(){
	
	console.log("Comparing Maps...");

// Updating Query Value to Map Key Variables
	map1key+=selQuery;
	map2key+=selQuery;
	
// Updating City Values to Map Key Variables
	map1key+="-"+selCity1;
	map2key+="-"+selCity2;

// 	Updating Analysis Form Values to Map Key Variables
	if(selAnalysis1){
		map1key+="-Node";
	}else{
		map1key+="-Direct";
	}
	
	if(selAnalysis2){
		map2key+="-Node";
	}else{
		map2key+="-Direct";
	}
	
// Printing Map Key Variables on Compare
	console.log("Map 1 Key: " + map1key);
	console.log("Map 2 Key: " + map2key);
	
////Resetting the Map Key Variables
	map1key="";
	map2key="";
}
