const Playlist = require('./playlist');

let idCompteur = 0;

module.exports = class User {

    //Constructeur de la classe
    constructor(pseudo, password) {
        this.id = idCompteur;
        this.pseudo = pseudo;
        this.password = password;
        idCompteur++;
    }
}
