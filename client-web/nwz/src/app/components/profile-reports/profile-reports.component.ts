import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-reports',
  templateUrl: './profile-reports.component.html',
  styleUrls: ['./profile-reports.component.scss']
})
export class ProfileReportsComponent implements OnInit {

  public reports

  constructor(private _api: ApiService) { 

    
  }

  ngOnInit(): void {
    this._api.getMyReports().subscribe(response => this.getMyReportsResponse(response))
  }

  getMyReportsResponse(response) {
    console.log(response)
    this.reports = response.data
  }

  test() {
    alert('xD')
  }

}
