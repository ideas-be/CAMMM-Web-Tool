class City{
    constructor(city, cityNum){
        this.city = city;
        this.cityNum = cityNum;

    }
    readCityJson(){
        const {city, cityNum} = this;
        return `${city}, ${cityNum}`;
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