import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'products-header',
  templateUrl: './products-header.component.html',
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  sort = 'desc';

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    // this.sort = this.sort === 'desc' ? 'asc' : 'desc';
    this.sort = newSort;
    console.log('sort val', this.sort);
  }
}
