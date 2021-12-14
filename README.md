# Currently working on: 
Keep working on Documentation - Styling Guide for map layers and Troubleshooting section

# Documentation:

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
        <li><a href="#how-to-write-docs">How to write the documentation</a></li>
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
        <li><a href="#styling-map-layers">Styling Map Layers</a></li>
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
        <li><a href="#appendix-b">Appendix C - Troubleshooting</a></li>
      </ul>
    </li>
  </ol>
</details>


----------------------------------------------------------------------

<!-- ACTUAL DOCUMENTATION -->
----------------------------------------------------------------------


<div id="about-the-project">

## About

  #### CAMMM Web Atlas Tool
  https://github.com/ideas-be/CAMMM-Web-Tool/tree/cumulative-testing
  **Here is the link to see the website proper:**
  https://ideas-be.github.io/CAMMM-Web-Tool/
  **Here is the link to the Miro board:**
  https://miro.com/app/board/o9J_kgmIpbw=/
  #### Preview:
  ![CAMMM Web Atlas](screenshots/01_June03.png)

  <div id="ideas-be">
  
  ### IDEAS-BE
  
  </div>

  <div id="cammm-project-web-atlas">
  
  ### CAMMM Project & Web Atlas
  
  </div>

  <div id="contributors">
  
  ### Contributors
  
  </div>

  <div id="license-funding">

  ### License & Funding

  <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>

  </div>

</div>
----------------------------------------------------------------------

<div id="getting-started">

## Section 1 - Getting Started

  <div id="software-requirements">

  ### Software Requirements

  </div>
  
  <div id="how-to-write-docs">

  ### How to write the documentation

  </div>
  
  <div id="useful-links">
  
  ### Useful Links

  #### Mapbox
  **Style URL example**
  mapbox://styles/carmela-cucuzzella/ckguxoar50i7w19qyf3c6qsdg
  
  </div>
        

</div>
----------------------------------------------------------------------

<div id="processing-tool">

## Section 2 - Processing Tool

  <div id="use-proc-tool">
  
  ### Use of the Processing Tool
  </div>
  
  <div id="data-collection">
  
  ### Data Collection
  </div>
  
  <div id="op-functions">
  
  ### Operational Functions
  </div>
  
  <div id="key-functions">
  
  ### Analysis Functions
  </div>
  
  <div id="processed-data-mapbox">
  
  ### Processed Data for Mapbox & City Metrics
  </div>

</div>
----------------------------------------------------------------------

<div id="using-mapbox">

