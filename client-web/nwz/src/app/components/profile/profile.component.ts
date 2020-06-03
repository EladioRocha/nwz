import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private cookieValue: string

  constructor(
    public _user: UserService,
    private _api: ApiService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('token')
    console.log(this.cookieValue)
  }

}
