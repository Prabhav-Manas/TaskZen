import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  loginForm!: FormGroup;
  hide: string = 'password';
  showRules = false;

  isLoader:boolean=false;

  toastr = inject(ToastrService);
  
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private tokenService:TokenService){
    this.loginForm=this.fb.group({
      email:new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password:new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/)])
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoader=true;

    const payload={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }

    this.authService.signin(payload).subscribe({next:(res)=>{
      console.log('Signin Response:=>', res);

      this.tokenService.setToken(res.user.token);
      
      if(res.status===200){
        this.router.navigate(['/dashboard']);
        this.toastr.success(res.message, 'Sign in Successful!');
      }

      this.isLoader=false
    }, error:(err)=>{
      console.log('Signin Error:=>', err);
      this.toastr.error(err.error.message, 'Sign in Error!');
      this.isLoader=false
    }})

    console.log(this.loginForm.value);
    this.loginForm.reset();
  }
}
