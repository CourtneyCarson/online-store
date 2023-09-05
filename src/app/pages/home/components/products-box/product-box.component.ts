import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false; //if someone clicks on the product box, it will be full width
  product: Product | undefined = {
    id: 1,
    title: 'sneakers',
    price: 150,
    category: 'shoes',
    description: 'description',
    image: 'https://via.placeholder.com/150',
  };

  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    console.log('add to cart');
    this.addToCart.emit(this.product);
  }
}
