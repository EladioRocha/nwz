import { Component, OnInit, Input } from '@angular/core';
import { Format } from '../../common/interfaces'

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() _id: string
  @Input() title: string
  @Input() formats: Format[]
  @Input() genre: string
  @Input() borrowed: boolean

  constructor() {
    
  }
}
