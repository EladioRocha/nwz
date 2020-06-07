import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Format } from '../../common/interfaces'

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnChanges {
  public API_URL_BASE: string = 'https://nwz-s3-files.s3-us-west-1.amazonaws.com/images/covers'
  @Input() _id: string
  @Input() title: string
  @Input() formats: Format[]
  @Input() genre: string
  @Input() borrowed: boolean
  @Input() filename: string
  @Input() hasGenre: boolean = true

  ngOnChanges(changes) {
    if(changes.filename){
      this.filename = `${this.API_URL_BASE}/${changes.filename.currentValue}.png`
    }
  }
}
