import { Injectable } from '@angular/core';
import { AccessDTO } from '../interfaces/access-dto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  isLoggedIn:Boolean = false;



  getToken() {
    throw new Error('Method not implemented.');
  }
  saveInfo(token:AccessDTO){
    window.sessionStorage.setItem('token',token.token)
    window.sessionStorage.setItem('username',token.username)
    this.isLoggedIn=true;
  }

}
