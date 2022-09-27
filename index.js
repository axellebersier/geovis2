// modification de la carte sur web

//initialisation des variables 


// coordonnées
var mymap = new L.Map('map', {
  center: [46.712004980312685, 8.366493210196497],
  minZoom: 2,
  maxZoom: 6,
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

// Afficher les coordonnées géographiques de l'emplacement de la souris
// Les coordonnées sont affichées en bas à gauche, sous la carte
//mymap.on('mousemove', function(e){
//  var coord = e.latlng;
//  $('#coordonnees').html('Coordonnées: ' + coord.lat.toFixed(5) +' / '+ coord.lng.toFixed(5));
//});