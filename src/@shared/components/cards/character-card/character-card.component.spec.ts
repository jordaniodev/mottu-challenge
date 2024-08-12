import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { By } from '@angular/platform-browser';
import { FavoritesService } from 'src/@shared/services/favorites/favorites.service';
import { Character } from 'src/@shared/models/character';
import { DebugElement } from '@angular/core';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;
  let favoriteService: jasmine.SpyObj<FavoritesService>;
  let character: Character;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavoritesService', ['isFavorite', 'addFavorite', 'removeFavorite']);

    await TestBed.configureTestingModule({
      declarations: [ CharacterCardComponent ],
      providers: [
        { provide: FavoritesService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    favoriteService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;

    character = {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      image: '/assets/img/rick.png'
    };

    component.character = character;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display character name and species', () => {
    const nameElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid="nameCharacter"]')).nativeElement;
    const speciesElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid="specieCharacter"]')).nativeElement;
    expect(nameElement.textContent).toContain('Rick Sanchez');
    expect(speciesElement.textContent).toContain('Human');
  });

  it('should call toggleFavorite on heart icon click', () => {
    spyOn(component, 'toggleFavorite');
    const heartIcon: DebugElement = fixture.debugElement.query(By.css('.like-button'));
    heartIcon.triggerEventHandler('click', null);
    expect(component.toggleFavorite).toHaveBeenCalledWith(1);
  });

  it('should toggle favorite state', () => {
    favoriteService.isFavorite.and.returnValue(true);
    expect(component.isFavorited).toBeTrue();
    favoriteService.isFavorite.and.returnValue(false);
    expect(component.isFavorited).toBeFalse();
  });

  it('should call favoriteService.addFavorite when toggling to favorite', () => {
    favoriteService.isFavorite.and.returnValue(false);
    component.toggleFavorite(character.id);
    expect(favoriteService.addFavorite).toHaveBeenCalledWith(character.id);
  });

  it('should call favoriteService.removeFavorite when toggling to unfavorite', () => {
    favoriteService.isFavorite.and.returnValue(true);
    component.toggleFavorite(character.id);
    expect(favoriteService.removeFavorite).toHaveBeenCalledWith(character.id);
  });

  it('should change heart icon based on favorite state', () => {
    favoriteService.isFavorite.and.returnValue(true);
    fixture.detectChanges();
    const heartIcon: HTMLImageElement = fixture.debugElement.query(By.css('.like-button img')).nativeElement;
    expect(heartIcon.src).toContain('/assets/img/icons/heart.svg');

    favoriteService.isFavorite.and.returnValue(false);
    fixture.detectChanges();
    expect(heartIcon.src).toContain('/assets/img/icons/heart-unlike.svg');
  });

  it('should display character image', () => {
    const imageElement: HTMLImageElement = fixture.debugElement.query(By.css('[data-testid="imageCoverCharacter"]')).nativeElement;
    expect(imageElement.src).toContain('/assets/img/rick.png');
  });
});
