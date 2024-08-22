// add color to the tutorial text
// make nodes common term - maintain same language
var tutorialPrompts = [
    {
        topic: "intro-prompt",
        textEN: "Hi, would you like to go through a tutorial of the atlas?",
        textFR: "Bonjour, voulez-vous un tutoriel de l\'atlas ?",
        buttonsEN: ["Yes", "No"],
        buttonsFR: ["Oui", "Non"],
        position: [45, 20],
        arrow: null
    },
    {
        topic: "top-bar",
        textEN: "Let\'s take a look at the features of this atlas. On the top bar, you will find the name of the city or region that is currently displayed in the atlas.",
        textFR: "Jetons un coup d\'œil aux fonctions de cet atlas. Dans la barre supérieure, vous trouverez le nom de la ville ou région affiché dans l\'atlas.",
        buttonsEN: ["Previous", "Next"],
        buttonsFR: ["Précédent", "Suivant"],
        position: [45, 5],
        arrow: "up"
    },
    {
        topic: "mapbox-section",
        textEN: "This section of the atlas displays the current city map which has been developed using MapBox Studio.",
        textFR: "Cette section de l\'atlas présente la carte actuelle de la ville, qui a été développée à l\'aide du logiciel MapBox Studio.",
        buttonsEN: ["Previous", "Next"],
        buttonsFR: ["Précédent", "Suivant"],
        position: [60, 5],
        arrow: "left"
    },
    {
        topic: "borough-polygons",
        textEN: "The map contains polygons like these that represent the bounds of the boroughs in the city. Clicking on it will give you borough-level information about the transit network.",
        textFR: "La carte contient des polygones comme ceux-ci qui représentent les limites des arrondissements de la ville. En cliquant dessus, vous obtiendrez des informations sur le réseau de transport en commun au niveau de l\'arrondissement.",
        buttonsEN: ["Previous", "Next"],
        buttonsFR: ["Précédent", "Suivant"],
        position: [5, 10],
        arrow: "down"
    },
    {
        topic: "node-points-1",
        textEN: "Each of the boroughs contain pink and orange dots that represent the nodes of the transit network. The pink dots mark the hubs which combine rail and road based systems and orange dots mark the clusters which combine road based systems like bus.",
        textFR: "Chacun des arrondissements contient des points roses et orange qui représentent les nodes du réseau de transport en commun. Les points roses marquent les hubs qui combinent les systèmes ferroviaires et routiers. Les points orange indiquent les pôles qui combinent les systèmes routiers et les bus.",
        buttonsEN: ["Previous", "Next"],
        buttonsFR: ["Précédent", "Suivant"],
        position: [5, 35],
        arrow: "right"
    },
    {
        topic: "node-points-2",
        textEN: "Clicking on the hub or cluster nodes will provide node-level information of the transit system. Hubs have a buffer of 800 m for analysis and clusters have 400 m, which is the average 5 min walking distance from a node.",
        textFR: "En cliquant sur les hubs ou cluster nodes, vous obtiendrez des informations sur le système de transit au niveau des nodes. Les nœuds ont un tampon de 800 m pour l\'analyse et les clusters ont 400 m, ce qui correspond à la distance moyenne de marche à partir d\'un node.",
        buttonsEN: ["Previous", "Next"],
        buttonsFR: ["Précédent", "Suivant"],
        position: [5, 35],
        arrow: "right"
    },
    {
        topic: "side-bar",
        textEN: "The sidebar pops up each time you interact with the borough polygons or the node points. This section provides information at the borough and node levels based on analysis queries applied on the transit network.",
        textFR: "La barre latérale apparaît à chaque fois que vous interagissez avec les polygones de l\'arrondissement ou les nodes points. Cette section fournit des informations au niveau des arrondissements et des nodes, basées sur des requêtes d\'analyse appliquées au réseau de transport en commun.",
        buttonsEN: ["Previous", "Next"],
        buttonsFR: ["Précédent", "Suivant"],
        position: [35, 10],
        arrow: "right"
    },
    {
        topic: "end-prompt",
        textEN: "You\'re all set! Would you like to end this atlas tutorial?",
        textFR: "Vous êtes prêt ! Souhaitez-vous terminer ce tutoriel sur l\'atlas ?",
        buttonsEN: ["Yes", "No"],
        buttonsFR: ["Oui", "Non"],
        position: [45, 20],
        arrow: null
    },
];

function startTutorial() {
    // Start the tutorial from icon click
    // Display intro or specific prompt based on current UI interaction
    // if()
}

