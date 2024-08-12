import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a favorite', () => {
    service.addFavorite(1);
    service.favorites$.subscribe(favorites => {
      expect(favorites).toContain(1);
    });
  });

  it('should not add a duplicate favorite', () => {
    service.addFavorite(1);
    service.addFavorite(1);
    service.favorites$.subscribe(favorites => {
      expect(favorites.length).toBe(1);
    });
  });

  it('should clean all favorites', () => {
    service.addFavorite(1);
    service.cleanFavorites();
    service.favorites$.subscribe(favorites => {
      expect(favorites.length).toBe(0);
    });
  });

  it('should remove a favorite', () => {
    service.addFavorite(1);
    service.addFavorite(2);
    service.removeFavorite(1);
    service.favorites$.subscribe(favorites => {
      expect(favorites).not.toContain(1);
      expect(favorites).toContain(2);
    });
  });

  it('should check if an item is a favorite', () => {
    service.addFavorite(1);
    expect(service.isFavorite(1)).toBeTrue();
    expect(service.isFavorite(2)).toBeFalse();
  });

  it('should count the number of favorites', () => {
    service.addFavorite(1);
    service.addFavorite(2);
    expect(service.countFavorite()).toBe(2);
  });
});
