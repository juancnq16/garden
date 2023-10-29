import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interceptor } from './interceptor';

const USER_API = 'http://localhost:8080/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    constructor(private http: HttpClient){
    }
    searchUser(username:String){
      return this.http.post<string[]>(USER_API+'/search',username)
    }
    getFriendList(){
        return this.http.get<string[]>(USER_API+"/getFriendList")
    }
    addFriend(friend:string){
      return this.http.post<string[]>(USER_API+"/addFriend",friend)
    }
  }