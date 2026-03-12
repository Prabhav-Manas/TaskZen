import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit{
  regForm!: FormGroup;
  hide:string='password';
  cnfhide:string='password';
  showRules = false;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.regForm=this.fb.group({
      fullname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9@.]+$/)]),
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
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }

    return null;
  }
}

// PASSWORD :=>
// min 6 Alpha-numeric character,
// At least one uppercase,
// one lowercase,
// one special character
// one numeric character
// No white-space