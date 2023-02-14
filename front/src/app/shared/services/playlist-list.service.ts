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
      },{
        id: 4,
        nom: "Antho's Hip-Hop Picks",
        nomCreateur: "Antho",
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
        nom: "Lulu's Throwback Jams",
        nomCreateur: "Lulu",
        nombreClics: 37,
        contributeurs: "The Beatles",
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
        nom: "Max's Electronic Beats",
        nomCreateur: "Max",
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
        },       
        {
        id: 7,
        nom: "Antho's R&B Grooves",
        nomCreateur: "Antho",
        nombreClics: 18,
        contributeurs: "Frank Ocean",
        style: "R&B",
        morceauMusiqueListe: [{
        id: 12,
        titre: "Thinkin Bout You",
        nomArtiste: "Frank Ocean"
        }, {
        id: 13,
        titre: "Adorn",
        nomArtiste: "Miguel"
        }]
        },
        {
        id: 8,
        nom: "Lulu's 90s Pop Hits",
        nomCreateur: "Lulu",
        nombreClics: 63,
        contributeurs: "Britney Spears",
        style: "Pop",
        morceauMusiqueListe: [{
        id: 14,
        titre: "...Baby One More Time",
        nomArtiste: "Britney Spears"
        }, {
        id: 15,
        titre: "I Want It That Way",
        nomArtiste: "Backstreet Boys"
        }]
        },{
          id: 11,
          nom: "Antho's Smooth Jazz",
          nomCreateur: "Antho",
          nombreClics: 13,
          contributeurs: "Ella Fitzgerald",
          style: "Jazz",
          morceauMusiqueListe: [{
          id: 18,
          titre: "Misty",
          nomArtiste: "Ella Fitzgerald"
          }, {
          id: 19,
          titre: "Take Five",
          nomArtiste: "Dave Brubeck"
          }]
          },
          {
          id: 12,
          nom: "Lulu's Workout Mix",
          nomCreateur: "Lulu",
          nombreClics: 45,
          contributeurs: "Ariana Grande",
          style: "Pop",
          morceauMusiqueListe: [{
          id: 20,
          titre: "positions",
          nomArtiste: "Ariana Grande"
          }, {
          id: 21,
          titre: "Levitating",
          nomArtiste: "Dua Lipa"
          }]
          },
          {
          id: 13,
          nom: "Max's Country Roads",
          nomCreateur: "Max",
          nombreClics: 22,
          contributeurs: "Johnny Cash",
          style: "Country",
          morceauMusiqueListe: [{
          id: 22,
          titre: "I Walk the Line",
          nomArtiste: "Johnny Cash"
          }, {
          id: 23,
          titre: "The Gambler",
          nomArtiste: "Kenny Rogers"
          }]
          },
          {
          id: 14,
          nom: "Antho's Latin Heat",
          nomCreateur: "Antho",
          nombreClics: 31,
          contributeurs: "J Balvin",
          style: "Latin",
          morceauMusiqueListe: [{
          id: 24,
          titre: "Mi Gente",
          nomArtiste: "J Balvin"
          }, {
          id: 25,
          titre: "Despacito",
          nomArtiste: "Luis Fonsi"
          }]
          }
    ]
  }



}
