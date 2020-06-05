import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { Book } from '../../common/interfaces'
import { BookSingleService } from 'src/app/services/book-single.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-book-single',
  templateUrl: './book-single.component.html',
  styleUrls: ['./book-single.component.scss']
})
export class BookSingleComponent implements OnInit {
  public book: Book
  constructor(private route: ActivatedRoute, private _api: ApiService, private bookSingle: BookSingleService) {
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this._api.getSingleBook(this.route.snapshot.paramMap.get('id')).subscribe(response => this.bookResponse(response))
  }

  bookResponse(response) {
    if(response.status !== 200) {
      return false
    }
    this.book = response.data
    this.bookSingle.id = this.book._id
    this.bookSingle.rank = this.book.rank
    console.log(response)
  }

  updateRank(qualification: number) {
    this._api.updateRank(qualification, this.bookSingle.id).subscribe(response => this.rankResponse(response))
  }

  rankResponse(response) {
    if(response.status !== 200) {
      return false
    }
    console.log(response)
  }
  
}
