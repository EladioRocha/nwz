import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() page: number
  @Input() totalPages: number
  public pages: number[]

  constructor() {}

  fillArrayPages() {
    this.pages = []
    for(let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i)
    }
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.totalPages) {
      this.totalPages = changes.totalPages.currentValue
      this.fillArrayPages()
    }
    if(changes.page) {
      this.page = changes.page.currentValue
    }
  }

}
