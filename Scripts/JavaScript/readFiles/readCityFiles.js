let geojsonObjs = [];
let objNames = [];

function fetchGeoJson(jsonFile) {
    var currentCity = document.getElementById("city-name").innerHTML;
    console.log("CURRENT CITY TO READ FILES FOR IS: ", currentCity);
    var fileName = "Data/" + currentCity + "/" + jsonFile;
    // READING AND PARSING CITY JSON
    fetch(fileName).then(function (response) {
        return response.json();
    }).then(function (obj) {
        console.log("Fetching geojson:", fileName);
        console.log(obj);
        objNames.push(jsonFile);
        geojsonObjs.push(obj);
        return (obj);
    }).catch(function (error) {
        console.error("Something went wrong when reading file!!");
        console.error;
    });
}

function readGeoJsonObj(selectedJson) {

    console.log("OBJECTS FETCHED SO FAR: ", geojsonObjs);

    console.log("READING FILE: ", selectedJson);


    // The objective of this function is:
    // to return the selected geojson object
    var index = 0;
    for (i = 0; i < objNames.length; i++) {
        if (objNames[i] == selectedJson)
            index = i;
    }
    return geojsonObjs[index];
}
