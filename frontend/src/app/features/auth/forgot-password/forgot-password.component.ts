import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordForm!: FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService){
    this.forgotPasswordForm=this.fb.group({
      email:new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    if(this.forgotPasswordForm.invalid){
      this.forgotPasswordForm.markAllAsTouched();
      return
    }
    const payload={
      email:this.forgotPasswordForm.value.email,
    }

    this.authService.forgotPassword(payload).subscribe({next:(res)=>{
      console.log('Forgot-Password:=>', res);
    }, error:(error)=>{
      console.log('Error in forgot-password:=>', error);
    }})
    this.forgotPasswordForm.reset();
  }
}
