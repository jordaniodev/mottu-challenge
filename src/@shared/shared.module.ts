import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ComponentsModule } from './components/components.module';
import { CharacterService } from './services/character/character.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    HttpClientModule
  ],
  exports: [
    ComponentsModule,
  ],
  providers:[
    CharacterService
  ]
})
export class SharedModule { }
