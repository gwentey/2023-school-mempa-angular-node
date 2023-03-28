import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  public pseudo: string = "";
  public password: string = "";
  public uneErreur: boolean = false;

  constructor(private usersService: UsersService, private router: Router) { }

  seConnecter() {
    this.usersService.seConnecter(this.pseudo, this.password).subscribe({
      next:
        estConnectee => {
          if (estConnectee) {
            this.router.navigate(['']);
          }
        },
      error: () => {
        this.uneErreur = true;
        this.pseudo = "";
        this.password = "";
      }
    });
  }




}
