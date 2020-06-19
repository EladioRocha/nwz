import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  public showInput: boolean = false
  public uploadImage: boolean = false
  private API_URL_BASE: string = 'https://nwz-s3-files.s3-us-west-1.amazonaws.com/images/pictures'

  @Input() username: string

  constructor(public _user: UserService, private _api: ApiService, private _toastr: ToastrService, private _cookieService: CookieService, private _router: Router) {

  }

  ableInput() {
    this.showInput = true
  }

  updateUsername() {
    const username = (document.querySelector('#profile-username') as HTMLInputElement).value
    this._api.updateUsername(username).subscribe(response => this.updateUsernameResponse(response))
  }

  updateUsernameResponse(response) {
    const status = response.status
    if(status === 200) {
      this._user.user.username = response.data
      this._toastr.success(response.message)
      this.showInput = false
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  uploadProfileImage() {
    this.uploadImage = true
  }

  async saveImage() {
    try {
      const file = (document.querySelector('#profile-file') as HTMLInputElement).files[0],
        image = await this.getBase64File(file);

      this._api.uploadImage(image).subscribe(response => this.saveImageResponse(response))
      
    } catch (error) {
      console.log(error)
    }
  }

  saveImageResponse(response) {
    const status = response.status
    if(status === 200) {
      this._user.user.filename = `${this.API_URL_BASE}/${response.data}.png`
      this._toastr.success(response.message)
      this.uploadImage = false
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
    console.log('MYYY UPDATE RESPONSE', response)
  }

  getBase64File(file): unknown {
    return new Promise((resolve, reject) => {
      try {        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          console.log(reader.result)
          resolve(reader.result)
        }
      } catch (error) {
        console.log(error)
        reject('Parece que se ta ha olvidado subir un libro...')
      }
    })
  }

  closeSession() {
    delete this._user.user
    this._cookieService.delete('token', '/libros')
    this._cookieService.delete('token', '/')
    this._toastr.success('La sesión ha sido terminada.', 'Sesión terminada')
    this._user.user = null
    this._router.navigate(['/libros'])
  }
}
