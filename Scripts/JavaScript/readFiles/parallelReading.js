var files = [];

function loadJSONFilesInParallel(files) {
    return Promise.all(files.map(file => fetch(file).then(response => response.json())));
}

// Usage
// TODO: Come back for Lines geojson when all cities are updated
const fileNames = ["population_borough.json", "city.json", "borough.geojson"
    // , "Lines.geojson"
];

var cityName = "";
function getCityName() {
    cityName = document.getElementById("city-name").innerHTML;
    if (cityName == "Quebec City") {
        cityName = "Quebec_City";
    } else if (cityName == "Trois Rivieres") {
        cityName = "Trois_Rivieres";
    }
    console.log("CITY FILES TO BE READ IS: ", cityName);
}

setTimeout(getCityName, 10);
setTimeout(generateFileList, 15);

function generateFileList() {
    var tempPath = "Data/" + cityName + "/";
    for (file in fileNames) {
        files.push(tempPath + fileNames[file]);
    }
    console.log("FILES TO BE READ ARE: ", files);
}

var parallelFiles;
setTimeout(function () {
    loadJSONFilesInParallel(files)
        .then(dataArray => {
            // Process dataArray containing JSON data of all files
            console.log("All files loaded");
            // console.log(dataArray);

            // Continue with your application logic
            parallelFiles = dataArray;
            console.log("Parallel Files read are: ", parallelFiles);
            // loading population JSON file
            getPopJson(parallelFiles[0]);
            // loading city JSON file
            getCityJSON(parallelFiles[1]);
            // loading borough GeoJSON file
            // displayBoroughs(parallelFiles[2]);
            getBoroughJSON(parallelFiles[2]);
            // loading lines GeoJSON file
            getLinesJSON(parallelFiles[3]);
        })
        .catch(error => {
            console.error("Error loading JSON files:", error);
            // Handle error if necessary
        });

}, 20);