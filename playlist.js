const Morceau = require("./morceau");

module.exports = class  Playlist{
    //Constructeur de la classe
    constructor() {
        this.listeMorceaux = [];
        this.idMorceaux = 0;
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