import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/@shared/models/character';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent  {

  @Input() characters?: Character[];
  constructor() { }

}
