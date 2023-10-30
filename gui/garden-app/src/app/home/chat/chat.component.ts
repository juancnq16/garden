import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, switchMap } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from 'src/environments/environments'; 
import { StorageService } from 'src/app/services/storage.service';
import { error } from 'console';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements AfterViewInit, AfterViewChecked,AfterContentChecked{
  @Input() id:string = "";
  currentChat = "";
  currentMessage:string = "";
  stompClient: any;
  messages:string[] = ['sadfa','hello'];
  constructor(private route: ActivatedRoute,
    private chatService: ChatService,
    private storageService: StorageService
  ){
    
  }
  ngAfterContentChecked(): void {
    //console.log(this.id)
  }
  sendMessage(event:KeyboardEvent){
    if(event.key == 'Enter'){
      var msg = {
        senderId:this.storageService.getUsername(),
        recipientId:this.currentChat,
        content:"IN YOUR FACE FOOL"
      }
      var headers = {
        'Authentication': `Bearer ${ this.storageService.getToken() }`
      }
      this.stompClient.send("/app/chat", headers, JSON.stringify(msg));
      //this.messages.push(this.currentMessage)
      this.currentMessage = ""
    }
  }
  getConversation(){
    if(this.currentChat == ""){
      this.currentChat = this.id;
      this.chatService.getConversation(this.currentChat).subscribe({
        next(value) {
          console.log(value)
        },error(err) {
          console.log(err)
        },
      })
      console.log("current conversation: ",this.currentChat);
      this.initializeWebSocketConnection()
    }else{
      if(this.currentChat != this.id){
        this.currentChat = this.id;
        console.log("current conversation: ",this.currentChat);
      }
    }
  }
  initializeWebSocketConnection() {
    const serverUrl = environment.app_url;
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    //this.stompClient.debug = null
    var token = this.storageService.getToken();
    var headers = { login: "string", passcode: "string"}
    this.stompClient.connect(headers, this.onConnected, this.onError);
  }
  onConnected = () =>{
    console.log("connected");
    const that = this;
    this.stompClient.subscribe("/user/"+this.storageService.getUsername()+"/queue/messages",(msg:any) => this.onMessageReceived(msg));
  }
  onMessageReceived(message:any) {
    console.log("RECEIVED MESSAGE",message)
  }
  onError(args:any){
      console.log("DUMB ERROR",args);
  }
  initializeChat(){
    
  }
  ngAfterViewChecked(): void {
    this.getConversation()
  }
  ngAfterViewInit(): void {
    //console.log(this.id)
  }
  ngOnInit() {
    //this.id = 'Valor inicial';
    console.log(this.id)
    this.getConversation()
    //this.chatId = 0//await this.route.queryParams.subscribe((params: Params) => {
      //console.log(params['id']);
      //this.chatId = params['id']
    //});
    
    /*
    var temp = ""
    this.route.paramMap.forEach(route =>{temp = temp + route.getAll})
    console.log(temp)
    this.chatId = this.route.firstChild?.paramMap.pipe(
      switchMap(params => {
          return parseInt(params.get('id'))
        }
      )
    )
    
    this.route.firstChild?.paramMap.pipe(
      switchMap(params => {
        this.chatId = parseInt(params.get('id')!, 10);
        //return this.service.getCrises();
      })
    );
    */
  }

}
