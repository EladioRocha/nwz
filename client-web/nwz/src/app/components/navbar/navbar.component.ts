import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public modal: boolean
  public showLoginForm: boolean
  public search: boolean = false

  constructor(
    public _user: UserService,
    private _api: ApiService,
    private _cookieService: CookieService,
    private _toastr: ToastrService,
    private _books: BooksService,
    private _router: Router,
  ) {
    this.modal = false
    this.showLoginForm = true
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    const token = this._cookieService.get('token')
    if(token) {
      this._api.getDataUser().subscribe(response => this.handleValidSession(response))
    }
  }

  handleValidSession(response) {
    if(response.status === 200) {
      this._user.user = response.data
      this._user.user.filename = `${this._user.API_URL_BASE}/${response.data.filename}.png`
    }
    console.log(response)
  }

  showModal() {
    this.modal = true
  }

  hideModal(e: boolean /*Event value: boolean*/) {
    this.modal = e
  }

  login() {
    const email: string = (document.querySelector('#login-email') as HTMLInputElement).value,
      password: string = (document.querySelector('#login-password') as HTMLInputElement).value;

    this._api.login(email, password).subscribe(response => this.loginResponse(response))
  }

  loginResponse(response) {
    const status = response.status
    if(status === 200) {
      this._user.user = response.data
      this._user.user.filename = `${this._user.API_URL_BASE}/${this._user.user.filename}.png`
      this._cookieService.set('token', this._user.user.token)
      this.modal = false
      this._toastr.success(response.message, 'Inicio de sesión exitoso.')
    } else if(status === 400) {
      this._toastr.warning(response.message, 'Inicio de sesion fallido.')
    } else {
      this._toastr.error(response.message, 'Algo ha salido mal.')

    }
  }

  register() {
    const firstname: string = (document.querySelector('#register-firstname') as HTMLInputElement).value,
      lastname: string = (document.querySelector('#register-lastname') as HTMLInputElement).value,
      username: string = (document.querySelector('#register-username') as HTMLInputElement).value,
      email: string = (document.querySelector('#register-email') as HTMLInputElement).value,
      password: string = (document.querySelector('#register-password') as HTMLInputElement).value,
      confirmPassword: string = (document.querySelector('#register-confirm-password') as HTMLInputElement).value;

    this._api.register(firstname, lastname, username, email, password, confirmPassword).subscribe(response => this.registerResponse(response))
  }

  registerResponse(response) {
    console.log(response)
    this.modal = false
  }

  searchBooks(term) {
    this._api.searchBook(term).subscribe(response => {
      this._books.pagination = response.data.pop()
      this._books.page = this._books.pagination.page
      this._books.totalPages = this._books.pagination.totalPages
      this._books.books = response.data
    })
    this._books.fromSearch = true
    this._books.term = term
    this._router.navigate(['/libros'])
        
    console.log('wooorks', this._books)
  }
}
