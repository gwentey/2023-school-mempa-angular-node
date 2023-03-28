import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { PlaylistListComponent } from './shared/component/playlist-list/playlist-list.component';
import { CreerPlaylistComponent } from './creer-playlist/creer-playlist.component';
import { PlaylistVoirComponent } from './playlist-voir/playlist-voir.component';
import { PlaylistResolver } from './shared/guards/playlist.resolver';
import { ConnexionComponent } from './connexion/connexion.component';


const appRoutes = [
  {path: '', 
  component: AccueilComponent,
  resolve: {
    playlists: PlaylistResolver
  }
  },
  {path: 'connexion', 
  component: ConnexionComponent,
  },
  {path: 'creer', component: CreerPlaylistComponent},
  {path: 'voir/:id', component: PlaylistVoirComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    PlaylistListComponent,
    CreerPlaylistComponent,
    PlaylistVoirComponent,
    ConnexionComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
