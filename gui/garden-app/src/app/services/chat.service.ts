import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments'; 
import { ChatMessage } from '../interfaces/chatMessgae';
const USER_API = 'http://localhost:8080/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
    constructor(private http: HttpClient){
    }
    getConversation(friend:string){
      return this.http.post<ChatMessage []>(USER_API+'/getConversation',friend)
    }
    sendMessage(user:string,friend:string,message:string,){
      return this.http.post(USER_API+'/getConversation',friend)
    }
}