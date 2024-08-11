import { Component, Input, OnInit } from '@angular/core';
import { EmptyBoxInfo } from './empty-box.types';

@Component({
  selector: 'app-empty-box',
  templateUrl: './empty-box.component.html',
  styleUrls: ['./empty-box.component.scss']
})
export class EmptyBoxComponent implements OnInit {

  @Input() emptyInfo?: EmptyBoxInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
