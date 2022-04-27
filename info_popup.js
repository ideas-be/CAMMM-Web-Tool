function show_citation() {
    var citationTextDiv = document.getElementById('citationText');
    var citationDisplay = citationTextDiv.style.display;

    if (citationDisplay == 'none') {
        citationTextDiv.style.display = 'block';
        console.log("Turning on citation text div");
    } else {
        citationTextDiv.style.display = 'none';
        console.log("Turning off citation text div");
    }
}

function show_popup(popUpNum) {
    var popUpID = "hover_info_popup" + popUpNum;

    var infoPopUp = document.getElementById(popUpID);
    var popupDisplay = infoPopUp.style.display;

    if (popupDisplay == 'none') {
        infoPopUp.style.display = 'block';
        console.log("Turning on popup div");
    }
    console.log("This is the showpopup function");
}

function hide_popup(popUpNum) {
    var popUpID = "hover_info_popup" + popUpNum;
    var infoPopUp = document.getElementById(popUpID);
    var popupDisplay = infoPopUp.style.display;

    if (popupDisplay == 'block') {
        infoPopUp.style.display = 'none';
        console.log("Turning off popup div");
    }

    console.log("This is the hidepopup function");
}

var infoPopup1HTML = "<div class=\"hover_info_popup\" id=\"hover_info_popup1\" style=\"display: none; \">" + "<span class=\"helper\" ></span>" +
    "<div style=\"overflow-y: scroll; height: 500px;\">" +
    "<div class=\"popupCloseButton\" onclick=\"hide_popup(1);\">&times;</div>" +
    "<h3>About</h3>" +
    "<p>Welcome to the CAMMM Atlas Web Application, developed by IDEAS-BE (Integrated Design and Sustainability for the Built Environment). This tool is a work-in-progress and part of the research project titled, CoLLaboratoire for Activating Multi-modal Mobility (CAMMM): One Public Space at a Time, in order to compare the transit systems between each city and critically reflect on mobility in the city." +
    "<br />" +
    "<br /><strong>License</strong>" +
    "<br />Add license here" +
    "<br />" +
    "<br /><strong>Disclaimer of city data sources + link to resources for all cities in the Atlas</strong>" +
    "<br />" +
    "<br /><strong>Lead of Project</strong>" +
    "<br /><a href=\"https://www.concordia.ca/finearts/design/faculty.html?fpid=carmela-cucuzzella\">Dr.Carmela Cucuzzella, Ph.D.</a> [Professor, Design and Computation Arts; Concordia University Research Chair in Integrated Design And Sustainability for the Built Environment (IDEAS-BE); Founding Co-Director, Next Generation Cities Institute]" +
    "<br />" +
    "<br /><strong>Author Information</strong>" +
    "<br /><a href=\"https://www.concordia.ca/finearts/design/faculty.html?fpid=carmela-cucuzzella\">Carmela Cucuzzella</a> is lead coordinator of the Atlas Web Application and surrounding technical infrastructure." +
    "< br />" +
    "<br /><a href=\"https://www.concordia.ca/faculty/pierre-gauthier.html\">Pierre Gauthier</a> is advisor on urban morphological aspects of each city represented on the atlas." +
    "< br />" +
    "<br /><a href=\"https://ideas-be.ca/student/omar-ortiz-meraz/\">Omar Ortiz Meraz</a> is the back end and lead GIS programmer for all queries displayed on the atlas." +
    "< br />" +
    "<br /><a href=\"https://ideas-be.ca/student/firdous-nizar-phd/\">Firdous Nizar</a> is the lead front end developer for the web application interface." +
    "< br />" +
    "<br /><strong>Processing Tool Information</strong>" +
    "<br />Brief Description of Tool and description of the queries." +
    "< br />" +
    "<br /><strong>Related research</strong>" +
    "<br />List of links to PG research + student uses & feedback, etc." +
    "< br />" +
    "<br /><strong>Wiki-Docs</strong>" +
    "<br />Add link here" +
    "< br />" +
    "<br />DISCLAIMER: The data shown in the atlas reflects the information provided in GTFS format by the transport agencies managing the public transit locally in each city.These files are obtained from the official websites corresponding to each city, or internet aggregators.Therefore, accuracy of the data displayed is out of the scope of this research tool.The authors cannot guarantee the precision of this data." +
    "</p >" +
    "</div >" +
    "</div >";

var infoPopup2HTML = "<div class=\"hover_info_popup\" id=\"hover_info_popup2\" style=\"display: none;\">" + "< span class=\"helper\" ></span >" +
    "<div>" +
    "<div class=\"popupCloseButton\" onclick=\"hide_popup(2);\">&times;</div>" +
    "<h3>Cities Selection</h3>" +
    "<p><strong>Extent and Scope of Atlas</strong>" +
    "<br>Description of the cities under analysis, cities with similar population to MTL." +
    "<br>" +
    "<br><strong>Catalogue of Processed Cities </strong>" +
    "<br>Add explanation of the following selected cities:" +
    "<ul>"
"<li>Montreal</li>" +
    "<li>Barcelona</li>" +
    "<li>Budapest</li>" +
    "<li>Quebec City</li>" +
    "<li>Vienna</li>" +
    "</ul>" +
    "<br>" +
    "<br><strong>Live list of Cities-in-progress</strong>" +
    "<br>Add explanation of upcoming cities:" +
    "<ul>" +
    "<li>Laval</li>" +
    "<li>Melbourne</li>" +
    "<li>Stockholm</li>" +
    "<li>Oslo</li>" +
    "</ul>" +
    "</p>" +
    "</div>" +
    "</div>";

