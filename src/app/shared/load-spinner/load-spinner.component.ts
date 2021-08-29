import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-spinner',
  template: '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
