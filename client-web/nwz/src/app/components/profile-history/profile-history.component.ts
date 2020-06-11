import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss']
})
export class ProfileHistoryComponent implements OnInit {

  public requested

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getDataHistory().subscribe(response => this.getDataHistoryResponse(response))
  }

  getDataHistoryResponse(response) {
    this.requested = response.data
    console.log(response.data)
  }

}
