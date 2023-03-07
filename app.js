const express = require('express');
const app = express();

const Playlist = require('./playlist');
const Morceau = require('./morceau');

// Création du tableau de playlists
let playlists= []
let idplaylist = 0;


// Système de variable d'environnement
require('dotenv').config()

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.static(__dirname + '/front/dist/front'));

app.use(express.json());
app.use(express.urlencoded());

app.listen(3000, function () {
    console.log('Application lancée sur le port 3000!') ;
});

// Route POST pour créer une playlist
app.post('/creerplaylist/', function (req, res){
    let id = playlists.push(new Playlist(req.body.nomPlaylist, req.body.nomCreateur, req.body.styleMusique, req.body.photoCouverture))
    res.json({id : id, playlist : playlists});
});

// Route PUT pour ajouter un morceau à une playlist
app.put('/ajoutermorceau/:idplaylist/:titremorceau/:nomartiste', function (req, res){
    if(typeof req.params.idplaylist === 'undefined' || typeof req.params.titremorceau === 'undefined' || typeof req.params.nomartiste === 'undefined'){
        res.status(400).json({error: 'Il faut préciser les paramètres.'});
        return false;
    }
    let p = playlists.at(idplaylist);
    if(typeof p === 'undefined'){
        res.status(404).json({error:"La playlist n'existe pas"});
        return false;
    }
    morceau = p.ajouterMorceau(req.params.titremorceau, req.params.nomartiste);
    res.json(p);
});

//Route GET pour récupérer toutes les playlists
app.get('/getallplaylists', function(req, res){
    res.json(playlists);
});

//Route GET pour récupérer une playlist avec son id (@Params : idplaylist)

app.get('/getplaylistbyid', function (req, res){
    let p = playlists.at(req.params.idplaylist);
    if(typeof p === 'undefined'){
        res.status(404).json({error:"La playlist n'existe pas"});
        return false;
    }
    res.json(p);
});