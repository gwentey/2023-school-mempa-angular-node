const Morceau = require("./morceau");

module.exports = class  Playlist{
    //Constructeur de la classe
    constructor() {
        this.listeMorceaux = [];
        this.id = 0;
    }

    //Pour ajouter un morceau
    ajouterMorceau(titre, nomArtiste){
        this.listeMorceaux[this.id] = new Morceau(titre, nomArtiste);
        this.id++;
    }

    //Pour ajouter un morceau
    ajouterMorceau(titre, nomArtiste){
        this.listeMorceaux[this.id] = new Morceau(titre, nomArtiste);
    }

    //Pour récupérer un morceau à partir de son id
    getMorceau(id){
        if(typeof this.listeMorceaux[id] === 'undefined'){
            return false;
        }
        return this.listeMorceaux[this.id];
    }

}