import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  colmuns = 3;
  category: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  onColumnCountChange(columnsNumber: number): void {
    this.colmuns = columnsNumber;
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log('home category', newCategory);
  }
}
