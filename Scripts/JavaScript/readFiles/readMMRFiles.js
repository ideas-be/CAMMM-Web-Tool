// var jsonFile = "services.geojson";
let geojsonObjs = [];
let objNames = [];

function fetchGeoJson(jsonFile) {
    var fileName = "Data/Montreal_Metropolitan_Region/" + jsonFile;
    // READING AND PARSING CITY JSON
    fetch(fileName).then(function (response) {
        return response.json();
    }).then(function (obj) {
        console.log("Fetching geojson:", fileName);
        console.log(obj);
        geojsonObjs.push(obj);
        objNames.push(jsonFile);
    }).catch(function (error) {
        console.error("Something went wrong when reading file!!");
        console.error;
    });
}

// fetchGeoJson(jsonFile);

// function initJson() {
//     console.log("Geojson objects fetched and initialized!!");
//     console.log(geojsonObjs);

// }

// setTimeout(initJson, 600);

function readGeoJsonObj(selectedJson) {
    // The objective of this function is:
    // to return the selected geojson object
    var index = 0;
    for (i = 0; i < objNames.length; i++) {
        if (objNames[i] == selectedJson)
            index = i;
    }
    return geojsonObjs[index];
}



// let jsondata;
// fetch(file).then(
//     function (u) { return u.json(); }
// ).then(
//     function (json) {
//         jsondata = json;
//     }
// )
// console.log(jsondata);