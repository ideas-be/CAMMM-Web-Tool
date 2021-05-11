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
    var infoPopUp = document.getElementsByClassName("hover_info_popup");
    infoPopUp.classList.toggle("show");
    console.log("This is the showpopup function");
}