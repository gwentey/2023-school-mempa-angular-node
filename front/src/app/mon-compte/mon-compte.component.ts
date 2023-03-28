import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist } from '../shared/models/playlist';
import { IUser } from '../shared/models/user';
import { PlaylistListService } from '../shared/services/playlist-list.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  user !: IUser;
  public listePlaylist: IPlaylist[] = [];
  private _playlistFilter: string = '';
  public filteredListePlaylist: IPlaylist[] = [];
  public dernierTrierFait: string = '';
  constructor(private _usersService: UsersService, private playlistListService: PlaylistListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this._usersService.getUser();

    // récupération des playlists à partir du service injecté dans le constructeur
    this.playlistListService.getPlaylistsByUserId(this.user.id).subscribe({
      next: lesPlaylists => {
        this.listePlaylist = lesPlaylists;
        this.filteredListePlaylist = this.listePlaylist;
        console.log(this.filteredListePlaylist);
      },
      error: err => { console.log("Erreur : " + err) }
    });
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
