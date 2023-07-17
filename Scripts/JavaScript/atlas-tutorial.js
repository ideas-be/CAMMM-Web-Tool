// add color to the tutorial text
// make nodes common term - maintain same language
var tutorialPrompts = [
    {
        topic: "intro-prompt",
        text: "Hi, would you like to go through a tutorial of the atlas?",
        buttons: ["Yes", "No"],
        position: [45, 20],
        arrow: null
    },
    {
        topic: "top-bar",
        text: "Let\'s take a look at the features of this atlas. On the top bar, you will find the name of the city or region that is currently displayed in the atlas.",
        buttons: ["Previous", "Next"],
        position: [45, 5],
        arrow: "up"
    },
    {
        topic: "mapbox-section",
        text: "This section of the atlas displays the current city map which has been developed using MapBox Studio.",
        buttons: ["Previous", "Next"],
        position: [60, 5],
        arrow: "left"
    },
    {
        topic: "borough-polygons",
        text: "The map contains polygons like these that represent the bounds of the boroughs in the city. Clicking on it will give you borough-level information about the transit network.",
        buttons: ["Previous", "Next"],
        position: [5, 10],
        arrow: "down"
    },
    {
        topic: "node-points-1",
        text: "Each of the boroughs contain pink and orange dots that represent the nodes of the transit network. The pink dots mark the hubs which combine rail and road based systems and orange dots mark the clusters which combine road based systems like bus.",
        buttons: ["Previous", "Next"],
        position: [5, 35],
        arrow: "right"
    },
    {
        topic: "node-points-2",
        text: "Clicking on the hub or cluster nodes will provide node-level information of the transit system. Hubs have a buffer of 800 m for analysis and clusters have 400 m, which is the average 5 min walking distance from a node.",
        buttons: ["Previous", "Next"],
        position: [5, 35],
        arrow: "right"
    },
    {
        topic: "side-bar",
        text: "The sidebar pops up each time you interact with the borough polygons or the node points. This section provides information at the borough and node levels based on analysis queries applied on the transit network.",
        buttons: ["Previous", "Next"],
        position: [35, 10],
        arrow: "right"
    },
    {
        topic: "end-prompt",
        text: "You\'re all set! Would you like to end this atlas tutorial?",
        buttons: ["Yes", "No"],
        position: [45, 20],
        arrow: null
    },
];

function displayIntroPrompt() {
    document.getElementById("atlas-tutorial-overlay").style.display = 'block';

    document.getElementById("tutorial-text").innerHTML = tutorialPrompts[0].text;

    var tutorialbtn1 = document.getElementById("button-1");
    tutorialbtn1.innerHTML = tutorialPrompts[0].buttons[0];
    tutorialbtn1.onclick = function () { displayNextPrompt(); };

    var tutorialbtn2 = document.getElementById("button-2");
    tutorialbtn2.innerHTML = tutorialPrompts[0].buttons[1];
    tutorialbtn2.onclick = function () { closeTutorialPrompt(); };
}

function displayTutorialPrompts() {
    console.log("Tutorial Prompts are: ");
    for (prompt in tutorialPrompts) {
        console.log("Prompt: ");
        console.log(tutorialPrompts[prompt].text);
    }
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

    document.getElementById("tutorial-text").innerHTML = tutorialPrompts[promptIndex - 1].text;

    var tutorialbtn1 = document.getElementById("button-1");
    tutorialbtn1.innerHTML = tutorialPrompts[promptIndex - 1].buttons[0];
    tutorialbtn1.onclick = function () {
        clickBtn1(tutorialbtn1.innerHTML, document.getElementById("tutorial-text").innerHTML);
    };

    var tutorialbtn2 = document.getElementById("button-2");
    tutorialbtn2.innerHTML = tutorialPrompts[promptIndex - 1].buttons[1];
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

    document.getElementById("tutorial-text").innerHTML = tutorialPrompts[promptIndex + 1].text;

    var tutorialbtn1 = document.getElementById("button-1");
    tutorialbtn1.innerHTML = tutorialPrompts[promptIndex + 1].buttons[0];
    tutorialbtn1.onclick = function () {
        clickBtn1(tutorialbtn1.innerHTML, document.getElementById("tutorial-text").innerHTML);
    };

    var tutorialbtn2 = document.getElementById("button-2");
    tutorialbtn2.innerHTML = tutorialPrompts[promptIndex + 1].buttons[1];
    tutorialbtn2.onclick = function () {
        clickBtn2(tutorialbtn2.innerHTML, document.getElementById("tutorial-text").innerHTML);
    };
}

function clickBtn1(btnText, promptText) {
    if ((btnText == "Yes") && (promptText == "You\'re all set! Would you like to end this atlas tutorial?")) {

        console.log("Reached end prompt: ", promptText);
        closeTutorialPrompt();

    } else if ((btnText == "Yes") && (promptText == "Hi, would you like to go through a tutorial of the atlas?")) {
        displayNextPrompt();
    } else {
        displayPreviousPrompt();
    }
}

function clickBtn2(btnText, promptText) {
    if ((btnText == "No") && (promptText == "You\'re all set! Would you like to end this atlas tutorial?")) {

        console.log("Reached end prompt: ", promptText);
        displayPreviousPrompt();

    } else if ((btnText == "No") && (promptText == "Hi, would you like to go through a tutorial of the atlas?")) {
        closeTutorialPrompt();
    } else {
        displayNextPrompt();
    }
}

function getPromptIndex(promptText) {
    for (prompt in tutorialPrompts) {
        if (tutorialPrompts[prompt].text == promptText) {
            return prompt;
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