import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { environment } from 'src/environments/environment';
import { SearchCharacter } from './character.interface';
import { Character } from 'src/@shared/models/character';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });
    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchCharacter', () => {
    it('should return SearchCharacter when called with name and page', () => {
      const mockResponse: SearchCharacter = {
        info: { count: 1, pages: 1, next: '', prev: '' },
        results: [{ id: 1, name: 'Rick Sanchez', species: 'Human', image: '' }]
      };

      service.searchCharacter('Rick', 1).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}?page=1&name=Rick`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return empty SearchCharacter when API returns 404', () => {
      service.searchCharacter('NonExistingCharacter', 1).subscribe(response => {
        expect(response).toEqual({ info: {} as any, results: [] });
      });

      const req = httpMock.expectOne(`${environment.apiUrl}?page=1&name=NonExistingCharacter`);
      expect(req.request.method).toBe('GET');
      req.flush({}, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('searchCharacterByIds', () => {
    it('should return an array of Characters when called with multiple IDs', () => {
      const mockResponse: Character[] = [
        { id: 1, name: 'Rick Sanchez', species: 'Human', image: '' },
        { id: 2, name: 'Morty Smith', species: 'Human', image: '' }
      ];

      service.searchCharacterByIds([1, 2]).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}1,2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return a single Character wrapped in an array when called with a single ID', () => {
      const mockResponse: Character = { id: 1, name: 'Rick Sanchez', species: 'Human', image: '' };

      service.searchCharacterByIds([1]).subscribe(response => {
        expect(response).toEqual([mockResponse]);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
