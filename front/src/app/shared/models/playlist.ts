import { IMorceauMusique } from "./morceau-musique";

export interface IPlaylist {
    idPlaylist: number;
    nomPlaylist: string;
    photoCouverture: string;
    nomCreateur: string;
    nombreClics: number;
    contributeurs: string[];
    styleMusique: string;
    morceauMusiqueListe : IMorceauMusique[];
  }
