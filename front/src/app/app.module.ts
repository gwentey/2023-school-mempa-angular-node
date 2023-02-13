import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CreerComponent} from "./creer/creer.component";

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
