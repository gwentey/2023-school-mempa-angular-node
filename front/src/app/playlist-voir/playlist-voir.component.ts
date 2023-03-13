import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist } from '../shared/models/playlist';
import { IMorceauMusique } from '../shared/models/morceau-musique';

import { PlaylistListService } from '../shared/services/playlist-list.service';

@Component({
  selector: 'app-playlist-voir',
  templateUrl: './playlist-voir.component.html',
  styleUrls: ['./playlist-voir.component.css']
})
export class PlaylistVoirComponent implements OnInit{

  public playlist: IPlaylist = {nomPlaylist: "",photoCouverture: "",nomCreateur: "",nombreClics: 0,contributeurs: [],styleMusique: "",morceauMusiqueListe : []};

  constructor(private playlistListService : PlaylistListService, private route: ActivatedRoute){}

  ngOnInit() {

    this.playlistListService.getPlayListById(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: playlist => {this.playlist = playlist; console.log(playlist)},
      error: err => console.log(err)
    });

  }



}
