import { Component, OnInit } from '@angular/core';

// explain this code to me please
 
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  columns = 3;
  rowHeight = ROWS_HEIGHT[this.columns];
  category: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  onColumnCountChange(columnsNumber: number): void {
    this.columns = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.columns];
    console.log('columncountsokay', this.columns, this.rowHeight)
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log('home category', newCategory);
  }
}
