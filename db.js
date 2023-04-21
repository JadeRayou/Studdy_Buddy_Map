const mongodb = require("mongodb");

// Le lien de connexion de notre base de donnée en ligne
// (ATTENTION: contient à l'intérieur notre mot de passe)
// const url = "mongodb+srv://omarweblabo:descodeusesnodeJs@clusterformation.jvw2k0k.mongodb.net/test";
// Le lien de connexion de notre base de donnée en Local
const url = "mongodb+srv://tsheehanrayou:ISFiuCAHfViT6dY2@cluster0.nsopaud.mongodb.net/?retryWrites=true&w=majority";

// On créé une nouvelle instance de MongoClient
// Le client permet de communiquer avec tout notre Mongo
const client = new mongodb.MongoClient(url);

// Le nom de notre base de donnée
// Si dans notre mongo il n'y a aucune base de donnée avec ce nom,
// la base sera automatiquement créée
const dbName = 'projet-map';

// Le client qui va nous permettre de communiquer avec notre base de donnée
// (uniquement notre db projet-map)
let dbClient;

// On connect et on fait les logs
client.connect()
    .then(function () {
        console.log('Connecté à mongo !');
        // On connect la variable à la db
        dbClient = client.db(dbName);
    })
    .catch(function (err) {
        console.error(err);
    });


// On exporte un objet avec à l'intérieur une méthode markers
// qui retourne un client qui permet de communiquer avec la collection 'markers'
module.exports.collections = {
    markers: function () {
        return dbClient.collection('markers');
    }
};
    