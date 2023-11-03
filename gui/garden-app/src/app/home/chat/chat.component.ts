import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environments'; 
import { StorageService } from 'src/app/services/storage.service';
import { StompService } from 'src/app/services/stomp.service';
import { Subscription } from 'rxjs';
import { RxStompConfig } from '@stomp/rx-stomp';
import { ChatMessage } from 'src/app/interfaces/chatMessgae';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements
    AfterViewChecked,
    AfterContentChecked
{
  @Input() id:string = "";
  currentChat = "";
  currentMessage:string = "";
  stompClient: any;
  messages:ChatMessage[] = [];
  me:String;
  private topicSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private storageService: StorageService,
    private rxStompService: StompService
  ){
    this.topicSubscription = new Subscription()
    this.me = this.storageService.getUsername()+"";
  }
  onSendMessage() {
    //const message = `Message generated at ${new Date()}`;
    //this.rxStompService.publish({ destination: '/topic/demo', body: message });
  }
  ngAfterContentChecked(): void {
    //console.log(this.id)
  }
  sendMessage(event:KeyboardEvent){
    if(event.key == 'Enter'){
      var msg = {
        senderId:this.storageService.getUsername(),
        recipientId:this.currentChat,
        content:this.currentMessage
      }
      this.rxStompService.publish({ destination: "/app/chat", body: JSON.stringify(msg)});
      this.messages.push(msg as ChatMessage)
      this.currentMessage = "";
    }
  }
  selectConversation(){
    if(this.currentChat == ""){
      this.currentChat = this.id;
      
      console.log("current conversation: ",this.currentChat);
      //this.initializeWebSocketConnection()
      this.getConversation();
      this.currentMessage = '';
    }else{
      if(this.currentChat != this.id){
        this.topicSubscription.unsubscribe();
        this.currentChat = this.id;
        console.log("current conversation: ",this.currentChat);
      }
    }
  }
  getConversation () {
    this.topicSubscription = this.rxStompService.watch("/user/"+this.storageService.getUsername()+"/queue/messages").subscribe((message: any) => {
      console.log("SUBSCRIOPTION MESSAGE ",message.body)
      var obj:ChatMessage = JSON.parse(message.body)
      this.messages.push(obj)
    });
    const that = this;
    this.chatService.getConversation(this.currentChat).subscribe({
      next(value:ChatMessage []) {
        for (const chatMessage of value) {
          that.messages.push(chatMessage);
        }
      },error(err) {
        console.log("",err)
      },
    })
  }
  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
  ngAfterViewChecked(): void {
    this.selectConversation()
  }
  ngOnInit() {
    //this.id = 'Valor inicial';
    console.log(this.id)
    //this.getConversation()
    //this.chatId = 0//await this.route.queryParams.subscribe((params: Params) => {
      //console.log(params['id']);
      //this.chatId = params['id']
    //});
    
    /*

  onMessageReceived(message:any) {
    console.log("RECEIVED MESSAGE",message)
  }
  onError(args:any){
      console.log("DUMB ERROR",args);
  }
onConnected = () =>{
    console.log("connected");
    const that = this;
    this.stompClient.subscribe("/user/"+this.storageService.getUsername()+"/queue/messages",(msg:any) => this.onMessageReceived(msg));
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
    ngOnInit() {
    this.rxStompService.watch('/topic/demo').subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
    });
  }
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
