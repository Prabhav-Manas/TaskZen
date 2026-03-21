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

  @Input() options: any[] = [];   // for dropdown
  @Input() optionLabel: string = '';
  @Input() optionValue: string = '';
  @Input() multiple:boolean=false;

  @Input() controlName!: string;
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  handleInput(event: any) {
    let value = event.target.value
    if(this.controlName === 'fullname'){
          value = value.replace(/[^a-zA-Z\s]/g, '').replace(/^\s+/g, '') .replace(/\s{2,}/g, ' ') 
    } else if (this.controlName === 'email') {
        value = value.replace(/[^a-zA-Z0-9@._-]/g, '')   .replace(/\s/g, '');
    }
    event.target.value = value;
      this.form.get(this.controlName)?.setValue(value, { emitEvent: false });
  }

  trimValue() {
    if (this.controlName === 'fullname') {
      let value = this.form.get(this.controlName)?.value || '';
      value = value.trim();
      this.form.get(this.controlName)?.setValue(value);
    }
  }
}
