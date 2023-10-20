import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule } from '@angular/forms';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';


@NgModule({
  declarations: [ChatViewComponent,ChatDetailComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }
