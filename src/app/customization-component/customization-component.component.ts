import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customization-component',
  templateUrl: './customization-component.component.html',
  styleUrls: ['./customization-component.component.css']
})
export class CustomizationComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cake_name:string="Test Cake"
  size_list:string[]=["Small","Medium","Large"]
  shape_list:string[]=["Round","Square","Rectagle"]
  flavour_list:string[]=["Chocolate","Vanilla"]
}
