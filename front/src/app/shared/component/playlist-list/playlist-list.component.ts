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
    this.playlistListService.getPlaylist().subscribe(data=>{
      this.listePlaylist = data;
      if(this.listePlaylist.length===0){
        console.log(this.listePlaylist.length);
        this.playlistListService.creerTests().subscribe();
        this.playlistListService.getPlaylist().subscribe(data=>{
          this.listePlaylist = data;
        });
      }
    });



  }

}
