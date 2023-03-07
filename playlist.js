const Morceau = require("./morceau");

module.exports = class  Playlist{
    //Constructeur de la classe
    constructor(nomPlaylist, nomCreateur, styleMusique) {
        this.listeMorceaux = [];
        this.nomsContributeurs = []
        this.idMorceaux = 0;
        this.nomPlaylist = nomPlaylist;
        this.nomCreateur = nomCreateur;
        this.nombreClics = 0;
        this.styleMusique = styleMusique;
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