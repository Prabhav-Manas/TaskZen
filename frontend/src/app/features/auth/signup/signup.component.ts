import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  regForm!: FormGroup;
  hide:string='password';
  cnfhide:string='password';
  showRules = false;

  constructor(private fb:FormBuilder, private authService: AuthService, private router:Router){}

  ngOnInit(): void {
    this.regForm=this.fb.group({
      fullname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]+$/)]),
      cnfpassword: new FormControl('',[Validators.required])
    }, { validators: this.matchPassword })
  }
  
  matchPassword(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('cnfpassword');

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
    if(this.regForm.invalid){
      this.regForm.markAllAsTouched();
      return;
    }

    const payload={
      fullname: this.regForm.value.fullname,
      email: this.regForm.value.email,
      password: this.regForm.value.password
    };

    this.authService.signup(payload).subscribe({next:(res)=>{
      console.log('Signup Response:=>', res);

      if(res.status===201){
        this.router.navigate(['/']);
      }
    },error:(err)=>{
      console.log('Signup Error:=>', err);
    }})
    
    console.log(this.regForm.value);
    this.regForm.reset();
  }
}

// PASSWORD :=>
// min 6 Alpha-numeric character,
// At least one uppercase,
// one lowercase,
// one special character
// one numeric character
// No white-space