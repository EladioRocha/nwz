import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { Book } from '../../common/interfaces'
import { BookSingleService } from 'src/app/services/book-single.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-single',
  templateUrl: './book-single.component.html',
  styleUrls: ['./book-single.component.scss']
})
export class BookSingleComponent implements OnInit {
  public book: Book
  public modal: boolean
  public days: number[]
  public requestDigital: boolean
  public hasBook: boolean
  public hasPdf: boolean = true
  public bookBorrowed: boolean
  public pdfBorrowed: boolean
  private myQualification: number

  constructor(private _router: Router, private _route: ActivatedRoute, private _api: ApiService, public bookSingle: BookSingleService, private _toastr: ToastrService) {
    this.days = [1, 2, 3, 4, 5, 6, 7]
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this._api.getSingleBook(this._route.snapshot.paramMap.get('id')).subscribe(response => this.bookResponse(response))
  }

  bookResponse(response) {
    console.log(response)
    if(response.status !== 200) {
      return false
    } else if(response.status === 200) {
      this.book = response.data
      this.hasBook = this.book.format_id.findIndex(el => el.name === 'Físico') >= 0
      this.hasPdf = this.book.format_id.findIndex(el => el.name === 'PDF') >= 0
      this.pdfBorrowed = this.book.borrowed[0]
      this.bookBorrowed = this.book.borrowed[1]
      this.bookSingle.book = this.book._id
      this.bookSingle.rank = this.book.rank
      this.bookSingle.picture = `${this.bookSingle.API_URL_BASE}/${this.book.filename}.png`
    }
  }

  updateRank(qualification: number) {
    this.myQualification = qualification
    this._api.updateRank(qualification, this.bookSingle.book).subscribe(response => this.rankResponse(response))
  }

  rankResponse(response) {
    const status = response.status
    if(status === 200) {
      this._toastr.success(response.message, 'Calificación guardada.')
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha salido mal.')
    }
    console.log(response)
  }
  
  showModal(requestDigital: boolean) {
    this.requestDigital = requestDigital
    this.modal = true
  }

  hideModal(e: boolean) {
    this.modal = e
  }

  getDays(value: number) {
    this.bookSingle.days = value
  }

  requestBook(format_id: string, format) {
    this._api.requestBook(this.bookSingle.book, this.bookSingle.days, format_id, format).subscribe(response => this.requestBookResponse(response))
  }

  requestBookResponse(response) {
    const status = response.status
    if(status === 200) {
      this.pdfBorrowed = true
      this.modal = false
      this._router.navigate(['/libros/lectura', this.book._id])
      this._toastr.success(response.message)
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha salido mal.')
    }
    console.log(response)
  }

  sendMessage() {
    this._api.sendMessage(this.bookSingle.book).subscribe(response => this.sendMessageResponse(response))
  }

  sendMessageResponse(response) {
    console.log(response)
    if(response.status !== 200) {
      return false
    }
  }
}
