import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist } from '../shared/models/playlist';

import { PlaylistListService } from '../shared/services/playlist-list.service';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-voir',
  templateUrl: './playlist-voir.component.html',
  styleUrls: ['./playlist-voir.component.css']
})
export class PlaylistVoirComponent implements OnInit {

  public playlist: IPlaylist = {
    idPlaylist: 0,
    nomPlaylist: "",
    photoCouverture: "",
    nomCreateur: "",
    nombreClics: 0,
    contributeurs: [],
    styleMusique: "",
    morceauMusiqueListe: []
  };
  musiqueAjoutForm: any;

  constructor(private router: Router, private fb: FormBuilder, private playlistListService: PlaylistListService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.playlistListService.getPlayListById(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: playlist => {
        this.playlist = playlist;
        this.playlist.nombreClics++;
        this.playlistListService.ajouterClic(Number(this.route.snapshot.paramMap.get('id'))).subscribe();
        console.log(playlist);
      },
      error: err => console.log(err)
    });


    this.musiqueAjoutForm = this.fb.group({
      nomMorceau: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ],
      urlCouverture: ['', Validators.required],
      nomArtiste: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ]
    });

  }


  ajouterMusique(): void {
    if (this.musiqueAjoutForm.valid) {
      if (this.musiqueAjoutForm.dirty) {
        this.playlistListService.ajouterMorceau(this.playlist.idPlaylist,
          this.musiqueAjoutForm.value.nomMorceau,
          this.musiqueAjoutForm.value.nomArtiste,
          this.musiqueAjoutForm.value.urlCouverture).subscribe();

        this.playlistListService.getPlayListById(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
          next: playlist => {
            this.playlist = playlist;
            this.playlist.nombreClics++;
            this.playlistListService.ajouterClic(Number(this.route.snapshot.paramMap.get('id'))).subscribe();
          },
          error: err => console.log(err)
        });


      }
    }
  }


}
