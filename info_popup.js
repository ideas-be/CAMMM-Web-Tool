function show_citation(){
    var citationTextDiv= document.getElementById('citationText');
    var citationDisplay = citationTextDiv.style.display;

    if (citationDisplay == 'none') {
        citationTextDiv.style.display = 'block';
        console.log("Turning on citation text div");
    }else{
        citationTextDiv.style.display = 'none';
        console.log("Turning off citation text div");
    }
}

function show_popup(popUpNum) {
    var popUpID = "hover_info_popup"+popUpNum;

    var infoPopUp = document.getElementById(popUpID);
    var popupDisplay = infoPopUp.style.display;

    if (popupDisplay == 'none') {
        infoPopUp.style.display = 'block';
        console.log("Turning on popup div");
    }
    console.log("This is the showpopup function");
}

function hide_popup() {
    var popUpID = "hover_info_popup"+popUpNum;
    var infoPopUp = document.getElementById("hover_info_popup");
    var popupDisplay = infoPopUp.style.display;

    if (popupDisplay == 'block') {
        infoPopUp.style.display = 'none';
        console.log("Turning off popup div");
    }

    console.log("This is the hidepopup function");
}