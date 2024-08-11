import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from './character-card/character-card.component';



@NgModule({
  declarations: [
    CharacterCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharacterCardComponent
  ]
})
export class CardsModule { }
