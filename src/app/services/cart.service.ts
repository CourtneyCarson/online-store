import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackbar: MatSnackBar) {}

  // add to cart - update cart object and emit
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    // is this item aleady in the cart?
    const itemInCart = items.find((i) => i.id === item.id);
    // if it exists, update the quantity
    if (itemInCart) {
      // itemInCart.quantity += item.quantity;
      itemInCart.quantity += 1;
    }
    // otherwise, add it to the cart
    else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackbar.open('1 Item added to cart', 'Ok', { duration: 3000 });
    console.log('cart service', this.cart.value);
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((previous, current) => previous + current, 0);
  }
}
