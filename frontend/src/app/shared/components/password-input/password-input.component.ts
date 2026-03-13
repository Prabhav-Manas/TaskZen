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
  hide = true;
  showRules = false;

  constructor() { }
  
  ngOnInit(): void {
  }
}
