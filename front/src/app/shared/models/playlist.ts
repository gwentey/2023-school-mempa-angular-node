import { IMorceauMusique } from "./morceau-musique";

export interface IPlaylist {
    id: number;
    nom: string;
    photoCouverture: string;
    nomCreateur: string;
    nombreClics: number;
    contributeurs: string;
    style: string;
    morceauMusiqueListe : IMorceauMusique[];


  }