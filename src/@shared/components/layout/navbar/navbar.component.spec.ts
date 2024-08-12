import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/@shared/services/favorites/favorites.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Location } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavoritesService', ['countFavorite']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'characters', component: DummyComponent },
          { path: 'characters/favorites', component: DummyComponent }
        ])
      ],
      providers: [{ provide: FavoritesService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    router.initialNavigation(); // Navegação inicial para definir a rota
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for active route', async () => {
    await router.navigate(['/characters']);
    fixture.detectChanges();
    expect(component.isActiveRoute('/characters')).toBeTrue();
  });

  it('should return false for inactive route', async () => {
    await router.navigate(['/characters']);
    fixture.detectChanges();
    expect(component.isActiveRoute('/characters/favorites')).toBeFalse();
  });

  it('should display the correct count of favorites', () => {
    favoritesService.countFavorite.and.returnValue(5);
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.bagde')).nativeElement;
    expect(badge.textContent).toBe('5');
  });

  it('should display active icon for active route', async () => {
    await router.navigate(['/characters']);
    fixture.detectChanges();
    const homeIcon = fixture.debugElement.query(By.css('img[alt="Home"]')).nativeElement;
    expect(homeIcon.src).toContain('/assets/img/icons/home.svg');
  });

  it('should display inactive icon for inactive route', async () => {
    await router.navigate(['/characters']);
    fixture.detectChanges();
    const favoritesIcon = fixture.debugElement.query(By.css('img[alt="Heart"]')).nativeElement;
    expect(favoritesIcon.src).toContain('/assets/img/icons/heart-inactive.svg');
  });
});

// Componente Dummy necessário para a configuração das rotas de teste
import { Component } from '@angular/core';

@Component({
  template: ''
})
class DummyComponent {}
