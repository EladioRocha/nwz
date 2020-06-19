import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-sidenav',
  templateUrl: './profile-sidenav.component.html',
  styleUrls: ['./profile-sidenav.component.scss']
})
export class ProfileSidenavComponent {

  constructor(private _cookieService: CookieService, private _router: Router, private _toastr: ToastrService, private _user: UserService) { }

  closeSession() {
    delete this._user.user
    this._cookieService.delete('token', '/libros')
    this._cookieService.delete('token', '/')
    this._toastr.success('La sesión ha sido terminada.', 'Sesión terminada')
    this._user.user = null
    this._router.navigate(['/libros'])
  }

}
