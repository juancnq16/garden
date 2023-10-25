import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './home.component.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-1',
  templateUrl: './home.component.html',
  /*
  template: `
    <p>
      home works!
    </p>
  `,
  */
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private messageService:MessageService) {
    this.fullImagePath = 'assets/img2.jpg';
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    /**
    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
     */
  }
  fullImagePath: string;
  //constructor(private messageService: MessageService) {}
  
  kiss(){
    this.fullImagePath = 'assets/img1.jpg';
    setTimeout(() => {
      this.fullImagePath = 'assets/img2.jpg';
    }, 5000);
    var msg = {
      senderId:"5",
      recipientId:"1",
      content:"IN YOUR FACE FOOL"
    }
    this.messageService.sendMessage(msg)
  }
}
