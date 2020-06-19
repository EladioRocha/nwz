import { Pipe, PipeTransform } from '@angular/core';
import { Format } from '../common/interfaces'

@Pipe({
  name: 'bookFormat'
})
export class BookFormatPipe implements PipeTransform {
  transform(value: Format[]): string {
    if(value) {
      return value.map(el => el.name).join(' - ');
    }
  }

}
