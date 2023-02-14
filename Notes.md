Drop your notes here:

### Figure out how to automate the collection of embed codes for Streetview (OOM)
Sample embed code:
<iframe src="https://www.google.com/maps/embed?pb=!4v1674230436200!6m8!1m7!1sNqHRqKsEalobZHhpUMmOaQ!2m2!1d45.3919748033253!2d-75.7207963323827!3f329.2174!4f0!5f0.7820865974627469" width="600" height="450" style="border:0;"></iframe>

# Layer dictionary 

The lines file is the file that contains the spatial representation of the routes in the transit system.
This file has the following properties per feature or object:
    - "Route"
    - "Direction"

Inside of the file it looks like this 

``` json
    "type": "Feature",
    "properties": {
    "Route": "1",  <--- "Route"
    "Direction": "0"
    },
    "geometry": {
    "coordinates": 
    [
       [-73.603118,45.446466],   [-73.593242,45.451158], 

```



The field "Route" matches the routes contained in the file "general.geojson" with in each of the conatined stops per feature per transit type

``` json
    Example 1:
           "MetroData": {
          "65": [
            "2"  <--- "Route"
          ] 

    Example 2:
            "BusData": {
          "60290": [
            "64" <--- "Route"
          ],
```

Example for the network analysis json

``` json
{
  "features": [
    {
        "Id": "1",  
        "Centrality": 5,
        "Closeness" : 8,
        "EigenVect" : 2
    },
    {
        "Id": "21",  
        "Centrality": 7,
        "Closeness" : 5,
        "EigenVect" : 3
    },{
     }
 ]
}

```


# Connectivity Metrics Icons
Centrality - <i class="fa-solid fa-arrows-to-circle"></i>
Closeness - <i class="fa-solid fa-timeline"></i>
Betweenness - <i class="fa-solid fa-circle-nodes"></i>


# For Monday 
- GO back to the excel of the queries and see what we need to implement in the UI
- Implement services in the UI
- show lines on the map
  - and isolate elements https://docs.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/
