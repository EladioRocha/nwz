import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookSingleService {
  public id: string
  public rank: number
  
  constructor() { }
}
