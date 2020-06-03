import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public modal: boolean
  public showLoginForm: boolean

  constructor(
    public _user: UserService,
    private _api: ApiService,
    private _cookieService: CookieService
  ) {
    this.modal = false
    this.showLoginForm = true
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
    this._user.user = response.data
    this._cookieService.set('token', this._user.user.token)
    this.modal = false
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
}
