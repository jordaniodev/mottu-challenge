import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { FavoritesService } from 'src/@shared/services/favorites/favorites.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    console.log(this.router.url)
  }

  public isActiveRoute(route: string){
    return this.router.url === route;
  }


  get countFavorites(): number{
    return this.favoritesService.countFavorite() || 0 ;
  }
}