## Section 3 - Using Mapbox

  <div style="padding: 20px; background-color: grey;"><a href ="https://en.wikipedia.org/wiki/Mapbox">Mapbox</a> is a provider of custom online maps for websites and applications. Inside of Mapbox, it is possible to manage geospatial data and design custom map styles.</div>
  <br/>Mapbox is the creator of, or a significant contributor to, some open source mapping libraries and applications. Mapbox uses anonymised data from geolocation services such as OpenStreetMap, Strava, RunKeeper, etc.
  <br/>
  <br/>We use Mapbox to host the processed data from the selected cities. This is done using the Mapbox <a href="https://studio.mapbox.com/">Studio</a> using the IDEAS-BE credentials. Each city map is called a <em>Style</em> inside of Mapbox and all the data is stored in form of <em>Tilesets</em>. The upload format is a custom version of Geo-JSON. (Check <a href="#appendix-b">Appendix B</a> for example.) The processing software delivers in ready to be uplodaded files.
  
  <div id="create-city-map">

  ### Creating a City Map
  The mpas that contatin all the processed data for each city are created following these 2 main steps:

    TL//DR
    - Upload the necessary .geojson files as _Tilesets_ in Mapbox

    - Create a new style 
    
  -------------------------------------------------------------
  
  The city maps in MapBox are made by creating a Style and then uploading the corresponding Tileset for the map using drag and drop. To make the Tileset, the <a href="#processing-tool">Processing Tool</a> needs to be used.
  <br/>
  
  **Steps to upload the map:**

    - In the MapBox Studio, go to the Tileset section and select New Tileset.
  
  ![Creating City Map Screenshot 1](screenshots/githubDocs/creatingCityMap1.png)

    - Upload the file containing the data you wish to display on the map.
  
  ![Creating City Map Screenshot 2](screenshots/githubDocs/creatingCityMap2.png)

  ![Creating City Map Screenshot 3](screenshots/githubDocs/creatingCityMap3.png)

    - The upload will report success on the bottom right corner of the website. (see Troubleshoot section if the upload fails)

  ![Creating City Map Screenshot 4](screenshots/githubDocs/creatingCityMap4.png)

    - Once all the data is in Tileset a new map can be created. Inside of Mapbox, the Styles are the 'maps'.
    - Click the New Stule button.

  ![Creating City Map Screenshot 5](screenshots/githubDocs/creatingCityMap5.png)

    - Select the appropriate temple, for this project we have used the 'Basic' as is.

  ![Creating City Map Screenshot 6](screenshots/githubDocs/creatingCityMap6.png)

    - Once you landed on the map, you have to go to the plus icon on the top left side. There you will add the Tileset with the processed data.

  ![Creating City Map Screenshot 7](screenshots/githubDocs/creatingCityMap7.png)

    - An alternative list of the tileset already loaded can be seen by changin from Components to Layers in the top left side.

  ![Creating City Map Screenshot 8](screenshots/githubDocs/creatingCityMap8.png)
  
    - After pressing the plus button (top-left), in the Source section you click on the 'None Selected'.

  ![Creating City Map Screenshot 9](screenshots/githubDocs/creatingCityMap9.png)

    - Navigate to the desired Tileset, you may also use the search bar with the name of the Tileset.

  ![Creating City Map Screenshot 10](screenshots/githubDocs/creatingCityMap10.png)

    - Change the Type as needed. View style guidelines for layer maps. 

  ![Creating City Map Screenshot 11](screenshots/githubDocs/creatingCityMap11.png)

  ![Creating City Map Screenshot 12](screenshots/githubDocs/creatingCityMap12.png)

  

  </div>

  <div id="styling-map-layers">
  
  ### Styling Map Layers

> What is a style?<br/>
> A Mapbox style is a JSON object that defines exactly how a map should be drawn. It defines almost everything related to a map's appearance. Every map depends on a style, so when you change a map style, any map that uses that style will be affected by your changes upon its next load.
>Style layers give sources a visual appearance by specifying which layout and paint properties Mapbox GL should apply. These properties include colors, fonts, line widths, layer order, and more.

<br/>For the Mapbox documentation click <a href="https://docs.mapbox.com/help/getting-started/map-design/#what-is-a-style">here</a>.


<br/>The styling of the uploaded layers containing the layers that compose the atlas must follow one of the folloing guides:

 #### Discrete layer (five categories): <br/>

  The atlas uses a series of predefined *Icons* for each catergory in each of the five types of transit systems the atlas includes. These are customized versions from the <a href="https://fontawesome.com/v5.15/icons/bus?style=solid">FontAwesome</a>. These are modified using a vector-based software such as InkScape or Adobe Illustrator. Each specific category layer of a transit system displays the corresponding icon in a color gradient that represents the value of that datapoint. The gradient goes from *very high* to *very low*.<br/>

  ![Map Transit Icons](screenshots/githubDocs/mapTransitIcons.PNG)
  
  For example, the *Bus* transit system in its *low* category is represented with the color <div style="background-color: #fca9adff; font-weight: bold;">#fca9adff</div>
  The current icon and color shceme can be found in the Teams folder (see <a href="#software-requirements">Section 1</a>): </br>
  >CAMMMM Web Atlas 0.1 > Production > <a href="https://teams.microsoft.com/_#/school/files/CAMMM%20Web%20Atlas?threadId=19%3A2234b6cfce40493aa81f7ff81b9143cc%40thread.tacv2&ctx=channel&context=Icons&rootfolder=%252Fteams%252FCAMMM%252FShared%2520Documents%252FCAMMM%2520Web%2520Atlas%25200.1%252FProduction%252FIcons">Icons</a>

  -The following example shows how the layer named *montreal_D_CL* is styled. For the layer to have the functionality in the atlas it needs to be replicated five (5) times, each one of the copies corresponding to one category of the analysis. <br/>

  ![Styling a Layer Screenshot 1](screenshots/githubDocs/stylingLayer1.png) <br/>
  
  <br/>The workflow to add a custom icon requires the user to (1)set the desired variable to be mapped, (2)set the data condition for the category of the variable to be mapped and, (3)uplod the custom icon image file. These are the following steps in the workflow:<br/>

  - First, you have to select the **Icon** tab under the name of the layer. This tab is located in between the *Text* and *Position* tabs. <br/>
  ![Uploading an Icon 1](screenshots/githubDocs/iconUpload1.png) <br/>

  - Once in the Icon tab, you select **Style with data condition**.<br/>
  ![Uploading an Icon 2](screenshots/githubDocs/iconUpload2.png)<br/>
  
  - In the pop-up that appears, you select the variable&mdash;in this case, CatClossnes&mdash;to map. In the following pop-up that appears in the top right, you select the corresponding value that will be listed&mdash;in this case, 3.<br/>
  ![Uploading an Icon 3](screenshots/githubDocs/iconUpload3.png)<br/>
  
  - Finally, to upload the custom icon image to this category, you navigate to the *Image* section under the Icon tab and select the **Add or remove images** under *Custom*. A new pop-up with the upload button will appear. </br> 
  ![Uploading an Icon 4](screenshots/githubDocs/iconUpload4.png)<br/>

