import { AfterViewChecked, AfterViewInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements AfterViewInit, AfterViewChecked{
  @Input() id = 0
  constructor(private route: ActivatedRoute){}
  ngAfterViewChecked(): void {
    console.log(this.id)
  }
  ngAfterViewInit(): void {
    console.log(this.id)
  }
  ngOnInit() {
    console.log(this.id)
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
