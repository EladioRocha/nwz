import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  transform(isbn: string): unknown {
    return (isbn === '0000000000000') ? '-' : isbn
  }

}
