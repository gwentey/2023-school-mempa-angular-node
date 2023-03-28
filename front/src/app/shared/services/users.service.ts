import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly PLAYLIST_API_URL_HTTP = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  
}
