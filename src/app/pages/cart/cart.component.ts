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

  getTotal(items: Array<CartItem>): number {
    // return this.dataSource.reduce((acc, item) => {
    //   return acc + item.price * item.quantity;
    // }, 0);

    return items
      .map((item) => item.price * item.quantity)
      .reduce((previous, current) => previous + current, 0);
  }
}
