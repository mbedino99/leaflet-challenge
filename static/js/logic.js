// Load earthquake data from the USGS GeoJSON feed (replace with your dataset URL)
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(response => response.json())
    .then(data => {
        // Loop through the earthquake data and create markers
        data.features.forEach(feature => {
            var coordinates = feature.geometry.coordinates;
            var magnitude = feature.properties.mag;
            var depth = coordinates[2];

            // Create a marker with popup
            var marker = L.circleMarker([coordinates[1], coordinates[0]], {
                radius: (magnitude * 5),
                fillColor: getMarkerColor(depth),
                color: 'gray',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            }).bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km`);

            // Add the marker to the map
            marker.addTo(map);
        });
    });

// Create a map centered at a specific location and with an initial zoom level
var map = L.map('map').setView([37.09, -95.71], 4);  

// Add a tile layer for the base map (you can choose a different one)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


// Define a function to determine marker color based on earthquake depth
function getMarkerColor(depth) {
    if (depth < 15) {
        return 'red'} 
    else if (depth < 30) {
        return 'orange'} 
    else if (depth < 45) {
        return 'yellow'} 
    else if (depth < 60) {
        return 'green'} 
    else {
        return 'lightblue'}
}


// Create a legend
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var depths = [0, 15, 30, 45, 60];
    var labels = ['red', 'orange', 'yellow', 'green','light blue'];

    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + labels[i] + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
    }

    return div;
};
legend.addTo(map);
