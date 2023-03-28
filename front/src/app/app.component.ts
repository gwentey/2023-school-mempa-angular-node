import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';
  estConnectee !: Boolean;

  constructor(private usersService : UsersService){}

  ngOnInit(): void {
    this.usersService.estConnectee.subscribe(value => {
      this.estConnectee = value;
      console.log(this.estConnectee);
    });
  }
  
}
