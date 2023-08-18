import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  categories = ['shoes', 'sports'];

  @Output() showCategory = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    console.log('category', category);
  }
}
