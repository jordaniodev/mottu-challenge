import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, first, mergeMap, Observable, of, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Character } from 'src/@shared/models/character';
import { SearchCharacter } from 'src/@shared/services/character/character.interface';
import { CharacterService } from 'src/@shared/services/character/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  public searchControl: FormControl = new FormControl();
  public charactersSearch?: SearchCharacter;
  public page = 1;
  @ViewChild('scrollTrigger') scrollTrigger!: ElementRef;

  private intersectionObserver!: IntersectionObserver;
  isLoading = false; 
  isLoadingMore = false; 
  private destroy$ = new Subject<void>();

  constructor(
    private characterService: CharacterService,
  ) { }

  ngOnInit(): void {
    this.initializeSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }


  private initializeSearch(){
    this.searchControl.valueChanges.pipe(
      startWith(''),
      tap(() => this.isLoading = true),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name => this.characterService.searchCharacter(name)),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.charactersSearch = response; 
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(){
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoading && !this.isLoadingMore) {
          this.loadMoreCharacters()
        }
      });
    }, {
      root: null,
      threshold: 0.5 
    });

    this.intersectionObserver.observe(this.scrollTrigger.nativeElement);
  }

  public loadMoreCharacters(): void {
    this.isLoadingMore = true;
    this.page++;
    this.characterService.searchCharacter(this.searchControl.value, this.page).pipe(
      first()
    )
    .subscribe(newData => {
      this.charactersSearch = {
        info: newData.info,
        results: [...this.charactersSearch!.results, ...newData.results]
      };
      this.isLoadingMore = false;
    });
  }
}

