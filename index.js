//initialisation des variables  
var data = pois.features.properties
const ZOOM_THERSHOLD = 14;
var markers = L.markerClusterGroup({ disableClusteringAtZoom: ZOOM_THERSHOLD })

// coordonnées
var mymap = new L.Map('map', {
    center: [46.712004980312685, 8.366493210196497],
    minZoom: 2,
    maxZoom: 13,
    zoom: 2
});
mymap.setMaxBounds([[70, -170], [-50, 170]]);

// fond de carte 
var osmLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
});

var esriImagery = L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="http://www.esri.com">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
osmLayer.addTo(mymap);

// créer les boutons pour changer la couche de base
var baseLayers = {
    "Carte": osmLayer,
    "Photos aériennes": esriImagery
};

var overlays = {};
L.control.layers(baseLayers, overlays).addTo(mymap);


function showFeaturesForDate(year) {

    //supprimer les anciennes itérations
    mymap.removeLayer(markers)
    markers = L.markerClusterGroup({ disableClusteringAtZoom: ZOOM_THERSHOLD })

    //sélectionner le type d'attaque
    let numbers = []

    if (type_1_Selected()) {
        numbers.push(1);
    }
    if (type_2_Selected()) {
        numbers.push(2);
    }
    if (type_3_Selected()) {
        numbers.push(3);
    }
    if (type_4_Selected()) {
        numbers.push(4);
    }
    if (type_5_Selected()) {
        numbers.push(5);
    }
    if (type_6_Selected()) {
        numbers.push(6);
    }
    if (type_7_Selected()) {
        numbers.push(7);
    }
    if (type_8_Selected()) {
        numbers.push(8);
    }
    if (type_9_Selected()) {
        numbers.push(9);
        numbers.push(0);
    }

    //filtrer par le type d'attaque et l'année
    var featuresFiltered = pois.features.filter(function (v) {
        return v.properties.iyear == year && numbers.includes(parseInt(v.properties.attacktype1))
    })

    //ajouter les points sur la carte avec MarkerCluster
    for (var j = 0; j < (featuresFiltered.length); j++) {
        var c = featuresFiltered[j].geometry
        if (c != null) {
            var title = featuresFiltered[j].properties.summary ?? "no information"

            var marker = L.marker(new L.LatLng(c.coordinates[1], c.coordinates[0]))
            marker.bindPopup(title)
            markers.addLayer(marker)
        }
        mymap.addLayer(markers)
    }
}


//statistiques basiques pour le nombre d'attaques
function UpdateNAttack(year) {
    var featuresFiltered_1 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "1"
    })
    $("#count_1").html(featuresFiltered_1.length)

    var featuresFiltered_2 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "2"
    })
    $("#count_2").html(featuresFiltered_2.length)

    var featuresFiltered_3 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "3"
    })
    $("#count_3").html(featuresFiltered_3.length)

    var featuresFiltered_4 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "4"
    })
    $("#count_4").html(featuresFiltered_4.length)

    var featuresFiltered_5 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "5"
    })
    $("#count_5").html(featuresFiltered_5.length)

    var featuresFiltered_6 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "6"
    })
    $("#count_6").html(featuresFiltered_6.length)

    var featuresFiltered_7 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "7"
    })
    $("#count_7").html(featuresFiltered_7.length)

    var featuresFiltered_8 = pois.features.filter(function (v) {
        return v.properties.iyear == year && v.properties.attacktype1 == "8"
    })
    $("#count_8").html(featuresFiltered_8.length)

    var featuresFiltered_9 = pois.features.filter(function (v) {
        return v.properties.iyear == year && (v.properties.attacktype1 == "9" || v.properties.attacktype1 == "0")
    })
    $("#count_9").html(featuresFiltered_9.length)
}

//Updater graphe en fonction de la fenêtre de l'utilisateur
mymap.on('zoomstart', function (e) {
    getstatbound();
});

mymap.on('moveend', function (e) {
    getstatbound();
});

//Sélectionner en fonction des limites de la fenêtre
function getstatbound() {
    var North_z = mymap.getBounds()._northEast.lat
    var East_z = mymap.getBounds()._northEast.lng
    var South_z = mymap.getBounds()._southWest.lat
    var West_z = mymap.getBounds()._southWest.lng



    var featuresFiltered_bound = pois.features.filter(function (v) {
        return (parseInt(v.properties.latitude) < North_z) && (parseInt(v.properties.latitude) > South_z) &&
            (parseInt(v.properties.longitude) < East_z) && (parseInt(v.properties.longitude) > West_z)
    })

    //Filtrer en fonction du type sélectionné
    let numbers = []

    if (type_1_Selected()) {
        numbers.push(1);
    }
    if (type_2_Selected()) {
        numbers.push(2);
    }
    if (type_3_Selected()) {
        numbers.push(3);
    }
    if (type_4_Selected()) {
        numbers.push(4);
    }
    if (type_5_Selected()) {
        numbers.push(5);
    }
    if (type_6_Selected()) {
        numbers.push(6);
    }
    if (type_7_Selected()) {
        numbers.push(7);
    }
    if (type_8_Selected()) {
        numbers.push(8);
    }
    if (type_9_Selected()) {
        numbers.push(9);
        numbers.push(0);
    }

    var featuresFiltered_bound = featuresFiltered_bound.filter(function (v) {
        return numbers.includes(parseInt(v.properties.attacktype1))
    })
    statwindow(featuresFiltered_bound)

}

//checked box
// Retourne vrai ou faux si la case est sélectionnée
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

//Plot en fonction du temps 
function statwindow(data) {

    var ctx = document.getElementById('statonwindow');
    //Réinitialiser les valeurs
    let chartStatus = Chart.getChart('statonwindow');
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    //Dictionnaire nombre d'attaques par année
    var year_dict = {}
    for (let i = 0; i != data.length; i++) {
        year_dict[data[i].properties.iyear] = 0;
    }

    for (let i = 0; i != data.length; i++) {
        year_dict[data[i].properties.iyear]++;
    }

    //création du plot
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(year_dict),
            datasets: [{
                label: '# of attacks',
                data: Object.values(year_dict),
                borderWidth: 0.5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

//Update des intéractions
function ShowDataForYear() {
    DateSLider = document.getElementById("slider").value
    document.getElementById("yeardate").textContent = document.getElementById("slider").value
    showFeaturesForDate(DateSLider)
    UpdateNAttack(parseInt(DateSLider))
    getstatbound()
}

//Initialisation des intéractions
ShowDataForYear()
