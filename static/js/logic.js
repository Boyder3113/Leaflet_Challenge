// Set URL Variables
var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var plate_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// set marker size based on magnitude
function markerSize(magnitude) {
    return magnitude * 4;
};

//create first map layer
var earthquakeweek = new L.LayerGroup();

d3.json(earthquake_url, function (geoJson) {
    L.geoJSON(geoJson.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 0.7,
                weight: 0.1,
                color: 'black'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(earthquakeweek);
    createMap(earthquakeweek);
});

var faultline = new L.LayerGroup();

d3.json(plate_url, function (geoJson) {
    L.geoJSON(geoJson.features, {
        style: function (geoJsonFeature) {
            return {
                weight: 2,
                color: 'yellow'
            }
        },
    }).addTo(faultline);
})

function Color(magnitude) {
    if (magnitude > 5) {
        return '#FF8C00'
    } else if (magnitude > 4) {
        return 'red'
    } else if (magnitude > 3) {
        return 'darkorange'
    } else if (magnitude > 2) {
        return 'yellow'
    } else if (magnitude > 1) {
        return 'lightyellow'
    } else {
        return 'green'
    }
};