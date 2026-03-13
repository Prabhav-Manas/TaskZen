import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() controlName!: string;
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}
