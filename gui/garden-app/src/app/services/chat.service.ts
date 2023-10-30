import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from 'src/environments/environments'; 

const USER_API = 'http://localhost:8080/chat';

var stompClient: any;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    constructor(private http: HttpClient){
      //this.initializeWebSocketConnection();
    }
    initializeWebSocketConnection() {
      const serverUrl = environment.app_url;
      console.log(serverUrl);
      const ws = new SockJS(serverUrl);
      stompClient = Stomp.over(ws);
      stompClient.debug = null
      stompClient.connect({}, this.onConnected, this.onError);
    }
    onConnected = () =>{
      console.log("connected");
      const that = this;
      stompClient.subscribe("/user/"+""+"/queue/messages",(msg:any) => this.onMessageReceived(msg));
    }
    onMessageReceived(message:any) {
      console.log("RECEIVED MESSAGE")
    }
    onError(args:any){
        console.log("DUMB ERROR");
    }
    getConversation(friend:string){
      return this.http.post(USER_API+'/getConversation',friend)
    }
    sendMessage(user:string,friend:string,message:string,){
      return this.http.post(USER_API+'/getConversation',friend)
    }
}