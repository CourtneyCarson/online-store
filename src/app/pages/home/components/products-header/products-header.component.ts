import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'products-header',
  templateUrl: './products-header.component.html',
  styles: [],
})
export class ProductsHeaderComponent implements OnInit {
  sort = 'desc';
  itemsShowCount = 12;

  @Output() columnCountChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    // this.sort = this.sort === 'desc' ? 'asc' : 'desc';
    this.sort = newSort;
    console.log('sort val', this.sort);
  }
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    console.log('itemsShowCount val', this.itemsShowCount);
  }

  onColumnsUpdated(columnsNumber: number): void {
    this.columnCountChange.emit(columnsNumber);
  }
}
