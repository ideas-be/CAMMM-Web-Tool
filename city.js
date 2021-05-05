var myJson;
var map;
var shortURL = 'mapbox://styles/carmela-cucuzzella/';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybWVsYS1jdWN1enplbGxhIiwiYSI6ImNrZThua3M2djF0MmkzMnFodmlncjU1MzUifQ.kQ7CmjkzU5V5-sY7WFkzmg';

function newJson(obj){
    myJson=obj;
    console.log("Initializing new Json obj");
    dropdownCities();
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
    constructor(city, cityNum){
        this.city = city;
        this.cityNum = cityNum;
        this.readCityJson();
        this.injectToggleHTML();
        this.getToggleTest();
    }
    readCityJson(){
        const {city, cityNum} = this;
        console.log("city", city,"cityNum",cityNum);
        console.log(myJson);

        cityCoords=myJson["City"][city].Coords;
	    cityZoom=myJson["City"][city].Zoom;
        
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
        const { city,cityNum } = this;
        var toggleID = "toggBtn" + cityNum;
        var selAnalysis = document.getElementById(toggleID).checked;
		console.log("selToggle:", selAnalysis);
        if(selAnalysis){
            console.log("Loading map type: Node");
            cityURL = myJson["City"][city].NodeStyleURL;
            ListOfLayers = myJson["City"][city].NodeLayers;

            // TODO Load radio buttons
        }else{
            console.log("Loading map type: Direct");
            cityURL = myJson["City"][city].DirectStyleURL;
            ListOfLayers = myJson["City"][city].DirectLayers;
        }
        this.selAnalysis = selAnalysis;
        this.cityURL = cityURL;
        this.ListOfLayers = ListOfLayers;
        this.loadMap();
    }

    loadMap() {
        const { cityNum, cityCoords, cityZoom } = this;
        var mapContainer="map"+cityNum
        map = new mapboxgl.Map({
            container: mapContainer,
            style: shortURL + cityURL,
            center: cityCoords, //need to make global
            // center: [-71.26, 46.78],
            zoom: cityZoom,
            // zoom: 10.0
        });

    }

}


