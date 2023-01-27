var nodeProperties = fetchNodeProps();

function displayAccessibilityGraphs() {
    // TODO: Display bar graphs depicting accessible stops/stations at node

    // Calculate and display accessibility for bus stops
    var busAccessibility = nodeProperties.AccessibilityIndex.Bus;
    var accessibleBus = 0;
    for (i = 0; i < busAccessibility.length; i++) {
        if (busAccessibility[i] == 1) {
            accessibleBus += 1;
        }
    }
    console.log(accessibleBus, " out of ", busAccessibility.length, " bus stops are accessible!!");

    // Calculate and display accessibility for metro stations
    var metroAccessibility = nodeProperties.AccessibilityIndex.Metro;
    var accessibleMetro = 0;
    for (i = 0; i < metroAccessibility.length; i++) {
        if (metroAccessibility[i] == 1) {
            accessibleMetro += 1;
        }
    }
    console.log(accessibleMetro, " out of ", metroAccessibility.length, " metro stations are accessible!!");

}

function calAccessibility() {
    // TODO: Calculate Accessibility rating for node
}