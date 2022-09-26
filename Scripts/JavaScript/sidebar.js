var myJson1, myJson2;

function newJson1(obj) {
    myJson1 = obj;
    console.log("Initializing new POI Json obj");
    // console.log(myJson1);
}
function newJson2(obj) {
    myJson2 = obj;
    console.log("Initializing new Services Json obj");
    // console.log(myJson2);
}

var isOpened = true;

const openSidebar = (desc, stview) => {
    if (isOpened) {
        // console.log(desc);
        var sidebarDiv = document.getElementById("mySidebar");
        // var windowWidth = window.MediaQueryList.windowWidth;
        sidebarDiv.style.width = "300px";
        // toString(windowWidth * 0.3);
        document.getElementById("main").style.marginRight = "300px";
        sidebarDiv.innerHTML = stview + desc;
        isOpened = false;
    } else {
        var sidebarDiv = document.getElementById("mySidebar");
        sidebarDiv.style.width = "0";
        sidebarDiv.innerHTML = "";
        document.getElementById("main").style.marginRight = "0";
        isOpened = true;
    }

};