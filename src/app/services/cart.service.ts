import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // set a behavior subject with an empty cart that listens to local storage

  // cart = new BehaviorSubject<Cart>(
  //   JSON.parse(localStorage.getItem('cart') ) || { items: [] }
  // );

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
    this._snackbar.open('1 item added to cart', 'Ok', { duration: 3000 });
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity -= 1;

        if (_item.quantity === 0) {
          // this.removeFromCart(item);
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: filteredItems });
    this._snackbar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((previous, current) => previous + current, 0);
  }

  // emit empty value
  clearCart() {
    this.cart.next({ items: [] });
    this._snackbar.open('Cart has been cleared.', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter((i) => i.id !== item.id);
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackbar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }
    return filteredItems;
  }




}
