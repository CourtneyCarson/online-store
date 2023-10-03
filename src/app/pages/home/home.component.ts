import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnCountChange(columnsNumber: number): void {
    this.columns = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columns];
    console.log('columncountsokay', this.columns, this.rowHeight);
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log('home category', newCategory);
  }

  onAddToCart(product: Product): void {
    console.log('add to cart', product);
    // service
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
