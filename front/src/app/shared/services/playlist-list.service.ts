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
        photoCouverture: "lujipeka.jpeg",
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
        photoCouverture: "noel.jpeg",
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
        photoCouverture: "summer.jpeg",
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
      },{
        id: 4,
        nom: "Hip-Hop Picks",
        nomCreateur: "Lulu",
        photoCouverture: "hiphop.jpeg",
        nombreClics: 25,
        contributeurs: "Nekfeu",
        style: "Hip-Hop",
        morceauMusiqueListe: [{
        id: 6,
        titre: "On Verra",
        nomArtiste: "Nekfeu"
        }, {
        id: 7,
        titre: "L'Homme de l'Ombre",
        nomArtiste: "Georgio"
        }]
        },
        {
        id: 5,
        nom: "Sad life",
        nomCreateur: "Gaby",
        photoCouverture: "sad.jpeg",
        nombreClics: 37,
        contributeurs: "La mort",
        style: "Rock",
        morceauMusiqueListe: [{
        id: 8,
        titre: "Hey Jude",
        nomArtiste: "The Beatles"
        }, {
        id: 9,
        titre: "Sweet Child O' Mine",
        nomArtiste: "Guns N' Roses"
        }]
        },
        {
        id: 6,
        nom: "Année 80'",
        nomCreateur: "Antho",
        photoCouverture: "annee80.jpeg",
        nombreClics: 51,
        contributeurs: "Daft Punk",
        style: "Electronic",
        morceauMusiqueListe: [{
        id: 10,
        titre: "Get Lucky",
        nomArtiste: "Daft Punk"
        }, {
        id: 11,
        titre: "Midnight City",
        nomArtiste: "M83"
        }]
        }
    ]
  }



}
