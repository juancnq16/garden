import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    /**
    standalone: true,
    imports: [MatCardModule],
     */
  });
  hide = true;

  constructor(private fb: FormBuilder){
  }
  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.form.value.username);
    console.log(this.form.value.password);
  }

}
