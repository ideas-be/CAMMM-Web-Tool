var myJson;
// , myJson2;

function newJson(obj) {
    myJson = obj;
    console.log("Initializing new Node Json obj");
    // console.log(myJson);
    // console.log(myJson1);
}
// function newJson2(obj) {
//     myJson2 = obj;
//     console.log("Initializing new Services Json obj");
//     // console.log(myJson2);
// }

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

function getClusters() {
    var clusterList = [];
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        if (myJson.features[i].properties.Type == "Cluster")
            clusterList.push(myJson.features[i]);
    }
    return (clusterList);
}

function getHubs() {
    var hubList = [];
    // console.log(myJson);
    for (i = 0; i < myJson.features.length; i++) {
        if (myJson.features[i].properties.Type == "Hub")
            hubList.push(myJson.features[i]);
    }
    return (hubList);
}