import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Genre, Format, Language, BooksBunch } from '../../common/interfaces'

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
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(private _api: ApiService) { 
    this.modal = false
  }

  ngOnInit(): void {
    this._api.getBunchOfBooks().subscribe(response => this.booksResponse(response))
  }

  booksResponse(response) {
    if(response.status !== 200) {
      return false
    }
    this.books = response.data
    console.log(this.books)
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

    this._api.uploadBook(title, author, isbn, numPages, summary, genre, [...(format === 'Ambos') ? 'PDF,FÍSICO'.split(',') : [format]], language).subscribe(response => this.uploadBookResponse(response))
  }

  uploadBookResponse(response) {
    console.log(response)
  }
}
