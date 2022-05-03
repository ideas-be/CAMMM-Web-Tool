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
    "<br /><strong>Lead of Project</strong>" +
    "<br /><a href=\"https://www.concordia.ca/finearts/design/faculty.html?fpid=carmela-cucuzzella\">Dr.Carmela Cucuzzella, Ph.D.</a> [Professor, Design and Computation Arts; Concordia University Research Chair in Integrated Design And Sustainability for the Built Environment (IDEAS-BE); Founding Co-Director, Next Generation Cities Institute]" +
    "<br />" +
    "<br /><strong>Author Information</strong>" +
    "<br /><a href=\"https://www.concordia.ca/finearts/design/faculty.html?fpid=carmela-cucuzzella\">Carmela Cucuzzella</a> is lead coordinator of the Atlas Web Application and surrounding technical infrastructure." +
    "<br /><a href=\"https://www.concordia.ca/faculty/pierre-gauthier.html\">Pierre Gauthier</a> is advisor on urban morphological aspects of each city represented on the atlas." +
    "" +
    "<br /><a href=\"https://ideas-be.ca/student/omar-ortiz-meraz/\">Omar Ortiz Meraz</a> is the back end and lead GIS programmer for all queries displayed on the atlas." +
    "" +
    "<br /><a href=\"https://ideas-be.ca/student/firdous-nizar-phd/\">Firdous Nizar</a> is the lead front end developer for the web application interface." +
    "" +
    "<br /><br /><strong>Processing Tool Information</strong>" +
    "<br />The CAMMM Atlas web application makes use of a Processing Tool to manage the data that goes into the creation and maintenance of the city maps. This python-based tool is to be used by the development team to process large amounts of city data into relevant file formats that could be read and displayed onto the atlas web application. The processing tool must be used when a new city needs to be added to the atlas, using the GTFS data for the respective city." +
    "<br /><br /><strong>Docs</strong>" +
    "<br /><a href=\"https://github.com/ideas-be/CAMMM-Web-Tool/tree/cumulative-testing#readme\">Read Here</a>  " +
    "" +
    "<br /><br /><strong>DISCLAIMER</strong>: The data shown in the atlas reflects the information provided in GTFS format by the transport agencies managing the public transit locally in each city.These files are obtained from the official websites corresponding to each city, or internet aggregators.Therefore, accuracy of the data displayed is out of the scope of this research tool.The authors cannot guarantee the precision of this data." +
    "<br /><br /><strong>License</strong>" +
    "<br />CAMMM Atlas Web Application<br />" +
    "Copyright (C) 2022, Carmela Cucuzzella<br /><br />" +
    "This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.<br /><br />" +
    "This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.<br /><br />" +
    "You should have received a copy of the GNU General Public License along with this program. If not, see <a href=\"https://www.gnu.org/licenses/\"> https://www.gnu.org/licenses/</a><br />" +
    "</p >" +
    "</div >" +
    "</div >";

var infoPopup2HTML = "<div class=\"hover_info_popup\" id=\"hover_info_popup2\" style=\"display: none;\">" + "<span class=\"helper\"></span>" +
    "<div>" +
    "<div class=\"popupCloseButton\" onclick=\"hide_popup(2);\">&times;</div>" +
    "<h3>Cities Selection</h3>" +
    "<p><strong>Extent and Scope of Atlas</strong>" +
    "<br>The CAMMM Atlas web application is an open-source research analysis tool that contains a collection of maps that compare public transit networks around the global north. The atlas covers a selection of cities that fit a pre-defined list of parameters." +
    "<br>" +
    "<br><strong>Catalogue of Processed Cities: </strong>" +
    "<ul>" +
    "<li>Montreal</li>" +
    "<li>Barcelona</li>" +
    "<li>Boston</li>" +
    "<li>Budapest</li>" +
    "<li>Laval</li>" +
    "<li>Longueuil</li>" +
    "<li>Quebec City</li>" +
    "<li>Seattle</li>" +
    "<li>Toronto*</li>" +
    "<li>Vancouver</li>" +
    "<li>Vienna</li>" +
    "</ul>" +
    "</p>" +
    "</div>" +
    "</div>";

