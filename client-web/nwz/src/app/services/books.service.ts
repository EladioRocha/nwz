import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public books
  public fromSearch: boolean = false 
  public term: string
  public pagination
  public page
  public totalPages

  constructor() { }
}
