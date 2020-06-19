import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss']
})
export class ProfileHistoryComponent implements OnInit {

  public requested
  public modal: boolean = false
  private _accused_id: string
  private _currentBook

  constructor(private _api: ApiService, private _toastr: ToastrService, private _user: UserService) { }

  ngOnInit(): void {
    this._api.getDataHistory().subscribe(response => this.getDataHistoryResponse(response))
  }

  getDataHistoryResponse(response) {
    console.log(response)
    const status = response.status
    if(status === 200) {
      this.requested = response.data
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  showModal(lender, borrower, book) {
    this._accused_id = (this._user.user._id === lender) ? borrower : lender 
    this._currentBook = book
    this.modal = true
  }

  hideModal(e) {
    this.modal = e
  }

  createReport() {
    const problem = (document.querySelector('#problem') as HTMLInputElement).value
    this._api.createReport(this._user.user._id, this._accused_id, this._currentBook, problem).subscribe(response => console.log(response))
  }

}
