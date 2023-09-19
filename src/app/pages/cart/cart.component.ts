import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.models';
import { CartService } from 'src/app/services/cart.service';

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
      {
        id: 1,
        product: 'https://via.placeholder.com/150',
        name: 'sneakers',
        price: 150,
        quantity: 3,
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

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    // subscribe to cart item
    this._cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.dataSource = cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }

  onClearCart() {
    this._cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) {
    this._cartService.removeFromCart(item);
  }
}
