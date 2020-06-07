import { Component, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnChanges {
  private cookieValue: string
  constructor(
    public _user: UserService,
    private _api: ApiService,
    private cookieService: CookieService
  ) { }

  ngOnChanges(changes) {
    console.log(changes)
    console.log(this._user.user)
  }
}