<!-- WORK MORE ON STYLING FOR EACH INDIVIDUAL LAYER -->

  </div>
  
  <div id="integrate-web-atlas">
  
  ### Integrating to Web Atlas
 
 The MapBox is integrated into the UI of the CAMMM Atlas Web Application as follows:
 -Ensure that the map created in MapBox Studio has been _published_
 -Go to the Embed menu and copy the **Style URL** associated with the map
  Here is a sample syntax of the URL: _mapbox://styles/**user-name**/**style-url**_

  </div>

  </div>
----------------------------------------------------------------------

<div id="model-city-object">

## Section 4 - Modelling City Object(JS)

  <div id="city-metrics-data">

  ### City Metrics Data

  </div>

  <div id="city-object-parameters">

  ### Parameters

  </div>

  <div id="city-object-functions">

  ### Functions

  #### ORDER of functions inside City object

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

  #### Flow of functions inside **City.JS**

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

  </div>

</div>
----------------------------------------------------------------------

<div id="develop-atlas-ui">

## Section 5 - Developing the Web Atlas UI

  <div id="ui-layout-html">

  ### UI Layout in HTML

  </div>

  <div id="script-web-atlas">

  ### Scripting the Web Atlas

  </div>

  <div id=styling-manual">

  ### Styling Manual

  </div>

</div>
----------------------------------------------------------------------

<div id="appendix">

## Appendix

  <div id="appendix-a">

  ### Appendix A - Maintaining GitHub Repo & Page

  </div>

  <div id="appendix-b">

  ### Appendix B - Managing Development Workflow

  <!-- ### CAMMM Atlas Gantt Chart Summer 2021: -->
  #### User scale Flowchart:
  ![CAMMM Web Atlas](screenshots/Flowchart_CAMMM_Web_Atlas.jpg)

  #### City Catalogue Update Flowchart:
  ![CAMMM City Catalogue](screenshots/Flowchart_City_Catalog.jpg)

  #### CAMMM Atlas Info Pop-Ups:
  ![CAMMM Atlas Popups](screenshots/PopUps.png)

  #### For next session 

  **CAMMM Web Atlas Updates**

   - ~~align mapboxes and menu items of both cities~~
   - ~~make wireframe with named menu items~~
   - move print and export citation buttons at top right corner, one below the other
   - test a collapsable text box for citations
   - short description on WP project page
   - more documentation for the entire process so far
   - ~~menu items: increase font and space them out~~
   - piecharts for distribution of stops, line and dist. between stops for each transit system

  #### For next month:
   - figure out graphical representation of city metrics
   - density grid analysis to be added in queries
   - add button to download excel of metrics (tbd)
   - integrating businesses data points for each city and adding them to metrics

  </div>

</div>
----------------------------------------------------------------------