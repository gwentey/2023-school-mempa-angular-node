import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPlaylist } from '../models/playlist';
import { PlaylistListService } from '../services/playlist-list.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolver implements Resolve<IPlaylist[]> {

  constructor(private playlistListService: PlaylistListService) {}

  resolve(): Observable<IPlaylist[]> {


    this.playlistListService.getPlaylist().subscribe({
      next: lesPlaylists => {
        // si la liste est vide on lance la création
        if (lesPlaylists.length === 0) {
          this.playlistListService.creerTests().subscribe();
          this.playlistListService.getPlaylist().subscribe();
        }
      },
      error: err => { console.log("Erreur : " + err) }
    })

    return this.playlistListService.getPlaylist();
  }
}
