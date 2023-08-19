import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false; //if someone clicks on the product box, it will be full width

  constructor() {}

  ngOnInit(): void {}
}
