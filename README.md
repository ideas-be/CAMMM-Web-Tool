## CAMMM Web Atlas Tool
https://github.com/ideas-be/CAMMM-Web-Tool/tree/cumulative-testing
**Here is the link to see the website proper:**
https://ideas-be.github.io/CAMMM-Web-Tool/
**Here is the link to the Miro board:**
https://miro.com/app/board/o9J_kgmIpbw=/
### Preview:
![CAMMM Web Atlas](screenshots/01_June03.png)

### Documentation:
<!-- TABLE OF CONTENTS (WIP) -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About</a>
      <ul>
        <li><a href="#ideas-be">IDEAS-BE</a></li>
        <li><a href="#cammm-project-web-atlas">CAMMM Project & Web Atlas</a></li>
        <li><a href="#contributors">Contributors</a></li>
        <li><a href="#license-funding">License & Funding</a></li>
        <li><a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Section 1 - Getting Started</a>
      <ul>
        <li><a href="#software-requirements">Software Requirements</a></li>
        <li><a href="#how-to-writ-docs"></a>How to write the documentation</li>
        <li><a href="#useful-links">Useful Links</a></li>
      </ul>
    </li>
    <li>
      <a href="#processing-tool">Section 2 - Processing Tool</a>
      <ul>
        <li><a href="#use-proc-tool">Use of the Processing Tool</a></li>
        <li><a href="#data-collection">Data Collection</a></li>
        <li><a href="#op-functions">Operational Functions</a></li>
        <li><a href="#key-functions">Analysis Functions</a></li>
        <li><a href="#processed-data-mapbox">Processed Data for Mapbox & City Metrics</a></li>
      </ul>
    </li>
    <li>
      <a href="#using-mapbox">Section 3 - Using Mapbox</a>
      <ul>
        <li><a href="#create-city-map">Creating a City Map</a></li>
        <li><a href="#integrate-web-atlas">Integrating to Web Atlas</a></li>
      </ul>
    </li>
    <li>
      <a href="#model-city-object">Section 4 - Modelling City Object(JS)</a>
      <ul>
        <li><a href="#city-metrics-data">City Metrics Data</a></li>
        <li><a href="#city-object-parameters">Parameters</a></li>
        <li><a href="#city-object-functions">Functions</a></li>
      </ul>
    </li>
    <li>
      <a href="#develop-atlas-ui">Section 5 - Developing the Web Atlas UI</a>
      <ul>
        <li><a href="#ui-layout-html">UI Layout in HTML</a></li>
        <li><a href="#script-web-atlas">Scripting the Web Atlas</a></li>
        <li><a href="#styling-manual">Styling Manual</a></li>
      </ul>
    </li>
    <li>
      <a href="#appendix">Appendix</a>
      <ul>
        <li><a href="#appendix-a">Appendix A - Maintaining GitHub Repo & Page</a></li>
        <li><a href="#appendix-b">Appendix B - Managing Development Workflow</a></li>
      </ul>
    </li>
  </ol>
</details>


----------------------------------------------------------------------

<!-- ACTUAL DOCUMENTATION -->
----------------------------------------------------------------------


<div id="about-the-project">

## About


</div>
----------------------------------------------------------------------

<div id="getting-started">

## Section 1 - Getting Started

</div>
----------------------------------------------------------------------

<div id="processing-tool">

## Section 2 - Processing Tool

</div>
----------------------------------------------------------------------

<div id="using-mapbox">

## Section 3 - Using Mapbox

</div>
----------------------------------------------------------------------

<div id="model-city-object">

## Section 4 - Modelling City Object(JS)

</div>
----------------------------------------------------------------------

<div id="develop-atlas-ui">

## Section 5 - Developing the Web Atlas UI

</div>
----------------------------------------------------------------------

<div id="appendix">

## Appendix

</div>
----------------------------------------------------------------------


----------------------------------------------------------------------

**Next meeting** on the 4th of October

<!-- ### CAMMM Atlas Gantt Chart Summer 2021: -->
### User scale Flowchart:
![CAMMM Web Atlas](screenshots/Flowchart_CAMMM_Web_Atlas.jpg)

### City Catalogue Update Flowchart:
![CAMMM City Catalogue](screenshots/Flowchart_City_Catalog.jpg)

### CAMMM Atlas Info Pop-Ups:
![CAMMM Atlas Popups](screenshots/PopUps.png)


Style URL example
mapbox://styles/carmela-cucuzzella/ckguxoar50i7w19qyf3c6qsdg


