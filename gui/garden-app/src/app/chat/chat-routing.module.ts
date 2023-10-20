import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { ChatViewComponent } from './chat-view/chat-view.component';

const routes: Routes = [
  { path: 'chats', component: ChatViewComponent, data: { animation: 'heroes' } },
  { path: 'chat/:id', component: ChatDetailComponent, data: { animation: 'hero' }  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
