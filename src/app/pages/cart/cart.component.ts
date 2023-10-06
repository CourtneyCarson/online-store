import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
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

  constructor(
    private _cartService: CartService,
    private httpClient: HttpClient
  ) {}

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

  onAddQuantity(item: CartItem) {
    this._cartService.addToCart(item);
  }
  onRemoveQuantity(item: CartItem) {
    this._cartService.removeQuantity(item);
  }

  onCheckout() {
    //  call stripe service - return session id, open check out page
    this.httpClient
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51NgZ9ACmKyG5WxKZaty4gFzhexl5DiFJkuvj5lWSYo7xWBMvlCWYnuwa5p1lT5oj2JmgRrfPVFfCYUS66GvxQbDt00LrCAtpug'
        );
        stripe?.redirectToCheckout({ sessionId: res.id });
      });
  }
}
