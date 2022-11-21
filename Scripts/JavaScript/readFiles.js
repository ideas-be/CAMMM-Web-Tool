let cityFile = "Data/city.geojson";
var cityObj = "";

// READING AND PARSING CITY JSON
fetch(cityFile).then(function (response) {
    return response.json();
}).then(function (obj) {
    // console.log(obj);
    cityObj = obj;
    // obj;
}).catch(function (error) {
    console.error("Something went wrong when reading city!!");
    console.error;
});

let servicesFile = "Data/services.geojson";
var serviceObj = "";
// READING AND PARSING SERVICES JSON
fetch(servicesFile).then(function (response) {
    return response.json();
}).then(function (obj) {
    // console.log(obj);
    serviceObj = obj;
    // obj;
}).catch(function (error) {
    console.error("Something went wrong when reading services!!");
    console.error;
});

function initJson() {
    console.log("City json outside fetch: ");
    console.log(cityObj);
    console.log("Service json outside fetch: ");
    console.log(serviceObj);

}

setTimeout(initJson, 600);



// let jsondata;
// fetch(file).then(
//     function (u) { return u.json(); }
// ).then(
//     function (json) {
//         jsondata = json;
//     }
// )
// console.log(jsondata);