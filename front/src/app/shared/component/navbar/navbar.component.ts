import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private usersService : UsersService, private route : Router) {}

  deconnexion() {
    this.usersService.deconnexion();
    this.route.navigate(['connexion']);
  }
}
