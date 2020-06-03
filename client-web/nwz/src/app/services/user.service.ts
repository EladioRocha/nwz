import { Injectable } from '@angular/core';
import { User } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User
  constructor() { }

}
