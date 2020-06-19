import { Component, OnInit } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})

export class ReaderComponent implements OnInit {
  public currentPage: number
  public totalPages: number
  public bookURL: string
  private book: string
  private _record: string
  private _PDF_URL = 'https://nwz-s3-files.s3-us-west-1.amazonaws.com/books/pdf'
  
  constructor(private _api: ApiService, private _route: ActivatedRoute, private _router: Router, private _toastr: ToastrService) {
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this.book = this._route.snapshot.paramMap.get('id')
    this.getBookToRead()
  }

  getBookToRead() {
    this._api.getBookToRead(this.book).subscribe(response => this.getBookToReadResponse(response)) 
  }

  getBookToReadResponse(response) {
    console.log(response)
    const status = response.status
    if(status === 200) {
      this.currentPage = response.data.page
      this.bookURL = this._PDF_URL+'/'+response.data.book_id.filename+'.pdf'
      this._record = response.data._id
    } else if (status === 400) {
      this._router.navigate(['/libros'])
      this._toastr.warning(response.message, 'Acceso denegado.')
    }else {
      this._toastr.error(response.message, 'Algo ha salido mal.')
    }
    
  }

  aftearLoadPdf(pdf): void {
    this.totalPages = pdf.pdfInfo.numPages
  }

  previousPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--
      this.updatePage()
    }
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage++
      this.updatePage()
    }
  }

  updatePage() {
    console.log('wooorks')
    this._api.updatePage(this.currentPage, this._record).subscribe(response => {
      console.log(response)
    })
  }

  returnBook(format) {
    this._api.returnBook(this.book, format).subscribe(response => this.returnBookResponse(response))
  }

  returnBookResponse(response) {
    const status = response.status
    if(status === 200) {
      this._toastr.success(response.message)
      this._router.navigate(['/libros'])
    } else if (status === 400) {
      this._toastr.warning(response.message)
    }else {
      this._toastr.error(response.message, 'Algo ha salido mal.')
    }
  }
}
