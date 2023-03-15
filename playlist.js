const Morceau = require("./morceau");

module.exports = class  Playlist{

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
    ajouterMorceau(titre, nomArtiste){
        let m = new Morceau(titre, nomArtiste, this.idMorceaux);
        this.listeMorceaux[this.idMorceaux] = m;
        this.idMorceaux++;
        return m;
    }

    //Pour récupérer un morceau à partir de son id
    getMorceau(id){
        if(typeof this.listeMorceaux[id] === 'undefined'){
            return false;
        }
        return this.listeMorceaux[this.idMorceaux];
    }

}