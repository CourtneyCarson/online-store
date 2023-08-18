import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  colmuns = 3;

  constructor() {}

  ngOnInit(): void {}

  onColumnCountChange(columnsNumber: number): void {
    this.colmuns = columnsNumber;
  }
}
