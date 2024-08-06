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
    FRBoroughSidebar();
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
        document.getElementById("city-area-unit").innerHTML = " km2";
        document.getElementById("city-population").innerHTML = "Population en millions : ";
        document.getElementById("city-density").innerHTML = "Densité : ";
        document.getElementById("city-density-unit").innerHTML = " peuple/km2";
        document.getElementById("avail-transit-text").innerHTML = "Modes de transport disponibles : ";

    } else if (result == 'No') {
        console.log("Translating to EN");
        document.getElementById("cn-text").innerHTML = "City Name";
        document.getElementById("city-area").innerHTML = "Area: ";
        document.getElementById("city-area-unit").innerHTML = " sq.km.";
        document.getElementById("city-population").innerHTML = "Population in mil: ";
        document.getElementById("city-density").innerHTML = "Density: ";
        document.getElementById("city-density-unit").innerHTML = " people/sq.km.";
        document.getElementById("avail-transit-text").innerHTML = "Available Transit Modes: ";
    }
}

function FRBoroughSidebar() {
    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';

    console.log("Result", result);

    if (result == 'Yes') {
        console.log("Translating to FR");
        document.getElementById("borough-name-text").innerHTML = "Nom de l'arrondissement";
        document.getElementById("borough-area-text").innerHTML = "Aire : ";
        document.getElementById("borough-area-unit").innerHTML = " m2";
        document.getElementById("borough-hub-text").innerHTML = "Nombre de « hubs » : ";
        document.getElementById("borough-clusters-text").innerHTML = "Nombre de « clusters » : ";
        document.getElementById("borough-dropbtn-query").innerHTML = "Sélectionner la requête";
        boroughQueryDropDownFR();
        // FRQueryRating();

    } else if (result == 'No') {
        console.log("Translating to EN");
        document.getElementById("borough-name-text").innerHTML = "Borough Name";
        document.getElementById("borough-area-text").innerHTML = "Area: ";
        document.getElementById("borough-area-unit").innerHTML = " sq.m.";
        document.getElementById("borough-hub-text").innerHTML = "Number of Hubs: ";
        document.getElementById("borough-clusters-text").innerHTML = "Number of Clusters: ";
        boroughQueryDropDownEN();
        document.getElementById("borough-dropbtn-query").innerHTML = "Select Query";
    }
}

function FRQueryRating() {

    console.log("Translating Query Rating to FR");

    var currentRating = document.getElementById("rating-words").innerHTML;

    switch (currentRating) {
        case "Needs to Improve": currentRating = "Doit s'améliorer";
            break;
        case "Good": currentRating = "Bien";
            break;
        case "Very Good": currentRating = "Très bien";
            break;
        case "Excellent": currentRating = "Excellent";
            break;

        default: console.log("Error reading query rating.");
    }

    document.getElementById("rating-words").innerHTML = currentRating;
}

function FRQueryInfo() {
    FRQueryRating();
    var currentQuery = document.getElementById("borough-dropbtn-query").innerHTML;

    switch (currentQuery) {
        case "Multimodalité":
            console.log("translating query info for multimodality");
            document.getElementById("mode-carousel-title").innerHTML = "Modes de transport disponibles";
            break;
        case "Diversité des services et commodités":
            console.log("translating query info for diversity of services");
            FRServices();
            document.getElementById("services-bargraph-title").innerHTML = "Types de services";
            break;
        case "Proximité des services et commodités":
            console.log("translating query info for closeness of services");
            FRServices();
            document.getElementById("services-bargraph-title").innerHTML = "Distance aux services en m";
            break;
        case "Conception universelle et accessibilité":
            console.log("translating query info for accessibility");
            document.getElementById("accessibility-graph-title").innerHTML = "Accessibilité aux fauteuils roulants";
            break;
        case "Connectivité des transports en commun": break;
        case "Verdure": break;
        default: console.log("Error reading query!!!");
    }
}

function FRServices() {
    var serviceTypesHTML = document.getElementsByClassName("service-type");
    console.log("Translating service types on bar graph");
    for (i = 0; i < 3; i++) {
        switch (serviceTypesHTML[i].innerHTML) {
            case "Primary":
                serviceTypesHTML[i].innerHTML = "Primaire";
                break;
            case "Secondary":
                serviceTypesHTML[i].innerHTML = "Secondaire"; break;
            case "Tertiary":
                serviceTypesHTML[i].innerHTML = "Tertiaire"; break;
            default: console.log("Error reading service type!!!");
        }
    }

    document.getElementById("avail-services-text").innerHTML = "Services et commodités disponibles";
}