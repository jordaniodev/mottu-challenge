import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { CardsModule } from './cards/cards.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    CardsModule,
  ],
  exports:[
    CommonModule,
    LayoutModule,
    CardsModule,
  ]
})
export class ComponentsModule { }
