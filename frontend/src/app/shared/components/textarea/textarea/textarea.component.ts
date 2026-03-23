import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit{
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() label:string='';
  @Input() placeholder:string='';

  constructor(){}

  ngOnInit(): void {
    
  }

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }
}
