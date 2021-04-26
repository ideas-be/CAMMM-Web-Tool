var myJson;

function newJson(obj){
    myJson=obj;
    console.log("Initializing new Json obj");
}

class City{
    constructor(city, cityNum){
        this.city = city;
        this.cityNum = cityNum;
        this.readCityJson();
    }
    readCityJson(){
        const {city, cityNum} = this;
        console.log("city", city,"cityNum",cityNum);

        cityCoords=myJson["City"][city].Coords;
	    cityZoom=myJson["City"][city].Zoom;
        
        this.cityCoords = cityCoords;
        this.cityZoom = cityZoom;
        console.log("cityCoords", cityCoords,"cityZoom",cityZoom);
    }
    getToggleTest(){
		selToggle = document.getElementById(toggBtntest).checked;
        if(selToggle){
            console.log("Bye");
        }else{
            console.log("Hi");
        }
    }
}


// let City1 = new City(1);

// City1.readCityJson();

// console.log(City1.cityNum);

// var cityURL = "";
// var myJson;
// var cityCoords = [];
// var cityZoom = 10.0;


// var mapContainer = "";
// var cityContainer = "";

// var ListOfLayers = [];

// const City1 = new City('Montreal',1)