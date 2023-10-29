import { Injectable } from '@angular/core';
import { AccessDTO } from '../interfaces/access-dto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }



  getToken() {
    return window.sessionStorage.getItem('token')
  }
  saveInfo(token:AccessDTO){
    window.sessionStorage.setItem('token',token.token)
    window.sessionStorage.setItem('username',token.username)
    window.sessionStorage.setItem('isLogedIn','true')
  }
  isLoggedIn(){
    return window.sessionStorage.getItem('isLogedIn')
  }
  logOut(){
    window.sessionStorage.clear()
  }
  getUsername(){
    return window.sessionStorage.getItem('username')
  }

}
