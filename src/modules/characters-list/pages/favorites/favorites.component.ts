import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, iif, Observable, switchMap } from 'rxjs';
import { Character } from 'src/@shared/models/character';
import { SearchCharacter } from 'src/@shared/services/character/character.interface';
import { CharacterService } from 'src/@shared/services/character/character.service';
import { FavoritesService } from 'src/@shared/services/favorites/favorites.service';
import { EmptyBoxInfo } from '../../components/empty-box/empty-box.types';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favoriteCharacters$?: Observable<Character[]>;
  public readonly emptyInfo: EmptyBoxInfo = {
    title: 'Parece que você ainda não tem favoritos',
    subTitle: 'Volte à página inicial e escolha os melhores para você.',
    action: {
      label: 'Voltar ao início',
      route: '/'
    }
  }

  constructor(
    private favoritesService: FavoritesService,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.favoriteCharacters$ = this.favoritesService.favorites$.pipe(
      switchMap(ids => this.characterService.searchCharacterByIds(ids))
    );
  }

  get countFavorites(){
    return this.favoritesService.countFavorite();
  }

}
