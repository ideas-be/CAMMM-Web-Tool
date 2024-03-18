function insertSidebarCard() {
    var sidebarSection = document.getElementById("sidebar-section");
    var sidebarCard = "";
    for (i = 0; i < 3; i++) {

        if (i == 0) {
            sidebarCard = "<div class=\"sidebar-card\">" +
                "<p>This is where the sidebar " + (i + 1) + " info goes.</p><a id=\"menu-button\" onclick=\"openOverlayMenu();\">Menu</a></div>";
        } else {
            sidebarCard = "<div class=\"sidebar-card\">" +
                "<p>This is where the sidebar " + (i + 1) + " info goes.</p></div>";
        }

        sidebarSection.innerHTML += sidebarCard;
    }
}

function openOverlayMenu() {
    var overlayMenuSection = document.getElementById("overlay-menu-section");
    overlayMenuSection.style.display = "block";
    var menuOption = "";
    for (i = 0; i < 3; i++) {
        menuOption = "<div class=\"overlay-menu-option\">Option " + (i + 1) + "<hr></div>";
        overlayMenuSection.innerHTML += menuOption;
    }
}

function closeOverlayMenu() {
    var overlayMenuSection = document.getElementById("overlay-menu-section");
    overlayMenuSection.style.display = "none";
    overlayMenuSection.innerHTML = "<a class=\"close-button\" onclick=\"closeOverlayMenu();\">x</a>";
}