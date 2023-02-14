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
    this.listePlaylist = this.playlistListService.getPlaylist();
  }

}