var infoPopup3HTML = "<div class=\"hover_info_popup\" id=\"hover_info_popup3\" style=\"display: none; \">"
    + "<span class=\"helper\" ></span >" +
    "<div style=\"overflow-y: scroll; height: 500px;\">" +
    "<div class=\"popupCloseButton\" onclick=\"hide_popup(3);\">&times;</div>" +
    "<h3>Map Menu</h3>" +
    "<br><p><strong>Select Form of Analysis</strong>" +
    "<br>The types of analysis include:" +
    "<ol>" +
    "<li><strong>Individual:</strong> queries applied directly applied to the transit network.</li>" +
    "<li><strong>Cluster:</strong> queries applied to nodes that aggregates points of access/transfer/connections in the network based on their geography.</li>" +
    "</ol>" +
    "<br>" +
    "<br><strong>Select Query</strong>" +
    "<br>For the analysis, each metro station, bus/tram stop or other point of access to the transit network is treated as an individual object, i.e., node. The collection of all nodes and their relationships build the entire transit network. This network is the object of our research queries explored in the atlas. The query list includes:" +
    "<ol>" +
    "<li><strong>Node Centrality</strong> (shortest path) is associated with how accessible the rest of the network is, with respect to a given node. This means that this query evaluates the ease of a trip from the given node to any other point in the network and vice versa.</li>" +
    "<li><strong>Node Connectivity</strong> (closeness) measures the desirability of a given node in being included in a particular trip inside the network. A node with a higher value of closeness centrality will imply that it is more frequented during trips inside the network.</li>" +
    "<li><strong>Transit Network Density</strong> describes the density of bus/tram stops and metro/train stations across the built environment, following the natural angle of the urban fabric.</li>" +
    "</ol>" +
    "<br>" +
    "<br><strong>Display Query Type</strong>" +
    "<br>The query data points are stored in distinct layers. To interact with them, first, toggle the layer display type and then change the slider to show the respective data points." +
    "<br>" +
    "<br>The layers can be displayed in two ways:" +
    "<ol>" +
    "<li><strong>All Layers</strong>: Shows the data points on the map in incremental layers based on the value of the corresponding slider. For example, if the slider is on “3”, the map would display data points from layers 1, 2 and 3.</li>" +
    "<li><strong>Isolated Layer</strong>: Shows the data points on the map in individual layers based on the value of the corresponding slider. For example, if the slider is on “3”, the map would display data points from layer 3 only.</li>" +
    "</ol>" +
    "<br>" +
    "</p>" +
    "</div>" +
    "</div>";

var infoPopup4HTML = "<div class=\"hover_info_popup\" id=\"hover_info_popup4\" style=\"display: none; \">" + "<span class=\"helper\" ></span >" +
    "<div>" +
    "<div class=\"popupCloseButton\" onclick=\"hide_popup(4);\">&times;</div>" +
    "<h3>City Metrics</h3> " +
    "<p>This contains a tabular description of the public transit networks servicing the city under analysis." +
    "<br>" +
    "<br>The available transit systems for each city are linked to the following signage:" +
    "<ol>" +
    "<li><i class=\"fas fa-bus\"></i> : Bus Network</li>" +
    "<li><i class=\"fas fa-train\"></i> : Heavy Rail, Trains, Interurbans, etc...</li>" +
    "<li><i class=\"fas fa-subway\"></i> : Metro/Subway systems, etc.</li>" +
    "<li><i class=\"fas fa-cable-car\"></i> : Tram, other types of light rail</li>" +
    // "<li><i class=\"fas fa-taxi\"></i> : Other types of transportation: Funicular, Fixed route taxi service, Carriage, etc...</li>" +
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
    for (i = 0; i < 4; i++) {
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
            case 4: document.getElementById(infoPopupDivID).innerHTML = infoPopup4HTML;
                console.log("Injecting Pop up ", i + 1);
                break;
            default:
                console.log("pop up div does not exist");
                break;
        }
    }
}


