// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=key&libraries=visualization">
import data from "./shapefile_FeaturesToJSO.json" assert {type: "json"}

let map, heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 40.506430072000171, lng: -74.249693143999934 },
    mapTypeId: "terrain",
  });


  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
  });

}

function getPoints() {
  const features = data["features"];
  const latlng = []
  for (let i = 0; i < features.length; i++) {

    latlng.push(new google.maps.LatLng(features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]))
  }

  return latlng;
}

window.initMap = initMap;