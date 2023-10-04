import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
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
  fullImagePath: string;

  constructor() {
    this.fullImagePath = 'assets/img2.jpg';
  }
  kiss(){
    this.fullImagePath = 'assets/img1.jpg';
    setTimeout(() => {
      this.fullImagePath = 'assets/img2.jpg';
    }, 5000);
  }
}
