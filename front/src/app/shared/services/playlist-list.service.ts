import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IPlaylist } from '../models/playlist';
import {IMorceauMusique} from "../models/morceau-musique";

@Injectable({
  providedIn: 'root'
})


export class PlaylistListService {

  public playlist!: IPlaylist;

  private readonly PLAYLIST_API_URL_HTTPS = "https://localhost:3000/";
  private readonly PLAYLIST_API_URL_HTTP = "http://localhost:3000/";

  constructor(private http: HttpClient) { }


  // permet d'obtenir la playlist associé à l'id
  public getPlayListById(id : Number) : Observable<IPlaylist> {
    let queryParams = new HttpParams().set("idPlaylist", id.toString());
    return this.http.get<IPlaylist>(this.PLAYLIST_API_URL_HTTP + "getplaylistbyid/", {params:queryParams}).pipe(
      map((json: any) => {
        const playlist: IPlaylist = {
          idPlaylist: json.idPlaylist,
          nomPlaylist: json.nomPlaylist,
          photoCouverture: json.photoCouverture,
          nomCreateur: json.nomCreateur,
          nombreClics: json.nombreClics,
          contributeurs: json.nomsContributeurs,
          styleMusique: json.styleMusique,
          morceauMusiqueListe: json.listeMorceaux.map((m: any) => ({
            id: m.id,
            titre: m.titre,
            nomArtiste: m.nomArtiste,
            urlCouverture: m.photoCouverture,
            duree: m.duree
          }))
        };
        return playlist;
      }),
      catchError(this.handleError),
    )
  }

  public ajouterMorceau(idPlaylist:number, titre:string, nomArtiste:string, urlCouverture:string){
    return this.http.post(this.PLAYLIST_API_URL_HTTP+"ajoutermorceau",{idplaylist:idPlaylist, titre:titre, nomartiste:nomArtiste, urlcouverture:urlCouverture});
  }

  public getMorceauxByPlaylist(id:number) {
    let queryParams = new HttpParams().set("idPlaylist", id.toString());
    return this.http.get<IPlaylist>(this.PLAYLIST_API_URL_HTTP + "getmorceauxbyidplaylist/", {params:queryParams});
  }

  public ajouterClic(idPlaylist:number){
    let queryParams = new HttpParams().set("idPlaylist", idPlaylist.toString());

    return this.http.get<any>(this.PLAYLIST_API_URL_HTTP + "ajouterclic/", {params:queryParams}).pipe(
      catchError(this.handleError)
    );
  }

  public creerPlayList(nomPlaylist: String, photoCouverture: String,
    nomCreateur: String, styleMusique: String,): Observable<IPlaylist> {

    const playlist = {
      nomPlaylist: nomPlaylist,
      photoCouverture: photoCouverture,
      nomCreateur: nomCreateur,
      styleMusique: styleMusique
    }

    return this.http.post<any>(this.PLAYLIST_API_URL_HTTP + "creerplaylist/", playlist).pipe(
      catchError(this.handleError)
    );

  }

  /**
   * Fonction temporaire qui simule la reponse en JSON du back (pour faire des tests)
   * @returns IPlaylist[] : la liste des playlists
   */
  public getPlaylist(): Observable<any> {
    return this.http.get<any>(this.PLAYLIST_API_URL_HTTP + "getallplaylists").pipe(
      tap(lesPlaylists  => console.log(lesPlaylists)),
      catchError(this.handleError)
    )
  }

  public creerTests(){
    return this.http.get<any>(this.PLAYLIST_API_URL_HTTP + "createtestvalues").pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



}
