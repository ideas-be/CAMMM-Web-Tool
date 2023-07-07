var tutorialPrompts = [
    {
        topic: "intro-prompt",
        text: "Hi, would you like to go through a tutorial of the atlas?",
        buttons: ["Yes", "No"],
        position: [45, 20]
    },
    {
        topic: "top-bar",
        text: "Let\'s take a look at the features of this atlas. On the top bar, you will find the name of the city or region that is currently displayed in the atlas.",
        buttons: ["Previous", "Next"],
        position: [45, 5]
    },
    {
        topic: "mapbox-section",
        text: "This section of the atlas displays the current city map which has been developed using MapBox Studio.",
        buttons: ["Previous", "Next"],
        position: [60, 5]
    },
    {
        topic: "borough-polygons",
        text: "The map contains polygons like these that represent the bounds of the boroughs in the city. Clicking on it will give you borough-level information about the transit network.",
        buttons: ["Previous", "Next"],
        position: [5, 10]
    },
    {
        topic: "node-points-1",
        text: "Each of the boroughs contain pink and orange dots that represent the nodes of the transit network. The pink dots mark the hubs which combine rail and road based systems and orange dots mark the clusters which combine road based systems like bus.",
        buttons: ["Previous", "Next"],
        position: [5, 35]
    },
    {
        topic: "node-points-2",
        text: "Clicking on the hub or cluster nodes will provide node-level information of the transit system. Hubs have a buffer of 800 m for analysis and clusters have 400 m, which is the average 5 min walking distance from a node.",
        buttons: ["Previous", "Next"],
        position: [5, 35]
    },
    {
        topic: "side-bar",
        text: "The sidebar pops up each time you interact with the borough polygons or the node points. This section provides information at the borough and node levels based on analysis queries applied on the transit network.",
        buttons: ["Previous", "Next"],
        position: [35, 10]
    },
    {
        topic: "end-prompt",
        text: "You\'re all set! Would you like to end this atlas tutorial?",
        buttons: ["Yes", "No"],
        position: [45, 20]
    },
];

var tutorialTextDiv = document.getElementsByClassName("tutorial-text");
var tutorialBtn1 = document.getElementById("button-1");
var tutorialBtn1 = document.getElementById("button-2");

function displayIntroPrompt() {
    document.getElementById("atlas-tutorial-overlay").style.display = 'block';
    // tutorialTextDiv.innerHTML = tutorialPrompts[0].text;
    tutorialTextDiv = tutorialPrompts[0].text;
    console.log("Tutorial Prompt Text: ", tutorialPrompts[0].text);
    console.log("Tutorial text div: ", tutorialTextDiv);
    // tutorialBtn1.innerHTML = tutorialPrompts[0].buttons[0];
    // tutorialBtn2.innerHTML = tutorialPrompts[0].buttons[1];
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