function displayIntroPrompt() {

    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';

    document.getElementById("atlas-tutorial-overlay").style.display = 'block';

    var tutorialbtn1 = document.getElementById("button-1");
    var tutorialbtn2 = document.getElementById("button-2");

    if (result == 'Yes') {
        console.log("Translating tutorial to FR.");
        document.getElementById("tutorial-text").innerHTML = tutorialPrompts[0].textFR;
        tutorialbtn1.innerHTML = tutorialPrompts[0].buttonsFR[0];
        tutorialbtn2.innerHTML = tutorialPrompts[0].buttonsFR[1];
    } else if (result == 'No') {
        console.log("Translating tutorial to EN.");
        document.getElementById("tutorial-text").innerHTML = tutorialPrompts[0].textEN;
        tutorialbtn1.innerHTML = tutorialPrompts[0].buttonsEN[0];
        tutorialbtn2.innerHTML = tutorialPrompts[0].buttonsEN[1];
    }

    tutorialbtn1.onclick = function () { displayNextPrompt(); };
    tutorialbtn2.onclick = function () { closeTutorialPrompt(); };

}

function closeTutorialPrompt() {
    document.getElementById("atlas-tutorial-overlay").style.display = 'none';
}

function displayPreviousPrompt() {
    console.log("Displaying the previous prompt!!!");

    var currentPrompt = document.getElementById("tutorial-text").innerHTML;
    console.log("Current Prompt is: ", currentPrompt);
    var promptIndex = Number(getPromptIndex(currentPrompt));
    console.log("Index of Current Prompt is: ", promptIndex);

    // Change the position of the arrows and prompts
    var arrowSectionDiv = document.getElementById("tutorial-arrow-section");
    var tutorialBoxDiv = document.getElementById("tutorial-prompt-box");
    var promptPosition = tutorialPrompts[promptIndex - 1].position;

    arrowSectionDiv.style.marginLeft = promptPosition[0].toString() + "%";
    arrowSectionDiv.style.marginTop = promptPosition[1].toString() + "%";

    insertArrow(promptIndex - 1);

    tutorialBoxDiv.style.marginLeft = promptPosition[0].toString() + "%";
    tutorialBoxDiv.style.marginTop = promptPosition[1].toString() + "%";

    var tutorialbtn1 = document.getElementById("button-1");
    var tutorialbtn2 = document.getElementById("button-2");

    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';
    if (result == "Yes") {
        document.getElementById("tutorial-text").innerHTML = tutorialPrompts[promptIndex - 1].textFR;
        tutorialbtn1.innerHTML = tutorialPrompts[promptIndex - 1].buttonsFR[0];
        tutorialbtn2.innerHTML = tutorialPrompts[promptIndex - 1].buttonsFR[1];
    }
    else if (result == "No") {
        document.getElementById("tutorial-text").innerHTML = tutorialPrompts[promptIndex - 1].textEN;
        tutorialbtn1.innerHTML = tutorialPrompts[promptIndex - 1].buttonsEN[0];
        tutorialbtn2.innerHTML = tutorialPrompts[promptIndex - 1].buttonsEN[1];
    }

    tutorialbtn1.onclick = function () {
        clickBtn1(tutorialbtn1.innerHTML, document.getElementById("tutorial-text").innerHTML);
    };
    tutorialbtn2.onclick = function () {
        clickBtn2(tutorialbtn2.innerHTML, document.getElementById("tutorial-text").innerHTML);
    };
}

function displayNextPrompt() {
    console.log("Displaying the next prompt!!!");

    var currentPrompt = document.getElementById("tutorial-text").innerHTML;
    console.log("Current Prompt is: ", currentPrompt);
    var promptIndex = Number(getPromptIndex(currentPrompt));
    console.log("Index of Current Prompt is: ", promptIndex);

    // Change the position of the prompts
    var arrowSectionDiv = document.getElementById("tutorial-arrow-section");
    var tutorialBoxDiv = document.getElementById("tutorial-prompt-box");
    var promptPosition = tutorialPrompts[promptIndex + 1].position;

    arrowSectionDiv.style.marginLeft = promptPosition[0].toString() + "%";
    arrowSectionDiv.style.marginTop = promptPosition[1].toString() + "%";

    insertArrow(promptIndex + 1);

    tutorialBoxDiv.style.marginLeft = promptPosition[0].toString() + "%";
    tutorialBoxDiv.style.marginTop = promptPosition[1].toString() + "%";

    var tutorialbtn1 = document.getElementById("button-1");
    var tutorialbtn2 = document.getElementById("button-2");

    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';
    if (result == "Yes") {
        document.getElementById("tutorial-text").innerHTML = tutorialPrompts[promptIndex + 1].textFR;
        tutorialbtn1.innerHTML = tutorialPrompts[promptIndex + 1].buttonsFR[0];
        tutorialbtn2.innerHTML = tutorialPrompts[promptIndex + 1].buttonsFR[1];
    }
    else if (result == "No") {
        document.getElementById("tutorial-text").innerHTML = tutorialPrompts[promptIndex + 1].textEN;
        tutorialbtn1.innerHTML = tutorialPrompts[promptIndex + 1].buttonsEN[0];
        tutorialbtn2.innerHTML = tutorialPrompts[promptIndex + 1].buttonsEN[1];
    }

    tutorialbtn1.onclick = function () {
        clickBtn1(tutorialbtn1.innerHTML, document.getElementById("tutorial-text").innerHTML);
    };
    tutorialbtn2.onclick = function () {
        clickBtn2(tutorialbtn2.innerHTML, document.getElementById("tutorial-text").innerHTML);
    };

}

