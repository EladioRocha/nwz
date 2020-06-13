import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-reports',
  templateUrl: './profile-reports.component.html',
  styleUrls: ['./profile-reports.component.scss']
})
export class ProfileReportsComponent implements OnInit {

  public reports

  constructor(private _api: ApiService, private _toastr: ToastrService) { 

    
  }

  ngOnInit(): void {
    this._api.getMyReports().subscribe(response => this.getMyReportsResponse(response))
  }

  getMyReportsResponse(response) {
    console.log(response)
    const status = response.status
    if(status === 200) {
      this.reports = response.data
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  test() {
    alert('xD')
  }

}
