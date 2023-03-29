const express = require('express');
const app = express();

const Playlist = require('./playlist');
const User = require('./user');

// Création du tableau de playlists
let playlists = [];
let users = [];

// Création de l'utilisateur test (sans playlist)
let uTest = new User("test", "test");
users.push(uTest);



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


//Route POST pour récupérer les playlists d'un utilisateur
app.post('/getplaylistsbyuserid', function (req, res) {
    const userId = parseInt(req.body.userId);
    const user = users.find(u => u.id === userId);
    if (user) {
        const userPlaylists = playlists.filter(p => p.createur === user);
        res.status(202).json(userPlaylists);
    } else {
        res.status(404).json({ error: "L'utilisateur n'existe pas" });
    }
});



// Route pour tester la connexion des utilisateurs
app.post('/connexion/', function (req, res) {
    const { pseudo, password } = req.body;

    // Vérifier si l'utilisateur existe dans le tableau d'utilisateurs
    const user = users.find(u => u.pseudo === pseudo && u.password === password);
    
    if (user) {
        // L'utilisateur existe, retourner les informations de l'utilisateur
        res.status(200).json({ success: true, user });
    } else {
        // L'utilisateur n'existe pas, retourner une erreur
        res.status(401).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect. ' + req.body.pseudo + ' et ' + req.body.password});
    }

});

// Route POST pour créer une playlist
app.post('/creerplaylist/', function (req, res) {
    const createurid = parseInt(req.body.createur.id);
    const user = users.find(u => u.id === createurid);
    if (user) {
        let p = new Playlist(req.body.nomPlaylist, user, req.body.styleMusique, req.body.photoCouverture);
        playlists.push(p);
        res.json({ id: p.idPlaylist, playlist: p });
    } else {
        res.status(404).json({ error: "L'utilisateur n'existe pas" });
    }
});


