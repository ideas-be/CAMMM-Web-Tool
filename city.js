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
        // this.injectToggleHTML();
        // this.injectToggleTest();
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
    injectToggleHTML(){
        console.log("Injecting toggle in HTML");
        var toggleHTML="<p class=\"toggleText\">Direct"+
			"<label class=\"switch\" >"+
                    "<input type=\"checkbox\" id=\"toggBtntest\" onchange=\"City"+this.cityNum+".getToggleTest();\">"+
                        "<span class=\"slider round\"></span>"+
			"</label>     Node"+
		"</p>";

        document.getElementById("toggleTest").innerHTML = toggleHTML;
    }

    getToggleTest(){
        var selAnalysis = document.getElementById("toggBtntest").checked;
		console.log("selToggle:", selAnalysis);
        if(selAnalysis){
            console.log("Node");
        }else{
            console.log("Direct");
        }
        this.selAnalysis = selAnalysis;
    }
    // TODO: work here on the thing that is like this
    // injectToggleTest(){
    //     console.log("Injecting toggle in HTML");
    //     toggleHTML="<input type=\"checkbox\" id=\"toggBtntest\" onchange=\"City1.getToggleTest();\">"+"<span class=\"slider round\"></span>";
    //     document.getElementById("toggleTest").innerHTML = toggleHTML;
    // }
    // getToggleTest(){
    //     selToggle = document.getElementById(toggBtntest).checked;
    //     if(selToggle){
    //         console.log("Bye");
    //     }else{
    //         console.log("Hi");
    //     }
    // }
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

// const City1 = new City('Montreal',1);
// const City2 = new City('Vienna',2);