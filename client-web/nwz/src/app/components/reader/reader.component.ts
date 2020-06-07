import { Component, OnInit } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {
  public pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  public currentPage: number
  public totalPages: number
  constructor() {
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this.currentPage = 1
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