// Route POST pour ajouter un morceau à une playlist
app.post('/ajoutermorceau/', function (req, res) {
    // Vérification du passages des paramètres
    if (typeof req.body.idplaylist === 'undefined' ||
        typeof req.body.titre === 'undefined' ||
        typeof req.body.nomartiste === 'undefined' ||
        typeof req.body.urlcouverture === 'undefined') {
        res.status(400).json({ error: 'Il faut préciser les paramètres.' });
        return false;
    }
    const playlist = playlists.find(p => p.idPlaylist == req.body.idplaylist);
    if (!playlist) {
        res.status(404).json({ error: "La playlist n'existe pas" });
        return false;
    }
    playlist.ajouterMorceau(req.body.titre, req.body.nomartiste, req.body.urlcouverture);

    res.json(playlist);
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

//Route DELETE pour supprimer un morceau d'une playlist avec son id (@Params : idPlaylist, idMorceau)
app.delete('/deleteplaylistmorceau', function (req, res) {
    const playlistId = req.query.idPlaylist;
    const morceauId = req.query.idMorceau;
    const playlist = playlists.find(p => p.idPlaylist == playlistId);
    if (playlist) {
        const morceauIndex = playlist.listeMorceaux.findIndex(m => m.idMorceau == morceauId);
        if (morceauIndex !== -1) {
            playlist.listeMorceaux.splice(morceauIndex, 1);
            res.json({ message: "Le morceau a été supprimé de la playlist avec succès" });
        } else {
            res.status(404).json({ error: "Le morceau n'existe pas dans la playlist" });
        }
    } else {
        res.status(404).json({ error: "La playlist n'existe pas" });
    }
});


// Route PUT pour modifier une playlist
app.put('/modifierplaylist/:id', function (req, res) {
    const playlistId = req.params.id;
    const playlist = playlists.find(p => p.idPlaylist == playlistId);
    if (playlist) {
        if (req.body.nomPlaylist) {
            playlist.nomPlaylist = req.body.nomPlaylist;
        }
        if (req.body.styleMusique) {
            playlist.styleMusique = req.body.styleMusique;
        }
        if (req.body.photoCouverture) {
            playlist.photoCouverture = req.body.photoCouverture;
        }
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

    let u0 = new User("antho", "123");
    users.push(u0);

    let u1 = new User("lulu", "123");
    users.push(u1);

    let u2 = new User("max", "123");
    users.push(u2);

    let p = new Playlist("Daily Mix", u0, "French Rap", "https://static.fnac-static.com/multimedia/Images/FR/NR/fb/15/d2/13768187/1540-1/tsp20210831115225/Montagnes-Rues.jpg");
    p.ajouterMorceau("Pas à ma place", "Lujipeka", "https://i.scdn.co/image/ab67616d0000b273ba86c4f1cb31140461b9763e");
    p.ajouterMorceau("Metaverse", "Lujipeka", "https://cdns-images.dzcdn.net/images/cover/5736ee1d94629537ca08062348b19c5d/264x264.jpg");
    playlists.push(p);

    let p2 = new Playlist("Noel 2023", u0, "Pop", "http://cdn.shopify.com/s/files/1/0337/7931/8828/articles/noel-2023.png?v=1673806208");
    p2.ajouterMorceau("All I Want For Christmas Is You", "Mariah Carey", "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81U6o32LuUL._SL1500_.jpg");
    p2.ajouterMorceau("Have Yourself a Merry Little Christmas", "Michael Bublé", "https://i.scdn.co/image/ab67616d0000b27395517befb15ad5d63af701ab");
    playlists.push(p2);

    let p3 = new Playlist("Summer 2023", u0, "Pop", "https://i.scdn.co/image/ab67616d0000b273c8d8414189a18a0a57be2d6a");
    p3.ajouterMorceau("Summer", "Calvin Harris", "https://i1.sndcdn.com/artworks-000107381705-20q7wc-t500x500.jpg");
    p3.ajouterMorceau("Still Corners", "The Trip", "https://media.pitchfork.com/photos/5929b15d9d034d5c69bf49eb/1:1/w_600/f9fa53b1.jpeg");
    playlists.push(p3);

    let p4 = new Playlist("Hip-Hop Picks", u0, "Hip-Hop", "https://img.cdn-pictorem.com/uploads/collection/Q/QJ3CCL2SKM/900_DK-Artwork_asatronaut%20hiphop.jpg");
    p4.ajouterMorceau("On Verra", "Nekfeu", "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71paemadIwL._SL1400_.jpg");
    p4.ajouterMorceau("L'Homme de l'Ombre", "Georgio", "https://images.rapgenius.com/2au226lu2d0jcs04kojilo9ig.960x960x1.jpg");
    playlists.push(p4);

    let p5 = new Playlist("Sad life", u0, "Rock", "https://ideas.ted.com/wp-content/uploads/sites/3/2021/11/FINAL_DepressionAndTrauma.jpg");
    p5.ajouterMorceau("Hey Jude", "The Beatles", "https://upload.wikimedia.org/wikipedia/en/0/0a/Heyjudealbum.jpg");
    p5.ajouterMorceau("Sweet Child O' Mine", "Guns N' Roses", "https://upload.wikimedia.org/wikipedia/en/1/15/Guns_N%27_Roses_-_Sweet_Child_o%27_Mine.png");
    playlists.push(p5);

    let p6 = new Playlist("Année 80", u0, "Electronic", "https://i1.sndcdn.com/artworks-000316645806-5bbme8-t500x500.jpg");
    p6.ajouterMorceau("Get Lucky", "Daft Punk", "https://upload.wikimedia.org/wikipedia/en/7/71/Get_Lucky.jpg");
    p6.ajouterMorceau("Midnight City", "M83", "https://musikplease.com/wp-content/uploads/sites/17/2011/08/M83.jpeg");
    p6.ajouterMorceau("Memories", "David Guetta", "https://i.discogs.com/jcR0VQLYH04S99oXFJ1trIZ8aPSE3ao0rITiR4xvLmE/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI2OTA4/OTItMTI5ODQwMTQ3/NC5qcGVn.jpeg");
    p6.ajouterMorceau("Da Funk", "Daft Punk", "https://albumart.publicradio.org/mb/00/00054665-89fa-33d5-a8f0-1728ea8c32c3_2c62.jpg");
    playlists.push(p6);

    res.json({ success: true });
});