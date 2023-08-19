import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.models';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        id: 1,
        product: 'https://via.placeholder.com/150',
        name: 'sneakers',
        price: 150,
        quantity: 1,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }
}
