import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { ComponentsModule } from 'src/@shared/components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SharedModule } from 'src/@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    HomeComponent,
    CharactersListComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharactersRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class CharactersListModule { }
