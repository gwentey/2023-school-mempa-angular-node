const Morceau = require("./morceau");

module.exports = class Playlist {

    static idPlaylistCompteur = 0;

    //Constructeur de la classe
    constructor(nomPlaylist, nomCreateur, styleMusique, photoCouverture) {
        this.idPlaylist = Playlist.idPlaylistCompteur;
        this.listeMorceaux = [];
        this.nomsContributeurs = [];
        this.idMorceaux = 0;
        this.photoCouverture = photoCouverture;
        this.nomPlaylist = nomPlaylist;
        this.nomCreateur = nomCreateur;
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