// modification de la carte sur web

//initialisation des variables 
var events = [];
var data = pois.features.properties
//var year = 1970;
var markers = L.markerClusterGroup({ spiderfyOnMaxZoom: false, disableClusteringAtZoom: 4 })

var attacksMarker = [];


// coordonnées
var mymap = new L.Map('map', {
  center: [46.712004980312685, 8.366493210196497],
  minZoom: 2,
  maxZoom: 13,
  zoom: 2
});

// fond de carte 
var osmLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
});

var esriImagery = L.tileLayer(
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; <a href="http://www.esri.com">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

osmLayer.addTo(mymap);

// Créer les boutons pour changer la couche de base
var baseLayers = {
  "Carte": osmLayer,
  "Photos aériennes": esriImagery
};

var overlays = {};
L.control.layers(baseLayers, overlays).addTo(mymap);


function showFeaturesForDate(year) {

  //remove older informations on iteration
  mymap.removeLayer(markers, attacksMarker)
  markers = L.markerClusterGroup()
  var attacksMarker = []
  mymap.removeLayer(attacksMarker)
  attacksMarker.forEach(function (m) {
    m.remove() // à vérifier pourquoi ne fonctionne pas 
  })

  //var featuresSelected = pois.filter
  // if (vigneSelected()) {
  //  lyr['vigne'][year].addTo(mymap);
  //  currentVigneLayer = lyr['vigne'][year];
  //} else {
  //  currentVigneLayer = null;
  //}

  var featuresFiltered = pois.features.filter(function (v) {
    return v.properties.iyear == year //&& v.properties.attacktype1 == "1"
  })
  //if (type_1_Selected()) {
  //  var featuresSelected = featuresFiltered.filter(function (v) {
  //    return v.properties.attacktype1 == "1"
  //    console.log(featuresSelected)
  //  })
  //}
  for (var j = 0; j < (featuresFiltered.length); j++) {
    var c = featuresFiltered[j].geometry
    if (c != null) {
      var title = featuresFiltered[j].properties.summary ?? "no information"
      var marker = L.marker(new L.LatLng(c.coordinates[1], c.coordinates[0]))
      marker.bindPopup(title);
      markers.addLayer(marker)

      var attacksMarker = L.circleMarker([
        c.coordinates[1],
        c.coordinates[0]
      ], {
        color: "#000",       // Couleur de la bordure du symbole
        weight: 1,              // Epaisseur de la bordure
        opacity: 1,           // Opacité de la bordure
        fillColor: "#ff7800",         // Couleur de remplissage
        fillOpacity: 0.5,       // Opacité du remplissage du symbole
        radius: 2,

      }).addTo(mymap);




    }
  }
  mymap.addLayer(markers, attacksMarker);

}

function ShowDataForYear() {
  var DateSLider = document.getElementById("slider").value
  document.getElementById("yeardate").textContent = document.getElementById("slider").value;
  showFeaturesForDate(DateSLider)
}

//checked box
// Return true/false if the box is checked
function type_1_Selected() {
  return $('#type_1')[0].checked;
}
function type_2_Selected() {
  return $('#type_2')[0].checked;
}
function type_3_Selected() {
  return $('#type_3')[0].checked;
}
function type_4_Selected() {
  return $('#type_4')[0].checked;
}
function type_5_Selected() {
  return $('#type_5')[0].checked;
}
function type_6_Selected() {
  return $('#type_6')[0].checked;
}
function type_7_Selected() {
  return $('#type_7')[0].checked;
}
function type_8_Selected() {
  return $('#type_8')[0].checked;
}
function type_9_Selected() {
  return $('#type_9')[0].checked;
}

