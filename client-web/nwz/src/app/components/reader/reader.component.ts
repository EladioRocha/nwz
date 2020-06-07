import { Component, OnInit } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})

export class ReaderComponent implements OnInit {
  // public pdfSrc = "https://nwz-s3-files.s3-us-west-1.amazonaws.com/books/pdf/Arduino+Curso+Pr%C3%A1ctico+de+formaci%C3%B3n+(+PDFDrive.com+).pdf";
  public currentPage: number
  public totalPages: number
  public bookURL: string
  constructor(private _api: ApiService, private _route: ActivatedRoute) {
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this.getBookToRead()
    this.currentPage = 1
  }

  getBookToRead() {
    this._api.getBookToRead(this._route.snapshot.paramMap.get('id')).subscribe(response => this.getBookToReadResponse(response)) 
  }

  getBookToReadResponse(response) {
    if(response.status !== 200) {
      return false
    }
    
    this.bookURL = response.data
  }

  aftearLoadPdf(pdf): void {
    this.totalPages = pdf.pdfInfo.numPages
  }

  previousPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--
    }
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage++
    }
  }
}
