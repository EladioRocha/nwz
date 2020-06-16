import { Pipe, PipeTransform } from '@angular/core';
import { Format } from '../common/interfaces'

@Pipe({
  name: 'bookBorrowed'
})
export class BookBorrowedPipe implements PipeTransform {

  transform(borrowed: boolean[], formats: Format[]): string {
    console.log('MYYYY PIPE', formats, borrowed)
    if(formats !== undefined) {
      let txtTag = 'No disponible'
      if((formats[0].name === 'PDF' && borrowed[0] === true) && (formats[1] && formats[1].name === 'Físico' && borrowed[1] === false)) {
        txtTag = 'Disponible'
      }
      if((formats[0].name === 'PDF') && (borrowed[0] === false) && (formats[1] && formats[1].name === 'Físico' && borrowed[1] === true)) {
        txtTag = 'Disponible'
      }
      if((formats[0].name === 'PDF' && borrowed[0] === false && !formats[1])) {
        txtTag = 'Disponible'
      }
      if((formats[0].name === 'Físico' && borrowed[1] === false && !formats[1])) {
        txtTag = 'Disponible'
      }
      
      return txtTag
    }
  }
}
