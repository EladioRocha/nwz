import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Genre, Format, Language, BooksBunch } from '../../common/interfaces'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public modal: boolean
  public genres: Genre[]
  public formats: Format[]
  public languages: Language[]
  public books: BooksBunch
  public page: number
  public totalPages: number
  public currentPage: number
  public currentGenre: string
  public existBooks: boolean

  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  @ViewChild('app-pagination') pagination

  constructor(private _api: ApiService, private _route: ActivatedRoute) { 
    this.modal = false
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(values => { 
      this.currentPage = values.pagina
    })
    this._api.handleMultipleGetRequest(this._api.getBunchOfBooks(this.currentPage), this._api.getAllGenres()).subscribe(response => {
      this.booksResponse(response[0])
      this.genresResponse(response[1])
    })
  }

  booksResponse(response) {
    if(response.status !== 200) {
      return false
    }
    
    const paginaiton = response.data.pop()
    this.page = paginaiton.page
    this.totalPages = paginaiton.totalPages
    this.books = response.data
    this.existBooks = Object.values(this.books).length === 0
  }

  hideModal(e: boolean /** Event e: boolean */) {
    this.modal = e
  }

  showModal() {
    this._api.handleMultipleGetRequest(this._api.getAllGenres(), this._api.getAllFormats(), this._api.getAllLanguages()).subscribe(response => {
      this.genresResponse(response[0])
      this.formatsReponse(response[1])
      this.languagesResponse(response[2])
    })

    this.modal = true
  }

  genresResponse(response) {
    if(response.status !== 200) {
      return false
    }
    this.genres = response.data
    console.log(this.genres)
  }

  formatsReponse(response) {
    if(response.status !== 200) {
      return false
    }
    this.formats = response.data
  }

  languagesResponse(response) {
    if(response.status !== 200) {
      return false
    }
    this.languages = response.data
  }

  uploadBook() {
    const title: string = (document.querySelector('#book-title') as HTMLInputElement).value,
      author: string = (document.querySelector('#book-author') as HTMLInputElement).value,
      isbn: string = (document.querySelector('#book-isbn') as HTMLInputElement).value,
      numPages: string = (document.querySelector('#book-number-pages') as HTMLInputElement).value,
      summary: string = (document.querySelector('#book-summary') as HTMLInputElement).value,
      genre: string = (document.querySelector('#book-genre') as HTMLInputElement).value,
      format: string = (document.querySelector('#book-format') as HTMLInputElement).value,
      language: string = (document.querySelector('#book-language') as HTMLInputElement).value;
                                                                                                        // PDF ID                 // FÍSICO ID
    this._api.uploadBook(title, author, isbn, numPages, summary, genre, [...(format === 'Ambos') ? '5ecec9791ba037668c2fc64c,5ecec9791ba037668c2fc64e'.split(',') : [format]], language).subscribe(response => this.uploadBookResponse(response))
  }

  uploadBookResponse(response) {
    if(response.status !== 200) {
      return false
    }
    console.log(response)
  }

  getBunchOfBooks() {
    this._route.queryParams.subscribe(values => {
      this._api.getBunchOfBooks(values.pagina, this.currentGenre).subscribe(response => this.booksResponse(response))
    })
  }

  filterBooksByGenre(genre) {
    this._route.queryParams.subscribe(values => {
      this.currentGenre = genre
      this._api.getBunchOfBooks(values.pagina, this.currentGenre).subscribe(response => this.booksResponse(response))
    })
  }
}
