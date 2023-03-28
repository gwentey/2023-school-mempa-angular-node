import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist } from '../shared/models/playlist';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PlaylistListService } from '../shared/services/playlist-list.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';

@Component({
  selector: 'app-playlist-voir',
  templateUrl: './playlist-voir.component.html',
  styleUrls: ['./playlist-voir.component.css']
})
export class PlaylistVoirComponent implements OnInit {

  public createur: IUser = {
    id: 0,
    pseudo: "",
    password: ""
  };

  public playlist: IPlaylist = {
    idPlaylist: 0,
    nomPlaylist: "",
    photoCouverture: "",
    createur: this.createur,
    nombreClics: 0,
    contributeurs: [],
    styleMusique: "",
    morceauMusiqueListe: []
  };


  musiqueAjoutForm!: FormGroup;
  modifierPlaylist!: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, 
    private playlistListService: PlaylistListService, private route: ActivatedRoute,
    private modalService: NgbModal) {
  }

  ngOnInit() {

    this.playlistListService.getPlayListById(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: playlist => {
        this.playlist = playlist;
        this.playlist.nombreClics++;
        this.playlistListService.ajouterClic(Number(this.route.snapshot.paramMap.get('id'))).subscribe();
        this.afficherFormulairePlaylist();
      },
      error: err => console.log(err)
    });


    this.modifierPlaylist = this.fb.group({
      nomPlaylist: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ],
      urlCouverture: ['', Validators.required],
      stylePlaylist: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ]
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

  afficherFormulairePlaylist(): void {
    this.modifierPlaylist.patchValue({
      nomPlaylist: this.playlist.nomPlaylist,
      urlCouverture: this.playlist.photoCouverture,
      stylePlaylist: this.playlist.styleMusique
    })
  }



  supprimerUnMorceau(idPlaylist:number, idMorceau:number): void {
    console.log("id playlist : " + idPlaylist);
    console.log("id morceau : " + idMorceau);

    this.playlistListService.supprimerMorceau(idPlaylist,idMorceau).subscribe();
    this.actualiserLaPlaylist();
  }

  ajouterMusique(): void {
    if (this.musiqueAjoutForm.valid) {
      if (this.musiqueAjoutForm.dirty) {
        this.playlistListService.ajouterMorceau(this.playlist.idPlaylist,
          this.musiqueAjoutForm.value.nomMorceau,
          this.musiqueAjoutForm.value.nomArtiste,
          this.musiqueAjoutForm.value.urlCouverture).subscribe();

          this.actualiserLaPlaylist();
      }
    }
  }

  

  actualiserLaPlaylist(): void {
    this.playlistListService.getPlayListById(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: playlist => {
        this.playlist = playlist;
        this.playlist.nombreClics++;
        this.playlistListService.ajouterClic(Number(this.route.snapshot.paramMap.get('id'))).subscribe();
        console.log(playlist);
      },
      error: err => console.log(err)
    });
  }

  modificationDeLaPlaylist(){
    if (this.modifierPlaylist.valid) {
      if (this.modifierPlaylist.dirty) {
        this.playlistListService.modifierPlayList(this.playlist.idPlaylist,
          this.modifierPlaylist.value.nomPlaylist,
          this.modifierPlaylist.value.urlCouverture,
          this.modifierPlaylist.value.stylePlaylist).subscribe();

          this.actualiserLaPlaylist();
      }
    }
  }

	ouvrirModal(content: any) {
		this.modalService.open(content, { centered: true });
	}


}
