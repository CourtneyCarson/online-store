import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
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
  isMobile: boolean | undefined;
  isTablet: boolean | undefined;
  isDesktop: boolean | undefined;
  sidePanelMode: MatDrawerMode | undefined;
  showFiller = false;
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {
    this.checkMediaQuery();
    // this.setSidePanelMode();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMediaQuery();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnCountChange(columnsNumber: number): void {
    this.columns = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columns];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    // service
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }
  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  // create method that gets media query size
  private checkMediaQuery() {
    this.isMobile = window.matchMedia('(max-width: 600px)').matches;
    this.isTablet = window.matchMedia(
      '(min-width: 601px) and (max-width: 1024px)'
    ).matches;
    this.isDesktop = window.matchMedia('(min-width: 1025px)').matches;

    console.log(this.isMobile, this.isTablet, this.isDesktop);
  }

  // setSidePanelMode() {
  //   if (this.isMobile || this.isTablet) {
  //     this.sidePanelMode = 'over';
  //   } else {
  //     this.sidePanelMode = 'side';
  //   }
  //   console.log(this.sidePanelMode);
  // }
}
