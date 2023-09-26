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
    dissipating: false,
    map: map,
  });



  document
    .getElementById("toggle-heatmap")
    .addEventListener("click", toggleHeatmap);
  document
    .getElementById("change-gradient")
    .addEventListener("click", changeGradient);
  document
    .getElementById("change-opacity")
    .addEventListener("click", changeOpacity);
  document
    .getElementById("change-radius")
    .addEventListener("click", changeRadius);
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];

  heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
  heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
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