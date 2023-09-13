import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input() get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    // udpate cart quantity
    // this.itemsQuantity = cart.items.reduce(
    //   (acc, item) => acc + item.quantity,
    //   0
    // );

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private _cartService: CartService) {}


  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }

}
