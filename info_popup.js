// $(window).load(function () {
//     $(".trigger_info_popup").click(function () {
//         $('.hover_info_popup').show();
//     });
//     $('.hover_info_popup').click(function () {
//         $('.hover_info_popup').hide();
//     });
//     $('.popupCloseButton').click(function () {
//         $('.hover_info_popup').hide();
//     });
// });


console.log("popupDisplay", popupDisplay);

function show_popup() {

    var infoPopUp = document.getElementById("hover_info_popup");
    var popupDisplay = infoPopUp.style.display;

    if (popupDisplay == 'none') {
        infoPopUp.style.display = 'block';
        console.log("Turning on popup div");
    }
    // else if (popupDisplay == 'block') {
    //     infoPopUp.style.display = 'none';
    //     console.log("Turning off popup div");
    // }
    console.log("This is the showpopup function");
}

function hide_popup() {

    var infoPopUp = document.getElementById("hover_info_popup");
    var popupDisplay = infoPopUp.style.display;

    if (popupDisplay == 'block') {
        infoPopUp.style.display = 'none';
        console.log("Turning off popup div");
    }

    console.log("This is the hidepopup function");
}