var infoPopup3HTML = "<div class=\"hover_info_popup\" id=\"hover_info_popup3\" style=\"display: none; \">"
    + "< span class=\"helper\" ></span >" +
    "<div style=\"overflow-y: scroll; height: 500px;\">" +
    "<div class=\"popupCloseButton\" onclick=\"hide_popup(3);\">&times;</div>" +
    "<h3>Map Menu</h3>" +
    "<p>Introduction of how to use these menu items: left-to-right, etc. (written in reference to snapshot)" +
    "<br>" +
    "<br><em style=\"color: lightcoral;\">Labelled Snapshot </em>" +
    "<br>" +
    "<br><strong>Select Query</strong>" +
    "<br>Add explanation on why we are selecting a query (need to add citations)" +
    "<br>" +
    "<br>The query list includes:" +
    "<ol>" +
    "<li>Centrality degree is associated with how accessible the rest of the network is, with respect to a given node. This means that this query evaluates the ease of a trip from the given node to any other point in the network and vice versa.</li>" +
    "<li>Closeness degree measures the desirability of a given node in being included in a particular trip inside the network. A node with a higher value of closeness centrality will imply that it is more frequented during trips inside the network.</li>" +
    "</ol>" +
    "<br>" +
    "<br><strong>Select Analysis Type</strong>" +
    "<br>Add explanation on why we are selecting a type of analysis" +
    "<br>" +
    "<br>The types of analysis include:" +
    "<ol>" +
    "<li>Direct: queries applied directly applied to the transit network.</li>" +
    "<li>Node: queries applied to nodes that aggregates points of access/transfer/connections in the network based on their geography.</li>" +
    "</ol>" +
    "<br>" +
    "<br><strong>Select Display Type</strong>" +
    "<br>Add explanation on why we are toggling the display type (explain what the layers mean)" +
    "<br>" +
    "<br>The types of display of the data points on the map include:" +
    "<ol>" +
    "<li>Stacked: Shows the data points on the map in incremental layers based on the value of the corresponding slider. For example, if the slider is on “3”, the map would display data points from layers 1, 2 and 3.</li>" +
    "<li>Single: Shows the data points on the map in individual layers based on the value of the corresponding slider. For example, if the slider is on “3”, the map would display data points from layer 3 only.</li>" +
    "</ol>" +
    "<br>" +
    "<br><strong>Slider and Legend (TBD)</strong>" +
    "<br>This slider is an interactive extension of the selected display type. The legend (color gradient) is a visual reflection of the selected query." +
    "</p>" +
    "</div>" +
    "</div>";

var infoPopup4HTML = "<div class=\"hover_info_popup\" id=\"hover_info_popup4\" style=\"display: none; \">" + "< span class=\"helper\" ></span >" +
    "<div>" +
    "<div class=\"popupCloseButton\" onclick=\"hide_popup(4);\">&times;</div>" +
    "<h3>City Metrics</h3" > +
    "<p>This contains a tabular description of the public transit networks servicing the city under analysis." +
    "<br>" +
    "<br>The available transit systems for each city are linked to the following signage:" +
    "<ol>" +
    "<li><i class=\"fas fa-bus\"></i> : Bus Network</li>" +
    "<li><i class=\"fas fa-train\"></i> : Heavy Rail, Trains, Interurbans, etc...</li>" +
    "<li><i class=\"fas fa-subway\"></i> : Metro/Subway systems, etc.</li>" +
    "<li><i class=\"fas fa-tram\"></i> : Tram, other types of light rail</li>" +
    "<li><i class=\"fas fa-taxi\"></i> : Other types of transportation: Funicular, Fixed route taxi service, Carriage, etc...</li>" +
    "</ol>" +
    "<br>" +
    "<br>The list of descriptors for each transit system includes:" +
    "<ul>" +
    "<li>Number of stops/stations, or points of access to the network </li>" +
    "<li>Number of lines in the system </li>" +
    "<li>Average distance between stops/stations</li>" +
    "</ul>" +
    "<br>" +
    "<br>DISCLAIMER: The data shown in the atlas reflects the information provided in GTFS format by the transport agencies managing the public transit locally in each city. These files are obtained from the official websites corresponding to each city, or internet aggregators. Therefore, accuracy of the data displayed is out of the scope of this research tool. The authors cannot guarantee the precision of this data." +
    "</p>" +
    "</div>" +
    "</div>";

function injectInfoPopupText() {
    for (i = 0; i < 3; i++) {
        var infoPopupDivID = "info_popup_" + (i + 1);
        console.log("infoPopupDivID", infoPopupDivID);
        switch (i + 1) {
            case 1: document.getElementById(infoPopupDivID).innerHTML = infoPopup1HTML;
                console.log("Injecting Pop up ", i + 1);
                break;
            case 2: document.getElementById(infoPopupDivID).innerHTML = infoPopup2HTML;
                console.log("Injecting Pop up ", i + 1);
                break;
            case 3: document.getElementById(infoPopupDivID).innerHTML = infoPopup3HTML;
                console.log("Injecting Pop up ", i + 1);
                break;
            // case 4: document.getElementById(infoPopupDivID).innerHTML = infoPopup4HTML;
            //     console.log("Injecting Pop up ", i + 1);
            //     break;
            default:
                console.log("pop up div does not exist");
                break;
        }
    }
}