#TODO
· CHECK FILE City.js LINE 306!!!!!!!
· ROLL BACK THE CHANGE TO THE CITYMETRICS JS back to github
· Add the cumulative and category sliders
· Do content sensitive graduations [for the scale]

## For next session 

CAMMM Web Atlas Updates
-------------------------------

   - ~~align mapboxes and menu items of both cities~~
   - ~~make wireframe with named menu items~~
   - move print and export citation buttons at top right corner, one below the other
   - test a collapsable text box for citations
   - short description on WP project page
   - more documentation for the entire process so far
   - ~~menu items: increase font and space them out~~
   - piecharts for distribution of stops, line and dist. between stops for each transit system

## For next month:
   - figure out graphical representation of city metrics
   - density grid analysis to be added in queries
   - add button to download excel of metrics (tbd)
   - integrating businesses data points for each city and adding them to metrics

---
ORDER of functions inside City object
---
0. (98)constructor - Called when -the city object is created- where -inside the city object-
1. (111)readCityJson
2. (124)loadMap
3. (143)injectDirectNodeToggleHTML
4. (156)getDirectNodeToggle
5. (180)injectRadioButtons
6. (194)getRadioStatus
7. (208)injectCatCumulToggleHTML
8. (224)getCatCumulToggle
9. (245)injectCumulSlider
10. (269)injectCatSlider
11. ()turnOffAllLayers
12. ()loadCumulativeLayers
13. ()loadCategoryLayer
14. ()displayCityMetrics
---

**MAPBOX NOTE**: Changed Radius range: 1px to 4px

---
#Flow of functions inside **City.JS**

1. **readCityJson**
    1. Stores the values for the coordinates and the zoom in the city object from the JSON file

2. **loadMap**
    1. create themapbox container
    2. initializes new map with the city ural, coordinates, and zoom
    3. injects the mapsbox to display city map

3. **injectDirectNodeToggleHTML**
    1. inserts a unique Direct/Node HTML Toogle to each city
    2. on change it calls the function getDirectNodeToggle and passes the status of the toogle

4. **getDirectNodeToggle**
    1. The variable selAnalysis,
    2. Reads the values for the URL and list of layers, dependeing on the Value of selAnalysis (status of Toggle)
    3. if selAnalysis is True, then the cityURL and ListofLayers are read from **node** values inside Json object
    4. else, cityURL and ListofLayers are read from **direct** values inside Json object
    5. the functions loadMap and injectRadioButtons

 5. **Inject Radio buttons**
    1. the function takes city num and list of layers 
    2. initialize an hmtl variable that contations the injected radio buttons
    3. NameOfQueries is list of queries applied to the cities, it contains the names (of queries)
    4. a loop then goes thorugh the list of layers and display them as radio buttons
    5. inside the loop the radio buttons are injected, when clicked they call two functions: getRadioStatus and injectCatCumulToggleHTML

6. **getRadioStatus**
    1. a new arry is created, called radioList, it takes the status value of the selected radio button 
    2. using a loop, radioList stores true or false values based on the selected radio buttons

7. **injectCatCumulToggleHTML**
    1. inserts a unique Category/Cumulative HTML Toogle to each city
    2. on change it calls the function getCatCumulToggle and passes the status of the toggle

8. **getCatCumulToggle**
    1. Read the toogle value and if True, inject Category Slider and load layers accordingly 
    2. else, the cumulative slider is injected and layers are loaded accordingly 

9. **injectCumulSlider**
    0. Default position: For Cumul Slider, the head of the slider will be at the extreme right (highest value) to display all layers on map
    1. Based on the selected Query (Centrality or Closeness) the cumulative slider html is injected
    2. this slider contains values ranging from 1 to 5 with a step of one
    3. On change, the valirable: sliderValue from the city object gets the current slider value 
    4. The funcitons called are turn off all layerse and loadCumulativeLayers 

10. **injectCatSlider** NO WRITTEN AT THE MOMENT OF DOCUMENTATION 

11. **turnOffAllLayers**
    1. loops throught all layers and turns them off

12. **loadCumulativeLayers**
    1.  loops the radio list with the status of the radio buttons, 
    2.  if radio button is true, it loops through the list of corresponding layers and truns them on **until the current slider value** (using the variable sliderValue of city object)

13. **loadCategoryLayer**
    1. loops through all layers to find and turn on corresponding layer to current slider value 
    
14. **displayCityMetrics**
    1. contains list of icons and stop types for  each transist systems
    2. inject html for citymetricTable, it contains the number of stops, the number of lines, and the average distance between stops


Cumulative
Stacked

Category
Single