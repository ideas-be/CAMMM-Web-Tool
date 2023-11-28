function FRLandingPage() {

    // var welcomeHTML = document.getElementById("welcome").innerHTML;

    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';

    console.log("Result", result);

    if (result == 'Yes') {
        console.log("Translating to FR");
        document.getElementById("welcome").innerHTML = "Bienvenue chez";
    } else if (result == 'No') {
        console.log("Translating to EN");
        document.getElementById("welcome").innerHTML = "Welcome to the";
    }

    // console.log("Welcome HTML", welcomeHTML);
}