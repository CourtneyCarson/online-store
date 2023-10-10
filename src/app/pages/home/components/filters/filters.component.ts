import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;

  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktop: boolean = false;
  sidePanelMode: string | undefined;


  @Output() showCategory = new EventEmitter<string>();

  constructor(private storeService: StoreService) {
    this.checkMediaQuery();
    this.setSidePanelMode();
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => {
        this.categories = _categories;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    console.log('category', category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription?.unsubscribe();
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

  setSidePanelMode() {
    if (this.isMobile || this.isTablet) {
      this.sidePanelMode = 'over';
    } else {
      this.sidePanelMode = 'side';
    }
    console.log(this.sidePanelMode);
  }
}

