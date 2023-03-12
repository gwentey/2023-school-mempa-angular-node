import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IPlaylist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})


export class PlaylistListService {

  public playlist: any;

  private readonly PLAYLIST_API_URL_HTTPS = "https://localhost:3000/";
  private readonly PLAYLIST_API_URL_HTTP = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  
  public creerPlayList(nomPlaylist: String, photoCouverture: String,
    nomCreateur: String, styleMusique: String,): Observable<IPlaylist> {

    this.playlist = {
      nomPlaylist: nomPlaylist,
      photoCouverture: photoCouverture,
      nomCreateur: nomCreateur,
      styleMusique: styleMusique
    }

    return this.http.post<any>(this.PLAYLIST_API_URL_HTTP + "creerplaylist/", this.playlist).pipe(
      catchError(this.handleError)
    );

  }

  /**
   * Fonction temporaire qui simule la reponse en JSON du back (pour faire des tests)
   * @returns IPlaylist[] : la liste des playlists
   */
  public getPlaylist(): Observable<any> {
    return this.http.get<any>(this.PLAYLIST_API_URL_HTTP + "getallplaylists");
  }

  public creerTests(){
    return this.http.get<any>(this.PLAYLIST_API_URL_HTTP + "createtestvalues");
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
