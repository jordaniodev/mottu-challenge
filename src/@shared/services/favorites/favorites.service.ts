import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  private favoritesSubject = new BehaviorSubject<number[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  addFavorite(id: number): void {
    const currentFavorites = this.favoritesSubject.getValue();
    if (!currentFavorites.includes(id)) {
      this.favoritesSubject.next([...currentFavorites, id]);
    }
  }

  cleanFavorites(){
    this.favoritesSubject.next([]);
  }

  removeFavorite(id: number): void {
    const currentFavorites = this.favoritesSubject.getValue();
    this.favoritesSubject.next(currentFavorites.filter(favId => favId !== id));
  }

  isFavorite(id: number): boolean {
    const currentFavorites = this.favoritesSubject.getValue();
    return currentFavorites.includes(id);
  }

  countFavorite(){
    return this.favoritesSubject.getValue().length;
  }

}
