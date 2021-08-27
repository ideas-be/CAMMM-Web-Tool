**Next meeting** on the 27th of August

**Here is the link to see the website proper:**
https://spatialretrace.github.io/CAMMM-Web-Tool/

**Here is the link to the Miro board:**
https://miro.com/app/board/o9J_kgmIpbw=/

### Preview:
![CAMMM Web Atlas](screenshots/01_June03.png)

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
Look at line 175 for inject slider function
Check the CITY.JS on line 257, good luck from FN and OOM from the pastb


#Flow of functions inside **City.JS**

1. **load cumulative layers function**
    1.  loops the radio list with the status of the radio buttons, 
    2.  if radio button is true, it loops through the list of corresponding layers and truns them on until the current slider value
    3.  
    
   