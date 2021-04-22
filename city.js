class City{
    constructor(num){
        var city="";
        var cityURL = "";
        var myJson;
        var cityCoords = [];
        var cityZoom = 10.0;
        
        var cityNum = num;
        var mapContainer = "";
        var cityContainer = "";
        
        var ListOfLayers = [];
    }
}

let City1 = new City(1);

City1.readCityJson();

console.log(City1.cityNum);