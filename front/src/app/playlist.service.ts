import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  restURL = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  creerPlaylist(){
    let req = this.httpClient.post(this.restURL+"/creerplaylist", {});
    return req;
  }
}
