//définition des variables

// Limiter la carte à la Suisse
mymap.setMaxBounds([[45.5, 5.9], [48.0, 10.5]]);
mymap.setMinZoom(7);
mymap.setMaxZoom(12);

// Nous faisons une petite animation pour attirer l'oeil de l'utilisateur à la
// boîte d'info les 3 premières fois. Cette variable compte combien de fois
// l'animation a déjà eu lieu.
var animation_count = 0;

// Définir les différentes couches de base:
var topoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  maxZoom: 16
});
var esriImagery = L.tileLayer(
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="http://www.esri.com">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
);

// Ajouter la couche de base par défaut à la carte.
topoMap.addTo(mymap);

// Créer les boutons pour changer la couche de base
var baseLayers = {
  "Carte": topoMap,
  "Photos aériennes": esriImagery
};
var overlays = {};
L.control.layers(baseLayers, overlays).addTo(mymap);
