import { IMorceauMusique } from "./morceau-musique";

export interface IPlaylist {
    nom: string;
    photoCouverture: string;
    nomCreateur: string;
    nombreClics: number;
    contributeurs: string[];
    style: string;
    morceauMusiqueListe : IMorceauMusique[];


  }