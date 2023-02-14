import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import {CreerComponent} from "./creer/creer.component";
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { PlaylistListComponent } from './shared/component/playlist-list/playlist-list.component';


const appRoutes = [
  {path: '', component: AccueilComponent},
  {path: 'creer', component: CreerComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    CreerComponent,
    PlaylistListComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
