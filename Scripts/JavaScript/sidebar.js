var isOpened = true;

const openSidebar = (desc) => {
    if (isOpened) {
        console.log(desc);
        var sidebarDiv = document.getElementById("mySidebar");
        // var windowWidth = window.MediaQueryList.windowWidth;
        sidebarDiv.style.width = "250px";
        // toString(windowWidth * 0.3);
        document.getElementById("main").style.marginRight = "250px";
        sidebarDiv.innerHTML = desc;
        isOpened = false;
    } else {
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "0";
        sidebarDiv.innerHTML = "";
        document.getElementById("main").style.marginRight = "0";
        isOpened = true;
    }

};