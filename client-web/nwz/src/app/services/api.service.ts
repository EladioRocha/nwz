import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticationLoginResponse, DataNullResponse, GenresResponse, FormatsResponse, LanguagesResponse, BooksBunchResponse, BookResponse } from '../common/interfaces'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) { 
    this.API_URL = 'http://localhost:3000/api/v1'  
  }

  /** ==================== AUTHENTICATION ==================== **/
  login(email: string, password: string): Observable<AuthenticationLoginResponse> {
    return this._http.post<AuthenticationLoginResponse>(`${this.API_URL}/authentication/login`, {
      email,
      password
    })
  }

  register(firstname: string, lastname: string, username: string, email: string, password: string, confirmPassword: string): Observable<DataNullResponse> {
    return this._http.post<DataNullResponse>(`${this.API_URL}/authentication/register`, {
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword
    })
  }
  /** ==================== END AUTHENTICATION ==================== **/


  /** ==================== BOOKS ==================== **/
  uploadBook(title: string, author: string, isbn: string, numPages: unknown, summary: string, genre: string, format: string[], language: string, book: unknown): Observable<DataNullResponse> {
    return this._http.post<DataNullResponse>(`${this.API_URL}/books`, {
      title,
      author,
      isbn,
      numPages,
      summary,
      genre,
      format,
      language,
      book
    }, this.setHeaders())
  }

  getBunchOfBooks(page: number = 1, genre: string = 'All'): Observable<BooksBunchResponse> {
    return this._http.get<BooksBunchResponse>(`${this.API_URL}/books?page=${page}&genre=${genre}`)
  }

  getSingleBook(id: string): Observable<BookResponse> {
    return this._http.get<BookResponse>(`${this.API_URL}/books/${id}`)
  }

  updateRank(qualification: number, book: string): Observable<DataNullResponse>{
    return this._http.put<DataNullResponse>(`${this.API_URL}/books/rank`, {
      qualification,
      book
    }, this.setHeaders())
  }
  /** ==================== END BOOKS ==================== **/


  /** ==================== USERS ==================== **/
  requestBook(book: string, days: number): Observable<DataNullResponse> {
    return this._http.post<DataNullResponse>(`${this.API_URL}/users/record`, {
      book,
      days
    }, this.setHeaders())
  }

  sendMessage(book: string): Observable<DataNullResponse> {
    return this._http.post<DataNullResponse>(`${this.API_URL}/users/chat`, {
      book
    }, this.setHeaders())
  }
  /** ==================== END USERS ==================== **/


  /** ==================== GENRES ==================== **/
  getAllGenres(): Observable<GenresResponse> {
    return this._http.get<GenresResponse>(`${this.API_URL}/genres`)
  }
  /** ==================== END GENRES ==================== **/

  
  /** ==================== FORMATS ==================== **/
  getAllFormats(): Observable<FormatsResponse> {
    return this._http.get<FormatsResponse>(`${this.API_URL}/formats`)
  }
  /** ==================== END FORMATS ==================== **/


  /** ==================== LANGUAGES ==================== **/
  getAllLanguages(): Observable<LanguagesResponse> {
    return this._http.get<LanguagesResponse>(`${this.API_URL}/languages`)
  }
  /** ==================== END LANGUAGES ==================== **/

  handleMultipleGetRequest(...responses): Observable<any[]> {
    return forkJoin(responses)
  }
  
  setHeaders() {
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this._cookieService.get('token')}`)
    }
  }
}
