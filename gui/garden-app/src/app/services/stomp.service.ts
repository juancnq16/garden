import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { environment } from 'src/environments/environments'; 
const USER_API = 'http://localhost:8080/chat';
@Injectable({
  providedIn: 'root'
})
export class StompService extends RxStomp {
    constructor() {
        super();
    }
}