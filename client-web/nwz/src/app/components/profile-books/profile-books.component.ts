import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-profile-books',
  templateUrl: './profile-books.component.html',
  styleUrls: ['./profile-books.component.scss']
})
export class ProfileBooksComponent implements OnInit {

  public books

  constructor(private _api: ApiService) { 
    library.add(fas, far, fab)
  }

  ngOnInit(): void {
    this._api.getMyBooksUploaded().subscribe(response => this.getMyBooksUploadedResponse(response))
  }

  getMyBooksUploadedResponse(response) {
    this.books = response.data
    console.log(response)
  }
}
