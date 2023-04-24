var map = L.map('map').setView([ 48.866667, 2.333333], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Ajout des markers depuis notre API interne
// Fonction qui sert à ajouter un marker dans la db
// Une fois que le marker est ajouté, on actualise la map
function addMarker(title, description, coord) {
    fetch('/marker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            coord: coord
        })
    })
    .then(function () {
        updateMarkers();
    })
    .catch(function (err) {
        console.error(err);
    })
}
