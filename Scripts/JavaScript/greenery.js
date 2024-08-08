var boroughGreenFeatures = [];
var greenJSON = [];

function loadGreeneryData() {
    boroughGreenFeatures = [];
    var categoryTotal = 0;
    greenJSON = readGeoJsonObj("greenery.geojson");
    console.log("Greenery JSON is: ", greenJSON);
    for (greenFeature in greenJSON.features) {
        if (greenJSON.features[greenFeature].properties.NOM == boroughQueryProps.NOM) {
            boroughGreenFeatures.push(greenJSON.features[greenFeature]);
            categoryTotal += greenJSON.features[greenFeature].properties.Category;
            // add category values here for rating average
        }

    }

    console.log("Green Features inside Selected Borough are: ", boroughGreenFeatures);

    var GreeneryRating = (categoryTotal / boroughGreenFeatures.length) * 2;

    displayBoroughQueryRating(GreeneryRating.toFixed(0));
    renderGreenNodes();
    displayGreenNodeBarGraphs();
}

function renderGreenNodes() {
    map.loadImage('Images/tree-solid.png', (error, image) => {
        if (error) throw error;
        map.addImage('tree-icon', image, { 'sdf': true });

        map.addSource('borough-green-nodes', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': boroughGreenFeatures,
            }
        });
        map.addLayer({
            'id': 'borough-green-nodes',
            'source': 'borough-green-nodes',
            'type': 'symbol',
            'layout': {
                'icon-image': 'tree-icon',
                'icon-size': 0.05,
                // 'icon-offset': ["literal", [-10, -10]]
            },
            'paint': {
                'icon-color': [
                    'match',
                    ['get', 'Category'],
                    1, '#d7191c',
                    2, '#fdae61',
                    3, '#ffffc0',
                    4, '#a6d96a',
                    5, '#1a9641',
                    '#333333'
                ],
            }
        }
        );
    });
}

function displayGreenNodeBarGraphs() {

    // console.log("sparseBarWidth", sparseBarWidth);

    var sparseFeatures = 0;
    var fairFeatures = 0;
    var moderateFeatures = 0;
    var goodFeatures = 0;
    var denseFeatures = 0;

    console.log("sparseFeatures", sparseFeatures);

    // TODO: Update Boroughs for New Greenery Data in 5 cities

    for (greenFeature in boroughGreenFeatures) {
        switch (boroughGreenFeatures[greenFeature].properties.Category) {
            case 1: sparseFeatures += 1;
                break;
            case 2: fairFeatures += 1;
                break;
            case 3: moderateFeatures += 1;
                break;
            case 4: goodFeatures += 1;
                break;
            case 5: denseFeatures += 1;
                break;
            default:
        }
    }

    // Display the bar graph with numbers of nodes
    var sparseBarWidth = (sparseFeatures / boroughGreenFeatures.length) * 1100;
    var fairBarWidth = (fairFeatures / boroughGreenFeatures.length) * 1100;
    var moderateBarWidth = (moderateFeatures / boroughGreenFeatures.length) * 1100;
    var goodBarWidth = (goodFeatures / boroughGreenFeatures.length) * 1100;
    var denseBarWidth = (denseFeatures / boroughGreenFeatures.length) * 1100;


    // Greenery Bar Graph HTML
    var greeneryBarGraphHTML = "<div class=\"bar-graph\" id=\"sparse-coverage\" style=\"width: " + sparseBarWidth + "px;\"><span class=\"coverage-type\">Sparse Coverage</span><span class=\"node-number\">" + sparseFeatures + "</span></div>" +
        "<div class=\"bar-graph\" id=\"fair-coverage\" style=\"width: " + fairBarWidth + "px;\"><span class=\"coverage-type\">Fair Coverage</span><span class=\"node-number\">" + fairFeatures + "</span></div>" +
        "<div class=\"bar-graph\" id=\"moderate-coverage\" style=\"width: " + moderateBarWidth + "px;\"><span class=\"coverage-type\">Moderate Coverage</span><span class=\"node-number\">" + moderateFeatures + "</span></div>" +
        "<div class=\"bar-graph\" id=\"good-coverage\" style=\"width: " + goodBarWidth + "px;\"><span class=\"coverage-type\">Good Coverage</span><span class=\"node-number\">" + goodFeatures + "</span></div>" +
        "<div class=\"bar-graph\" id=\"dense-coverage\" style=\"width: " + denseBarWidth + "px;\"><span class=\"coverage-type\">Dense Coverage</span><span class=\"node-number\">" + denseFeatures + "</span></div>";


    document.getElementById("borough-query-info").innerHTML = greeneryBarGraphHTML + "</div><p id=\"greenery-graph-title\">Number of Nodes by Greenery Index</p>";


    console.log("sparseFeatures", sparseFeatures);
    // console.log("sparseBarWidth", sparseBarWidth);
}