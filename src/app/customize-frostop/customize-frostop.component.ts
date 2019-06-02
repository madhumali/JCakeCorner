import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize-frostop',
  templateUrl: './customize-frostop.component.html',
  styleUrls: ['./customize-frostop.component.css']
})
export class CustomizeFrostopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  no_of_fros:number=10
  no_of_tops:number=10
}
