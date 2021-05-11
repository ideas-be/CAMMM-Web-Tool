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

function show_popup() {
    var infoPopUp = document.getElementById("hover_info_popup");

    // infoPopUp.classList.toggle("show");
    var popupDisplay = infoPopUp.style.display;
    if (popupDisplay == 'none') {
        infoPopUp.style.display = 'block';
    } else if (popupDisplay == 'block') {
        infoPopUp.style.display = 'none';
    }
    console.log("This is the showpopup function");
}