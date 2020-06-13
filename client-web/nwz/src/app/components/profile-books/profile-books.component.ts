import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-books',
  templateUrl: './profile-books.component.html',
  styleUrls: ['./profile-books.component.scss']
})
export class ProfileBooksComponent implements OnInit {

  public books
  private copyBooks
  public modal: boolean = false
  public singleBook
  private API_URL_BASE: string = 'https://nwz-s3-files.s3-us-west-1.amazonaws.com/images/covers'
  public keyword: string = 'name'
  public data: any[]
  private _currentAuthor: string

  constructor(private _api: ApiService, private _toastr: ToastrService) {
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this._api.getMyBooksUploaded().subscribe(response => this.getMyBooksUploadedResponse(response))
  }

  getMyBooksUploadedResponse(response) {
    const status = response.status
    if (status === 200) {
      this.books = response.data
      this.copyBooks = response.data
    } else if (status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  deleteBook(book: string) {
    this._api.deleteBook(book).subscribe(response => this.deleteBookResponse(response))
  }

  deleteBookResponse(response) {
    const status = response.status
    if (status === 200) {
      this._toastr.success(response.message)
    } else if (status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  searchBook(value) {
    const term = new RegExp(`${value}.*`, 'si')
    this.books = []
    this.books = this.copyBooks.filter(book => term.test(book.title))
  }

  openModalDataBook(book) {
    this._api.getSingleBook(book).subscribe(response => this.bookResponse(response))
    console.log(book)
  }

  hideModal(e) {
    this.modal = e
  }

  bookResponse(response) {
    const status = response.status
    if (status === 200) {
      this.modal = true
      this.singleBook = response.data
      console.log(response)
    } else if (status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  async updateBook(_id) {
    const title: string = (document.querySelector('#book-title') as HTMLInputElement).value,
      author: string = this._currentAuthor,
      isbn: string = (document.querySelector('#book-isbn') as HTMLInputElement).value,
      summary: string = (document.querySelector('#book-summary') as HTMLInputElement).value,
      genre: string = (document.querySelector('#book-genre') as HTMLInputElement).value,
      language: string = (document.querySelector('#book-language') as HTMLInputElement).value,
      numPages = (document.querySelector('#book-number-pages') as HTMLInputElement).value,
      file = (document.querySelector('#book-file') as HTMLInputElement).files[0];
    let image
    image = (!file) ? this.singleBook.filename : await this.getBase64File(file)
    this._api.updateBook(title, author, isbn, numPages, summary, genre, language, image, _id).subscribe(response => this.updateBookResponse(response))
    console.log('Actualizar')
  }

  updateBookResponse(response) {
    const status = response.status
    if (status === 200) {
      this.modal = false
      this._toastr.success(response.message)
      console.log(response)
    } else if (status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  getBase64File(file): unknown {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          console.log(reader.result)
          resolve(reader.result)
        }
      } catch (error) {
        console.log(error)
        reject('Parece que se ta ha olvidado subir un libro...')
      }
    })
  }

  onChangeSearch(value) {
    this._currentAuthor = value
    this._api.getAuthors(value).subscribe(response => this.searchResponse(response))
  }

  searchResponse(response) {
    this.data = response.data
  }

  selectEvent(value) {
    this._currentAuthor = value.name
  }
}
