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

  handleInput(event: any) {
    let value = event.target.value
    if(this.controlName === 'fullname'){
          value = value.replace(/[^a-zA-Z0-9@._-]/g, '').replace(/\s/g, '');
    } else if (this.controlName === 'email') {
        value = value.replace(/[^a-zA-Z0-9@._-]/g, '')   .replace(/\s/g, '');
    }
    event.target.value = value;
    this.form.get(this.controlName)?.setValue(value, { emitEvent: false });
  }
}
