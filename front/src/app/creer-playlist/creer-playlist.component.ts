import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaylistListService } from '../shared/services/playlist-list.service';

@Component({
  selector: 'app-creer-playlist',
  templateUrl: './creer-playlist.component.html',
  styleUrls: ['./creer-playlist.component.css']
})
export class CreerPlaylistComponent {

  public playListCreationForm!: FormGroup;


  constructor(private fb: FormBuilder, private playListService: PlaylistListService, private router: Router) {
  }

  ngOnInit(): void {

    this.playListCreationForm = this.fb.group({
      nomPlayList: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ],
      urlCouverture: ['', Validators.required],
      nomCreateur: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ], nomStyle: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]
      ]
    });

  }

  creerPlayList(): void {

    if (this.playListCreationForm.valid) {
      if (this.playListCreationForm.dirty) {
        console.log("to");

        this.playListService.creerPlayList(this.playListCreationForm.value.nomPlayList, 
          this.playListCreationForm.value.urlCouverture, this.playListCreationForm.value.nomCreateur,
          this.playListCreationForm.value.nomStyle).subscribe();

          this.router.navigateByUrl('');

      }
    }
  }




}
