import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  public countries: []
  public states: []
  public cities: []
  public btnSaveDataUser: boolean = false
  public btnSaveDataLocation: boolean = false

  constructor(
    public _user: UserService,
    private _api: ApiService,
    private _renderer: Renderer2,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this._api.getMyLocation().subscribe(response => this.myLocationResponse(response))
  }

  myLocationResponse(response) {
    
    this._user.user.location = response.data.location
    if(!this._user.user.location) {
      this._user.user.location = {
        country_id: {
          _id: '',
          name: ''
        }
      }
    }
    console.log(response.data.location)
  }

  getCountries(country) {
    this._api.getCountries(country).subscribe(response => this.getCountriesResponse(response))
  }

  getCountriesResponse(response) {
    const status = response.status
    if(status === 200) {
      this.countries = response.data
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }

  getStates(country, state) {
    this._api.getStates(country, state).subscribe(response => this.getStatesResponse(response))
  }

  getStatesResponse(response) {
    const status = response.status
    if(status === 200) {
      this.states = response.data
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }  
  }

  getCities(state, city) {
    this._api.getCities(state, city).subscribe(response => this.getCitiesResponse(response))

  }

  getCitiesResponse(response) {
    const status = response.status
    if(status === 200) {
      this.cities = response.data
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }  
  }

  activateField(target) {
    const parent = target.parentElement
    if(target.tagName === 'SELECT' || target.tagName === 'INPUT') {
      this._renderer.removeAttribute(target, 'disabled')
      this.btnSaveDataLocation = (parent.classList.contains('location')) ? true : false
      this.btnSaveDataUser = (parent.classList.contains('user')) ? true : false

      if(target.id === 'profile-country') {
        this.getCountries(target.value)
      } else if(target.id === 'profile-state') {
        const country = this._user.user.location.country_id?._id
        this.getStates(country, target.value)
      } else if(target.id === 'profile-city') {
        const state = this._user.user.location.state_id?._id
        this.getCities(state, target.value)
      }
    }
  }

  updateCountry(value) {
    this._user.user.location.country_id = {
      _id: value
    }
    this.states = []
    this.cities = []
  }

  updateState(value) {
    this._user.user.location.state_id = {
      _id: value
    }
    this.cities = []
  }

  updateCity(value) {
    this._user.user.location.city_id = {
      _id: value
    }
  }

  saveDataLocation() {
    const country = this._user.user.location.country_id?._id,
      state = this._user.user.location.state_id?._id,
      city = this._user.user.location.city_id?._id,
      neighborhood = (document.querySelector('#profile-neighborhood') as HTMLInputElement).value,
      street = (document.querySelector('#profile-street') as HTMLInputElement).value,
      houseNumber = (document.querySelector('#profile-house-number') as HTMLInputElement).value;
    
    this._api.updateDataLocation(country, state, city, neighborhood, street, houseNumber).subscribe(response => this.dataLocationResponse(response))
  }

  dataLocationResponse(response) {
    const status = response.status
    if(status === 200) {
      this._toastr.success(response.message)
    } else if(status === 400) {
      this._toastr.warning(response.message)
    } else {
      this._toastr.error(response.message, 'Algo ha fallado')
    }
  }
}
