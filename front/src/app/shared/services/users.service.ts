import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap, throwError } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly PLAYLIST_API_URL_HTTP = "http://localhost:3000/";

  public readonly estConnectee: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Stocker les informations utilisateur dans l'objet local
  seConnecter(pseudo: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.PLAYLIST_API_URL_HTTP + "connexion", { pseudo, password }).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('utilisateurCourrant', JSON.stringify({ pseudo, password }));
          this.estConnectee.next(true);
        } else {
          this.estConnectee.next(false);
        }
      }),
      map(response => response.success)
    );
  }

  // Récupérer les informations utilisateur depuis l'objet local
  getUser(): IUser {
    const currentUser = localStorage.getItem('utilisateurCourrant');
    return currentUser ? JSON.parse(currentUser) : null;

  }

  // Déconnexion de l'utilisateur
  deconnexion(): void {
    localStorage.removeItem('currentUser');
    this.estConnectee.next(false);
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

