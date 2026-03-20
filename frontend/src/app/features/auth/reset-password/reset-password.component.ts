import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordResponse } from 'src/app/core/models/reset-password-response';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm!:FormGroup;
  token:string='';

  // isLoader:boolean=false;

  toastr = inject(ToastrService);

  constructor(private fb:FormBuilder, private authService:AuthService, private route:ActivatedRoute, private router:Router, private loaderService:LoaderService){
    this.resetPasswordForm=this.fb.group({
      password:new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/)]),
      cnfPassword:new FormControl('', [Validators.required])
    }, { validators: this.matchPassword })
  }

  ngOnInit(): void {
    this.token=this.route.snapshot.paramMap.get('token') || '';

    this.resetPasswordForm.get('password')?.valueChanges.subscribe(() => {
      this.resetPasswordForm.updateValueAndValidity();
    });

    this.resetPasswordForm.get('cnfPassword')?.valueChanges.subscribe(() => {
      this.resetPasswordForm.updateValueAndValidity();
    });
  }

  matchPassword(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('cnfPassword');

    if (!password || !confirmPassword) return null;

    if (confirmPassword.value === '') return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
    } else if (confirmPassword.errors){
      delete confirmPassword.errors['passwordMismatch'];

      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      } else {
          confirmPassword.setErrors(confirmPassword.errors);
      }
    }
    return null;
  }

  onSubmit(){
    if(this.resetPasswordForm.invalid){
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.loaderService.show('Resetting Password');

    const payload={
      token:this.token,
      password:this.resetPasswordForm.value.password
    }

    this.authService.resetPassword(payload).subscribe({next:(res:ResetPasswordResponse)=>{
     if(res.status===200){
      console.log('Reset-Password Response:=>', res);

      this.router.navigate(['/']);

      this.toastr.success(res.message, 'Reset Password Successful!');
     } 

     this.loaderService.hide();
    }, error:(err)=>{
      console.log('Reset-Password Error:=>', err.error.message);
      this.toastr.error(err.error.message, 'Reset Password Failed!')

      this.loaderService.hide();
    }})
  }
}
