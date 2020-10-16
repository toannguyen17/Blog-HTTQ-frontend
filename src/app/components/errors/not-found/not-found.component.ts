import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '.not-found',
  templateUrl: './not-found.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
