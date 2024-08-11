import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/@shared/models/character';
import { FavoritesService } from 'src/@shared/services/favorites/favorites.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() character?: Character;

  constructor(
    private favoriteService: FavoritesService
  ) { }

  ngOnInit(): void {

  }

  toggleFavorite(id: number): void {
    if(this.favoriteService.isFavorite(id)){
      this.favoriteService.removeFavorite(id);
      return;
    }
    this.favoriteService.addFavorite(id);
  }

  get isFavorited(){
    return this.favoriteService.isFavorite(this.character!.id); 
  }

}
