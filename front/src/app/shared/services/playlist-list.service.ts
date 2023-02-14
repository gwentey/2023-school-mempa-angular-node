import { Injectable } from '@angular/core';
import { IPlaylist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})


export class PlaylistListService {

  constructor() { }

/**
 * Fonction temporaire qui simule la reponse en JSON du back (pour faire des tests)
 * @returns IPlaylist[] : la liste des hotels 
 */
  public getPlaylist(): IPlaylist[] {
    return [
      {
        id: 1,
        nom: "Daily Mix",
        nomCreateur: "Antho",
        nombreClics: 43,
        contributeurs: "Lujipeka",
        style: "French Rap",
        morceauMusiqueListe: [{
          id: 1,
          titre: "Pas à ma place",
          nomArtiste: "Lujipeka"
        }, {
          id: 2,
          titre: "Metaverse",
          nomArtiste: "Lujipeka"
        }]
      }, {
        id: 2,
        nom: "Noel 2023",
        nomCreateur: "Lulu",
        nombreClics: 98,
        contributeurs: "Le père noel",
        style: "Pop",
        morceauMusiqueListe: [{
          id: 3,
          titre: "All I Want For Christmas Is You",
          nomArtiste: "Mariah Carey"
        }, {
          id: 4,
          titre: "Have Yourself a Merry Little Christmas",
          nomArtiste: "Michael Bublé"
        }]
      }, {
        id: 3,
        nom: "Summer 2023",
        nomCreateur: "Max",
        nombreClics: 65,
        contributeurs: "DavLaMenace",
        style: "Pop",
        morceauMusiqueListe: [{
          id: 4,
          titre: "Summer",
          nomArtiste: "Calvin Harris"
        }, {
          id: 5,
          titre: "Still Corners",
          nomArtiste: "The Trip"
        }]
      }
    ]
  }



}