function clickBtn1(btnText, promptText) {
    if ((btnText == "Yes") && (promptText == "You\'re all set! Would you like to end this atlas tutorial?")) {

        console.log("Reached end prompt: ", promptText);
        closeTutorialPrompt();

    }
    else if ((btnText == "Oui") && (promptText == "Vous êtes prêt ! Souhaitez-vous terminer ce tutoriel sur l\'atlas ?")) {

        console.log("Reached end prompt: ", promptText);
        closeTutorialPrompt();

    }
    else if ((btnText == "Yes") && (promptText == "Hi, would you like to go through a tutorial of the atlas?")) {
        displayNextPrompt();
    }
    else if ((btnText == "Oui") && (promptText == "Bonjour, voulez-vous un tutoriel de l\'atlas ?")) {
        displayNextPrompt();
    }
    else {
        displayPreviousPrompt();
    }
}

function clickBtn2(btnText, promptText) {
    if ((btnText == "No") && (promptText == "You\'re all set! Would you like to end this atlas tutorial?")) {

        console.log("Reached end prompt: ", promptText);
        displayPreviousPrompt();

    }
    else if ((btnText == "Non") && (promptText == "Vous êtes prêt ! Souhaitez-vous terminer ce tutoriel sur l\'atlas ?")) {

        console.log("Reached end prompt: ", promptText);
        displayPreviousPrompt();

    }
    else if ((btnText == "No") && (promptText == "Hi, would you like to go through a tutorial of the atlas?")) {
        closeTutorialPrompt();
    }
    else if ((btnText == "Non") && (promptText == "Bonjour, voulez-vous un tutoriel de l\'atlas ?")) {
        closeTutorialPrompt();
    }
    else {
        displayNextPrompt();
    }
}

function getPromptIndex(promptText) {
    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';
    if (result == "Yes") {
        for (prompt in tutorialPrompts) {
            if (tutorialPrompts[prompt].textFR == promptText) {
                return prompt;
            }
        }
    } else if (result == "No") {
        for (prompt in tutorialPrompts) {
            if (tutorialPrompts[prompt].textEN == promptText) {
                return prompt;
            }
        }
    }
}

function insertArrow(index) {
    // Render fontawesome arrow on prompt box
    if (document.getElementById("tutorial-box-arrow") != null) {
        document.getElementById("tutorial-box-arrow").remove();
    }

    var arrowSectionDiv = document.getElementById("tutorial-arrow-section");

    var arrowHTML = "";

    switch (tutorialPrompts[index].arrow) {
        case "right":
            arrowHTML = "<i id=\"tutorial-box-arrow\" class=\"fas fa-arrow-right-long\"></i>";
            break;
        case "left":
            arrowHTML = "<i id=\"tutorial-box-arrow\" class=\"fas fa-arrow-left-long\"></i>";
            break;
        case "up":
            arrowHTML = "<i id=\"tutorial-box-arrow\" class=\"fas fa-arrow-up-long\"></i>";
            break;
        case "down":
            arrowHTML = "<i id=\"tutorial-box-arrow\" class=\"fas fa-arrow-down-long\"></i>";
            break;
        default: console.log("error finding arrow!");
    }

    arrowSectionDiv.innerHTML += arrowHTML;
}

function displaySpecificPrompt(topic) {
    // Pass the topic value and display the corresponding prompt
    var specificPrompt;
    var result = document.getElementsByClassName("switch-input")[0].checked ? 'Yes' : 'No';
    if (result == "Yes") {
        console.log("Current tutorial prompt is in FR!");
        for (prompt in tutorialPrompts) {
            if (tutorialPrompts[prompt].textFR == topic) {
                specificPrompt = tutorialPrompts[prompt];
            }
        }
        document.getElementById("tutorial-text").innerHTML = specificPrompt.textFR;

        var tutorialbtn1 = document.getElementById("button-1");
        tutorialbtn1.innerHTML = specificPrompt.buttonsFR[0];
        tutorialbtn1.onclick = function () { displayPreviousPrompt(); };

        var tutorialbtn2 = document.getElementById("button-2");
        tutorialbtn2.innerHTML = specificPrompt.buttonsFR[1];
        tutorialbtn2.onclick = function () { closeNextPrompt(); };
    } else if (result == "No") {
        console.log("Current tutorial prompt is in EN!");
        for (prompt in tutorialPrompts) {
            if (tutorialPrompts[prompt].textEN == topic) {
                specificPrompt = tutorialPrompts[prompt];
            }
        }
        document.getElementById("tutorial-text").innerHTML = specificPrompt.textEN;

        var tutorialbtn1 = document.getElementById("button-1");
        tutorialbtn1.innerHTML = specificPrompt.buttonsEN[0];
        tutorialbtn1.onclick = function () { displayPreviousPrompt(); };

        var tutorialbtn2 = document.getElementById("button-2");
        tutorialbtn2.innerHTML = specificPrompt.buttonsEN[1];
        tutorialbtn2.onclick = function () { closeNextPrompt(); };
    }

}