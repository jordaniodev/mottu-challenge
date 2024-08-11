import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, Observable, startWith, switchMap, tap } from 'rxjs';
import { SearchCharacter } from 'src/@shared/services/character/character.interface';
import { CharacterService } from 'src/@shared/services/character/character.service';
import { EmptyBoxInfo } from '../../components/empty-box/empty-box.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public searchControl: FormControl = new FormControl();
  public charactersList$?: Observable<SearchCharacter>;
  public readonly emptyInfo: EmptyBoxInfo = {
    title: 'Nada foi encontrado',
    subTitle: 'Tente realizar uma nova busca.'
  }
  constructor(
    private characterService: CharacterService,
  ) { }

  ngOnInit(): void {
    this.charactersList$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name => this.characterService.searchCharacter(name))
    )
  }
}
