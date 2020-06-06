import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookSingleService {
  public book: string
  public rank: number
  public days: number
  
  constructor() { 
    this.days = 1
  }
}
