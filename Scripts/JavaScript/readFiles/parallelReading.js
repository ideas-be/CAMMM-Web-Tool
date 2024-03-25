function loadJSONFilesInParallel(files) {
    return Promise.all(files.map(file => fetch(file).then(response => response.json())));
}

// Usage
const files = ["Data/Montreal_Island/population_borough.json", "Data/Montreal_Island/city.json", "Data/Montreal_Island/borough.geojson"];

var parallelFiles;
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
    })
    .catch(error => {
        console.error("Error loading JSON files:", error);
        // Handle error if necessary
    });
