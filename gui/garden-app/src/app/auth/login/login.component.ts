import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AccessDTO } from '../../interfaces/access-dto';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder, 
    private authService:AuthService,
    private storageService:StorageService,
    private router:Router){
      this.router = inject(Router);
  }
  ngOnInit(): void {
  }
  onSubmit = () => {
    console.log(this.form.value.username);
    console.log(this.form.value.password);
    if(this.form.value.password&&this.form.value.username){
      const that = this
      this.authService.login(this.form.value.username,this.form.value.password).subscribe({
        next(value) {
          that.storageService.saveInfo(value as AccessDTO);
          that.moveOn()
        },error(err) {
          console.log(err)
          that.router.navigate(['/home'])
          //that.storageService.isLoggedIn = true;
          window.sessionStorage.setItem('isLogedIn','true')
        },
      })
    }
  }
  moveOn(){
    this.router.navigate(['/home'])
  }
}
/**
 * token => {
        console.log(token)
      }, error => {
        console.log('we fucked ', error)
      }
 */
