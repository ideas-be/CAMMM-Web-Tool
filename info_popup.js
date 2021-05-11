$(window).load(function () {
    $(".trigger_info_popup").click(function () {
        $('.hover_info_popup').show();
    });
    $('.hover_info_popup').click(function () {
        $('.hover_info_popup').hide();
    });
    $('.popupCloseButton').click(function () {
        $('.hover_info_popup').hide();
    });
});