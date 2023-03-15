const express = require('express');
const app = express();

const Playlist = require('./playlist');

// Création du tableau de playlists
let playlists = []


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

    let p = new Playlist(req.body.nomPlaylist, req.body.nomCreateur, req.body.styleMusique, req.body.photoCouverture);
    playlists.push(p);
    res.json({ id: p.idPlaylist, playlist: p });
});

// Route PUT pour ajouter un morceau à une playlist
app.put('/ajoutermorceau/:idPlaylist/:titremorceau/:nomartiste', function (req, res) {

    // Vérification du passages des paramètres
    if (typeof req.params.idPlaylist === 'undefined' || typeof req.params.titremorceau === 'undefined' || typeof req.params.nomartiste === 'undefined') {
        res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        return false;
    }

    // Boucle de recherche de playlist
    let trouve = false;
    let i = 0;

    while ((!trouve && i < playlists.length)) {
        if (req.query.idPlaylist === playlists.at(i).idPlaylist) {
            trouve = true;
            if (typeof playlists.at(i) === 'undefined') {
                res.status(404).json({ error: "La playlist n'existe pas" });
                return false;
            } else {
                playlists.at(i).ajouterMorceau(req.params.titremorceau, req.params.nomartiste);
            }
        } else {
            i++;
        }
    }
    res.json(playlists.at(i));
});

//Route GET pour ajouter un clic à une playlist
app.get('/ajouterclic/', function (req, res) {

    const playlistId = req.query.idPlaylist;
    const playlist = playlists.find(p => p.idPlaylist == playlistId);
    if (playlist) {
        playlist.nombreClics++;
    }
    res.json({ nombreClics: playlist.nombreClics });
});

//Route GET pour récupérer toutes les playlists
app.get('/getallplaylists', function (req, res) {
    res.json(playlists);
});

//Route GET pour récupérer une playlist avec son id (@Params : idPlaylist)
app.get('/getplaylistbyid', function (req, res) {
    const playlistId = req.query.idPlaylist;
    const playlist = playlists.find(p => p.idPlaylist == playlistId);
    if (playlist) {
        res.json(playlist);
    } else {
        res.status(404).json({ error: "La playlist n'existe pas" });
    }
});


//Route GET pour récupérer les musiques d'une playlist
app.get('/getmorceauxbyidplaylist', function (req, res) {
    console.log(req.query.idPlaylist);
    let p = playlists.at(req.query.idPlaylist);
    if (typeof p === 'undefined') {
        res.status(404).json({ error: "La playlist n'existe pas" });
        return false;
    }
    res.json(p.listeMorceaux);
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

    res.json({ success: true });
});