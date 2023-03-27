var boroughProperties;


function openBoroughSidebar(boroughProps) {

    boroughProperties = boroughProps;
    console.log(boroughProperties);

    var sidebarDiv = document.getElementById("myBoroughSidebar");

    sidebarDiv.style.width = "300px";
    sidebarDiv.style.padding = "20px";
    document.getElementById("map").style.marginRight = "300px";

    // TODO: Display Borough Info Here
    var boroughInfoHTML = "<p>Borough Name</p><h2 id=\"borough-name\">" + boroughProperties.NOM + "</h2>" +
        "<div id=\"borough-area\"><p>Area: <strong>" + boroughProperties.AIRE + " sq.m. </strong></p><div>";
    document.getElementById("borough-info").innerHTML += boroughInfoHTML;

};

function closeBoroughSidebar() {

    zoomOutBorough();
    var sidebarDiv = document.getElementById("myBoroughSidebar");

    sidebarDiv.style.color = "#ffffff";
    sidebarDiv.style.width = "0";
    sidebarDiv.style.padding = "0";

    document.getElementById("main").style.marginRight = "0";
    document.getElementById("borough-info").innerHTML = "";

    setTimeout(hideSelectedBorough, 100);
    setTimeout(showBoroughs, 100);
}

function zoomOutBorough() {

    console.log("Closing Borough Sidebar!!!");

    map.flyTo({
        'center': [-73.624701, 45.525104],
        'zoom': 11.44, 'pitch': 0,
        // 'bearing': 90,
        'speed': 0.2,
        'curve': 1,
        'duration': 2000,
        'essential': true,
        'easing': function (t) {
            return t;
        }
    });
}