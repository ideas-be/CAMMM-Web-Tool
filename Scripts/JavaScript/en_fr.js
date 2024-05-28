function FRLandingPage() {
    insertCityButtons();
    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';

    if (result == 'Yes') {
        console.log("Translating to FR");
        document.getElementById("welcome").innerHTML = "Bienvenue chez";
        document.getElementById("atlas-title").innerHTML = "L'application de l'atlas";
        // document.getElementById("city-button-cta").innerHTML = "<em>Sélectionnez les villes et cliquez sur Lancer</em>";
        // document.getElementById("start-button").innerHTML = "<a onclick=\"openCityTabs();\"><i class=\"fas fa-forward-fast\"></i>Lancer</a>";
        document.getElementById("dev-by").innerHTML = "<em>Développé par</em>";
        document.getElementById("in-partner").innerHTML = "<em>En partenariat avec</em>";
    } else if (result == 'No') {
        console.log("Translating to EN");
        document.getElementById("welcome").innerHTML = "Welcome to the";
        document.getElementById("atlas-title").innerHTML = "Atlas Web Application";
        // document.getElementById("city-button-cta").innerHTML = "<em>Select Cities and Click Start</em>";
        // document.getElementById("start-button").innerHTML = "<a onclick=\"openCityTabs();\"><i class=\"fas fa-forward-fast\"></i>Start</a>";
        document.getElementById("dev-by").innerHTML = "<em>Developed by</em>";
        document.getElementById("in-partner").innerHTML = "<em>In partnership with</em>";
    }
}

function FRAtlasPage() {
    console.log("Translating Atlas Page...");
    FRCityInfo();
}

function FRTutorial() {

}

function FRCityInfo() {
    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';

    console.log("Result", result);

    if (result == 'Yes') {
        console.log("Translating to FR");
        document.getElementById("cn-text").innerHTML = "Nom de la ville";
        document.getElementById("city-area").innerHTML = "Aire : ";
        document.getElementById("city-population").innerHTML = "Population en mil : ";
        document.getElementById("city-density").innerHTML = "Densité : ";
        document.getElementById("avail-transit-text").innerHTML = "Modes de transport disponibles : ";

    } else if (result == 'No') {
        console.log("Translating to EN");
        document.getElementById("cn-text").innerHTML = "City Name";
        document.getElementById("city-area").innerHTML = "Area: ";
        document.getElementById("city-population").innerHTML = "Population in mil: ";
        document.getElementById("city-density").innerHTML = "Density: ";
        document.getElementById("avail-transit-text").innerHTML = "Available Transit Modes: ";
    }
}