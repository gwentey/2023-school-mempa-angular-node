const Morceau = require("./morceau");
const User = require("./user");

module.exports = class Playlist {

    static idPlaylistCompteur = 0;

    //Constructeur de la classe
    constructor(nomPlaylist, createur, styleMusique, photoCouverture) {
        this.idPlaylist = Playlist.idPlaylistCompteur;
        this.listeMorceaux = [];
        this.nomsContributeurs = [];
        this.idMorceaux = 0;
        this.photoCouverture = photoCouverture;
        this.nomPlaylist = nomPlaylist;
        this.createur = createur;
        this.nombreClics = 0;
        this.styleMusique = styleMusique;
        Playlist.idPlaylistCompteur++;
    }

    //Pour ajouter un morceau
    ajouterMorceau(titre, nomArtiste, photoCouverture) {
        let m = new Morceau(titre, nomArtiste, this.idMorceaux, photoCouverture);
        this.listeMorceaux.push(m);
        this.idMorceaux++;
        return m;
    }

    




}