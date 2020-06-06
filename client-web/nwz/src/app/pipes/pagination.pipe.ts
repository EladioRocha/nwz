import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(pageArr: number, currentPage: number): boolean {
    return pageArr === currentPage
  }

}
