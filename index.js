// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=key&libraries=visualization">
// import data from "./shapefile_FeaturesToJSO.json"

let map, heatmap;

async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 40.506430072000171, lng: -74.249693143999934 },
    mapTypeId: "terrain",
  });

  const data = await getPoints()

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: data,
    map: map,
  });

}


async function getPoints() {

  const resp = await fetch("shapefile_FeaturesToJSO.json");
  const data = await resp.json();
  const features = data["features"];
  const latlng = []
  for (let i = 0; i < features.length; i++) {

    latlng.push(new google.maps.LatLng(features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]))
    // console.log(features[i]["geometry"]["coordinates"]);
  }

  return latlng;
}

window.initMap = initMap;