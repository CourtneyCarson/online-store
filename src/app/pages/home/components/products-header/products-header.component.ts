import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent {
  sort = 'desc';
  itemsShowCount = 12;

  @Output() columnCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
    // console.log('sort val', this.sort);
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
    // console.log('itemsShowCount val', this.itemsShowCount);
  }

  onColumnsUpdated(columnsNumber: number): void {
    // console.log('prodsheadercount emittingg', columnsNumber);
    this.columnCountChange.emit(columnsNumber);
  }
}
