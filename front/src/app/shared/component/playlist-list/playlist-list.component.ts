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
