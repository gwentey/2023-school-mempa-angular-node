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
  private _playlistFilter: string = '';
  public filteredListePlaylist: IPlaylist[] = [];
  private dernierTrierFait: string = '';

  constructor(private playlistListService: PlaylistListService) { }

  ngOnInit() {
    // récupération des playlists à partir du service injecté dans le constructeur
    this.playlistListService.getPlaylist().subscribe({
      next: lesPlaylists => {
        // si la liste est vide on lance la création
        if (lesPlaylists.length === 0) {
          this.playlistListService.creerTests().subscribe();
          this.playlistListService.getPlaylist().subscribe({
            next: lesPlaylists => this.listePlaylist = lesPlaylists,
          });
        } else {
          this.listePlaylist = lesPlaylists;
          this.filteredListePlaylist = this.listePlaylist;
        }
      },
      error: err => { console.log("Erreur : " + err) }
    })
  }

  public get playlistFilter(): string {
    return this._playlistFilter;
  }

  public set playlistFilter(filter: string) {
    this._playlistFilter = filter;
    this.filteredListePlaylist = this.playlistFilter ? this.filterPlaylist(this.playlistFilter) : this.listePlaylist;
  }

  private filterPlaylist(critere: string): IPlaylist[] {
    critere = critere.toLocaleLowerCase();

    const res = this.listePlaylist.filter((playlist: IPlaylist) =>
      playlist.nomPlaylist.toLocaleLowerCase().includes(critere) ||
      playlist.styleMusique.toLocaleLowerCase().includes(critere)
    );

    return res;
  }

  public trierAlphabetique() {
    const triEffectue = 'nomPlaylist';
    if (triEffectue === this.dernierTrierFait) {
      this.filteredListePlaylist.reverse();
    } else {
      this.filteredListePlaylist.sort((a: IPlaylist, b: IPlaylist) =>
        a[triEffectue].toLocaleLowerCase().localeCompare(b[triEffectue].toLocaleLowerCase())
      );
      this.dernierTrierFait = triEffectue;
    }
  }

  public trierNombreClics() {
    const triEffectue = 'nombreClics';
    if (triEffectue === this.dernierTrierFait) {
      this.filteredListePlaylist.reverse();
    } else {
      this.filteredListePlaylist.sort((a: IPlaylist, b: IPlaylist) =>
        b[triEffectue] - a[triEffectue]
      );
      this.dernierTrierFait = triEffectue;
    }
  }

  public trierParStyleMusique() {
    const triEffectue = 'styleMusique';
    if (triEffectue === this.dernierTrierFait) {
      this.filteredListePlaylist.reverse();
    } else {
      this.filteredListePlaylist.sort((a: IPlaylist, b: IPlaylist) =>
        a[triEffectue].toLocaleLowerCase().localeCompare(b[triEffectue].toLocaleLowerCase())
      );
      this.dernierTrierFait = triEffectue;
    }
  }
}
