import { Pipe, PipeTransform } from '@angular/core';
import { Format } from '../common/interfaces'

@Pipe({
  name: 'bookBorrowed'
})
export class BookBorrowedPipe implements PipeTransform {

  transform(borrowed: boolean[], formats: Format[]): string {
    if(formats !== undefined) {
      let tagTxt = 'No disponible'
      for(let [i, value] of formats.entries()) {
        if(borrowed[i] === false) {
          tagTxt = 'Disponible'
        }
      }
      return tagTxt
    }
  }
}
