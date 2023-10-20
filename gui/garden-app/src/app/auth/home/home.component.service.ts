
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments'; 
//import {environment} from '../../environments/environments';
import * as SockJS from 'sockjs-client';
//import * as Socket from 'socket.io-client';
import * as Stomp from 'stompjs';
//declare var SockJS:any;
//declare var Stomp:any;

var stompClient: any;

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    constructor() {
      this.initializeWebSocketConnection();
    }
    public msg = [];
    initializeWebSocketConnection() {
      const serverUrl = environment.app_url;
      console.log(serverUrl);
      const ws = new SockJS(serverUrl);
      stompClient = Stomp.over(ws);
      stompClient.debug = null
      stompClient.connect({}, this.onConnected, this.onError);
      //const ws = new Socket(serverUrl);
      //var socket = new SockJS("http://localhost:8080/ws");
      /**
      //const ws = new SockJS(serverUrl);
      //const Stomp = require("stompjs");
      //this.stompClient = Stomp.over(ws);
      //var SockJS = require("sockjs-client");
      var socket = new SockJS("http://localhost:8080/ws");
      stompClient = Stomp.over(socket);
      const that = this;
      stompClient.connect({}, this.onConnected, this.onError);
      // tslint:disable-next-line:only-arrow-functions
      /**
      this.stompClient.connect({}, function(frame) {
        that.stompClient.subscribe('/message', (message) => {
          if (message.body) {
            that.msg.push(message.body);
          }
        });
      });
       */
    }
  
    onConnected = () =>{
        console.log("connected");
        //console.log(currentUser);
        //readonly that = this;
        const that = this;
        stompClient.subscribe("/user/1/queue/messages",(msg:any) => this.onMessageReceived(msg));
    }
    onError(args:any){
        console.log("DUMB ERROR");
    }
    sendMessage(message:any) {
      //stompClient.send('/app/send/message' , {}, message);
      stompClient.send("/app/chat", {}, JSON.stringify(message));
    }
    onMessageReceived(message:any) {
      console.log("RECEIVED MESSAGE")
      
      //console.log(message)
    }
}
const bridge = (message:any) => {
  
}