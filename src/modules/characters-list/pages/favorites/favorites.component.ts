import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, iif, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Character } from 'src/@shared/models/character';
import { SearchCharacter } from 'src/@shared/services/character/character.interface';
import { CharacterService } from 'src/@shared/services/character/character.service';
import { FavoritesService } from 'src/@shared/services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favoriteCharacters$?: Observable<Character[]>;
  public isLoading = false;
  public searchControl: FormControl = new FormControl();

  constructor(
    private favoritesService: FavoritesService,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.favoriteCharacters$ = this.favoritesService.favorites$.pipe(
      switchMap(ids => this.characterService.searchCharacterByIds(ids)),
    );
  }

  get countFavorites(){
    return this.favoritesService.countFavorite();
  }

  listFiltered(characters: Character[]) {
    if(this.searchControl.value === '' || this.searchControl.value === null) return characters;
    return characters.filter((character) => new RegExp(this.searchControl.value, 'i').test(character.name))
  }

  cleanFavorites() {
    this.favoritesService.cleanFavorites();
  }

  cleanFilter(){
    this.searchControl.setValue('');
  }
}
