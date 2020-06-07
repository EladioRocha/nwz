import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookBorrowed'
})
export class BookBorrowedPipe implements PipeTransform {

  transform(borrowed: boolean): string {
    return (!borrowed) ? 'Disponible' : 'No disponible' 
  }

}
