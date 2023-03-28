import { IMorceauMusique } from "./morceau-musique";
import { IUser } from "./user";

export interface IPlaylist {
    idPlaylist: number;
    nomPlaylist: string;
    photoCouverture: string;
    createur: IUser;
    nombreClics: number;
    contributeurs: string[];
    styleMusique: string;
    morceauMusiqueListe : IMorceauMusique[];
  }
