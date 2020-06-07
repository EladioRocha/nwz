import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookSingleService {
  public API_URL_BASE: string = 'https://nwz-s3-files.s3-us-west-1.amazonaws.com/images/covers'
  public book: string
  public rank: number
  public days: number
  public picture: string
  
  constructor() { 
    this.days = 1
  }
}
