import { Component } from '@angular/core';
import { IPlaylist } from '../../models/playlist';
import { PlaylistListService } from '../../services/playlist-list.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent {

  public listePlaylist: IPlaylist[] = [];

  constructor(private playlistListService : PlaylistListService){}

  trierAlphabetique(){
    this.listePlaylist.sort(compareAlpha);
    isSortByAlpha = !isSortByAlpha;
  }

  trierNombreClics() {
    this.listePlaylist.sort(compareNbClics);
    isSortByNbClics = !isSortByNbClics;
  }

  trierAlphabetiqueStyle() {
    this.listePlaylist.sort(compareAlphaStyle);
    isSortByAlphaStyle = !isSortByAlphaStyle;
  }

  ngOnInit() {
    // récupération des playlists à partir du service injecté dans le constructeur
    this.playlistListService.getPlaylist().subscribe({
      next: lesPlaylists => {
        // si la liste est vide on lance la création
        if(lesPlaylists.length === 0){
          this.playlistListService.creerTests().subscribe();
          this.playlistListService.getPlaylist().subscribe({
            next: lesPlaylists => this.listePlaylist = lesPlaylists,
          });
        } else {

        this.listePlaylist = lesPlaylists;
        }
      },
      error: err => { console.log("Erreur : " + err)}
    })


  }
}

let isSortByAlpha = false;
let isSortByAlphaStyle = false;
let isSortByNbClics = false;
function compareAlpha(a: IPlaylist, b:IPlaylist){
  if(a.nomPlaylist===undefined){
    return 0;
  }
  if(a.nomPlaylist.charAt(0)>b.nomPlaylist.charAt(0)){
    if(isSortByAlpha){
      return -1;
    }else{
      return 1;
    }
  }else if(a.nomPlaylist.charAt(0)===b.nomPlaylist.charAt(0)){
    if(a.nomPlaylist.charAt(1)>b.nomPlaylist.charAt(1)){
      if(isSortByAlpha){
        return -1;
      }else{
        return 1;
      }
    }else{
      if(isSortByAlpha){
        return 1;
      }else{
        return -1;
      }
    }
  }else{
    if(isSortByAlpha){
      return 1;
    }else{
      return -1;
    }
  }
}

function compareNbClics(a: IPlaylist, b:IPlaylist){
  if(a.nombreClics===undefined || a.nombreClics===0){
    return 0;
  }
  if(a.nombreClics>b.nombreClics){
    if(isSortByNbClics){
      return -1;
    }else{
      return 1;
    }
  }else{
    if(isSortByNbClics){
      return 1;
    }else{
      return -1;
    }
  }
}

function compareAlphaStyle(a: IPlaylist, b:IPlaylist){
  if(a.styleMusique===undefined){
    return 0;
  }
  if(a.styleMusique.charAt(0)>b.styleMusique.charAt(0)){
    if(isSortByAlphaStyle){
      return -1;
    }else{
      return 1;
    }
  }else if(a.styleMusique.charAt(0)===b.styleMusique.charAt(0)){
    if(a.styleMusique.charAt(1)>b.styleMusique.charAt(1)){
      if(isSortByAlphaStyle){
        return -1;
      }else{
        return 1;
      }
    }else{
      if(isSortByAlphaStyle){
        return 1;
      }else{
        return -1;
      }
    }
  }else{
    if(isSortByAlphaStyle){
      return 1;
    }else{
      return -1;
    }
  }
}
