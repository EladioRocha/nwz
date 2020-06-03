import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticationLoginResponse, DataNullResponse, GenresResponse } from '../common/interfaces'
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
  uploadBook(title: string, author: string, isbn: string, numPages: string, summary: string, genre: string, format: string[], language: string): Observable<DataNullResponse> {
    return this._http.post<DataNullResponse>(`${this.API_URL}/books`, {
      title,
      author,
      isbn,
      numPages,
      summary,
      genre,
      format,
      language
    }, this.setHeaders())
  }
  /** ==================== END BOOKS ==================== **/


  /** ==================== GENRES ==================== **/
  getAllGenres(): Observable<GenresResponse> {
    return this._http.get<GenresResponse>(`${this.API_URL}/genres`)
  }
  /** ==================== END GENRES ==================== **/


  setHeaders() {
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this._cookieService.get('token')}`)
    }
  }
}
