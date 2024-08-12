import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CharacterService } from 'src/@shared/services/character/character.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SearchCharacter } from 'src/@shared/services/character/character.interface';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSpinner } from '@angular/material/progress-spinner';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let characterService: jasmine.SpyObj<CharacterService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharacterService', ['searchCharacter']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        { provide: CharacterService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    characterService = TestBed.inject(CharacterService) as jasmine.SpyObj<CharacterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize search', fakeAsync(() => {
    const mockResponse: SearchCharacter = { info: { count: 1, pages: 1, next: '', prev: '' }, results: [] };
    characterService.searchCharacter.and.returnValue(of(mockResponse));

    fixture.detectChanges(); // ngOnInit

    expect(component.isLoading).toBe(true);
    tick(300); // debounceTime
    fixture.detectChanges();

    expect(component.charactersSearch).toEqual(mockResponse);
    expect(component.isLoading).toBe(false);
  }));

  it('should load more characters on scroll', fakeAsync(() => {
    const initialResponse: SearchCharacter = { info: { count: 1, pages: 2, next: '', prev: '' }, results: [{ id: 1, name: 'Rick Sanchez', species: 'Human', image: '' }] };
    const moreResponse: SearchCharacter = { info: { count: 1, pages: 2, next: '', prev: '' }, results: [{ id: 2, name: 'Morty Smith', species: 'Human', image: '' }] };

    characterService.searchCharacter.and.returnValues(of(initialResponse), of(moreResponse));

    fixture.detectChanges(); // ngOnInit
    tick(300); // debounceTime
    fixture.detectChanges();

    component.ngAfterViewInit();
    fixture.detectChanges();

    expect(component.charactersSearch?.results.length).toBe(1);

    component.loadMoreCharacters();
    tick(300); // simulate network delay

    expect(component.charactersSearch?.results.length).toBe(2);
    expect(component.charactersSearch?.results[1].name).toBe('Morty Smith');
  }));
});
