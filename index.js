// On importe express et body-parser
const express = require("express");
const bodyParser = require("body-parser");

// On importe notre db
const db = require('./db');

// On créé la variable qui va contenir notre app express
const app = express();

// On connect express et body-parser ensemble
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// On dit à express de servir directement tous les fichiers du dossier public
// si un utilisateur en fait la demande
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

// On connect express et le moteur de template ejs ensemble
app.set('view engine', 'ejs');

// La page d'accueil de notre site
app.get('/', function (req, res) {
    // Le res.render va automatiquement récupérer 
    // le fichier index.ejs qui se trouve dans le dossier views
    // va le "rendre" et ensuite l'envoyer au client
    res.render('maps');
});

// Route qui retourne tous les markers présent dans la db
// Les markers sont retournés au format JSON
app.get('/markers', function (req, res) {
    // db.collections.markers() -> pour avoir le client de la collection 'markers'
    // .find({}) -> pour faire la recherche 
    // (en paramètre mettre les filtres, laisser objet vide si aucun filtre)
    // (exemple: .find({title: 'omar'}))
    // .toArray() -> transformer le résultat en tableau
    db.collections.markers().find({}).toArray()
        .then(function (markersList) {
            res.send({
                markersList: markersList
            });
        })
        .catch(function (err) {
            console.log('Impossible de récupérer les markers :(', err);
            res.status(500).send();
        });
});

// Route qui permet d'ajouter un nouveau marker dans la db
app.post('/marker', function (req, res) {
    // TODO: ajouter des conditions pour protéger la route des mauvaises requêtes

    db.collections.markers().insertOne(req.body)
        .then(function () {
            console.log('Marker ajouté !', req.body);
            res.status(201).send();
        })
        .catch(function (err) {
            console.log('Le marker n\'a pas été ajouté :(', err);
            res.status(500).send();
        });
});



// On ouvre le serveur
app.listen(8080, function () { 
    console.log("Ouverture du site sur http://localhost:8080");
});
