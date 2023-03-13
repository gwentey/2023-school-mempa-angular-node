const express = require('express');
const app = express();

const Playlist = require('./playlist');
const Morceau = require('./morceau');

// Création du tableau de playlists
let playlists = []
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
    console.log('Application lancée sur le port 3000!');
});

// Route POST pour créer une playlist
app.post('/creerplaylist/', function (req, res) {
    let id = playlists.push(new Playlist(req.body.nomPlaylist, req.body.nomCreateur, req.body.styleMusique, req.body.photoCouverture))
    res.json({id: id, playlist: playlists});
});

// Route PUT pour ajouter un morceau à une playlist
app.put('/ajoutermorceau/:idplaylist/:titremorceau/:nomartiste', function (req, res) {
    if (typeof req.params.idplaylist === 'undefined' || typeof req.params.titremorceau === 'undefined' || typeof req.params.nomartiste === 'undefined') {
        res.status(400).json({error: 'Il faut préciser les paramètres.'});
        return false;
    }
    let p = playlists.at(idplaylist);
    if (typeof p === 'undefined') {
        res.status(404).json({error: "La playlist n'existe pas"});
        return false;
    }
    morceau = p.ajouterMorceau(req.params.titremorceau, req.params.nomartiste);
    res.json(p);
});

//Route GET pour ajouter un clic à une playlist
app.get('/ajouterclic/', function (req, res){
    console.log(req.query.idplaylist)
    if(req.query.idplaylist==='undefined'){
        res.status(400).json({error: 'Il faut préciser les paramètres.'});
        return false;
    }
    let p = playlists.at(req.query.idplaylist);
    p.nombreClics++;
    res.json({nombreClics:p.nombreClics});
});

//Route GET pour récupérer toutes les playlists
app.get('/getallplaylists', function (req, res) {
    res.json(playlists);
});

//Route GET pour récupérer une playlist avec son id (@Params : idplaylist)

app.get('/getplaylistbyid', function (req, res) {
    console.log(req.query.idplaylist);
    let p = playlists.at(req.query.idplaylist);
    if (typeof p === 'undefined') {
        res.status(404).json({error: "La playlist n'existe pas"});
        return false;
    }
    res.json(p);
});

app.get('/createtestvalues', function (req, res) {
    let p = new Playlist("Daily Mix", "Antho", "French Rap", "https://static.fnac-static.com/multimedia/Images/FR/NR/fb/15/d2/13768187/1540-1/tsp20210831115225/Montagnes-Rues.jpg");
    p.ajouterMorceau("Pas à ma place", "Lujipeka");
    p.ajouterMorceau("Metaverse", "Lujipeka");
    playlists.push(p);

    let p2 = new Playlist("Noel 2023", "Lulu", "Pop", "http://cdn.shopify.com/s/files/1/0337/7931/8828/articles/noel-2023.png?v=1673806208");
    p2.ajouterMorceau("All I Want For Christmas Is You", "Mariah Carey");
    p2.ajouterMorceau("Have Yourself a Merry Little Christmas", "Michael Bublé");
    playlists.push(p2);

    let p3 = new Playlist("Summer 2023", "Max", "Pop", "https://i.scdn.co/image/ab67616d0000b273c8d8414189a18a0a57be2d6a");
    p3.ajouterMorceau("Summer", "Calvin Harris");
    p3.ajouterMorceau("Still Corners", "The Trip");
    playlists.push(p3);

    let p4 = new Playlist("Hip-Hop Picks", "Lulu", "Hip-Hop", "https://img.cdn-pictorem.com/uploads/collection/Q/QJ3CCL2SKM/900_DK-Artwork_asatronaut%20hiphop.jpg");
    p4.ajouterMorceau("On Verra", "Nekfeu");
    p4.ajouterMorceau("L'Homme de l'Ombre", "Georgio");
    playlists.push(p4);

    let p5 = new Playlist("Sad life", "Gaby", "Rock", "https://ideas.ted.com/wp-content/uploads/sites/3/2021/11/FINAL_DepressionAndTrauma.jpg");
    p5.ajouterMorceau("Hey Jude", "The Beatles");
    p5.ajouterMorceau("Sweet Child O' Mine", "Guns N' Roses");
    playlists.push(p5);

    let p6 = new Playlist("Année 80", "Antho", "Electronic", "https://i1.sndcdn.com/artworks-000316645806-5bbme8-t500x500.jpg");
    p6.ajouterMorceau("Get Lucky", "Daft Punk");
    p6.ajouterMorceau("Midnight City", "M83");
    playlists.push(p6);

    res.json({success:true});
});