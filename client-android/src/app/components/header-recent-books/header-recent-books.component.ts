import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-recent-books',
  templateUrl: './header-recent-books.component.html',
  styleUrls: ['./header-recent-books.component.scss']
})
export class HeaderRecentBooksComponent {
  @Input() booksRank: any

  constructor() {

  }

}
