import { Injectable } from '@angular/core';
import { User } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API_URL_BASE: string = 'https://nwz-s3-files.s3-us-west-1.amazonaws.com/images/pictures'
  public user: User
  constructor() { }

}
