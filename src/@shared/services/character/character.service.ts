import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { SearchCharacter } from './character.interface';
import { environment } from 'src/environments/environment';
import { Character } from 'src/@shared/models/character';
import { InfoPagination } from '../services.interface';



@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private httpClient: HttpClient
  ) { }

  searchCharacter(name?: string): Observable<SearchCharacter> {
    let params = new URLSearchParams();
    if (name) params.set('name', name);
    return this.httpClient.get<SearchCharacter>(`${environment.apiUrl}?${params.toString()}`).pipe(
      map(response => response),
      catchError(error => {
        if (error.status === 404) {
          return of({ info: {} as InfoPagination, results: [] } as SearchCharacter);
        }
        throw error;
      })
    );
  }

  searchCharacterByIds(ids: number[]): Observable<Character[]> {
    return this.httpClient.get<Character | Character[]>(`${environment.apiUrl}${ids.join(',')}`).pipe(
      map(response => Array.isArray(response) ? response : [response])
    );
  }
}
