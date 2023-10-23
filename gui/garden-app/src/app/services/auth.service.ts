import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interceptor } from './interceptor';

const AUTH_API = 'http://localhost:8080/auth/login/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient){
  }
  login(username:String, password:String){
    return this.http.post(AUTH_API,
      {
        "username":username,
        "password":password
      }
    )
  }
}
