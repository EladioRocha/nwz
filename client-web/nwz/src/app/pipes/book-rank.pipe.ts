import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookRank'
})
export class BookRankPipe implements PipeTransform {

  transform(rankAvg: number, currentStar: number): string[] {
    return (currentStar <= rankAvg) ? ['fas', 'star'] : ['far', 'star'] 
  }

}
