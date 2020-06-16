import { Component } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nwz';
  searcher: boolean = false

  constructor(
    public _user: UserService,
    private _api: ApiService,
    private _books: BooksService,
    private _router: Router
  ) { 
    library.add(fas, far, fab)
  }

  showSearcher() {
    this.searcher = !this.searcher
  }

  searchBooks(term) {
    this._api.searchBook(term).subscribe(response => {
      this._books.pagination = response.data.pop()
      this._books.page = this._books.pagination.page
      this._books.totalPages = this._books.pagination.totalPages
      this._books.books = response.data
    })
    this._books.fromSearch = true
    this._books.term = term
    this._router.navigate(['/libros'])
        
    console.log('wooorks', this._books)
  }
}
