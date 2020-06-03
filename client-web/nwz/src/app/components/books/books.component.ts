import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Genre } from '../../common/interfaces'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  public modal: boolean
  public genres: Genre[]
  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor(private _api: ApiService) { 
    this.modal = false
  }

  hideModal(e: boolean /** Event e: boolean */) {
    this.modal = e
  }

  showModal() {
    this._api.getAllGenres().subscribe(response => this.genresResponse(response))
    this.modal = true
  }

  genresResponse(response) {
    if(response.status !== 200) {

      return false
    }
    this.genres = response.data
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
