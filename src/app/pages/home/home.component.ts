import { Component, OnInit } from '@angular/core';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 2: 335, 3: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  colmuns = 3;
  rowHeight = ROWS_HEIGHT[this.colmuns];
  category: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  onColumnCountChange(columnsNumber: number): void {
    this.colmuns = columnsNumber;
    this.rowHeight = ROWS_HEIGHT[this.colmuns];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log('home category', newCategory);
  }
}
