import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {
  @Input() label!: string;
  @Input() controlName!: string
  @Input() form!: FormGroup;
  @Input() showStrength: boolean = false;

  hide = true;
  showRules = false;


  passwordStrength = 0;
  strengthLabel = '';
  strengthClass = '';

  constructor() { }
  
  ngOnInit(): void {
    if (this.showStrength) {
      this.form.get(this.controlName)?.valueChanges.subscribe((value) => {
        this.checkPasswordStrength(value);
      });
    }
  }

  checkPasswordStrength(password: string) {
    let score = 0;

    if (!password) {
      this.passwordStrength = 0;
      this.strengthLabel = '';
      return;
    }

    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    this.passwordStrength = (score / 5) * 100;

    if (score <= 2) {
      this.strengthLabel = 'Weak';
      this.strengthClass = 'bg-danger';
    } else if (score <= 4) {
      this.strengthLabel = 'Medium';
      this.strengthClass = 'bg-warning';
    } else {
      this.strengthLabel = 'Strong';
      this.strengthClass = 'bg-success';
    }
  }
}
