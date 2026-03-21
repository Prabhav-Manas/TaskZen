import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit{
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() optionLabel: string = '';
  @Input() optionValue: string = '';
  @Input() form!: FormGroup;
  @Input() controlName!: string;

  isOpen:boolean = false;

  constructor(){}

  ngOnInit(): void {
    
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: any) {
    const current = this.form.get(this.controlName)?.value || [];

    if (!current.includes(option[this.optionValue])) {
      current.push(option[this.optionValue]);
    }

    this.form.get(this.controlName)?.setValue(current);
  }

  removeOption(value: any) {
    const updated = this.form.get(this.controlName)?.value.filter((v: any) => v !== value);
    this.form.get(this.controlName)?.setValue(updated);
  }

  isSelected(value: any): boolean {
    return this.form.get(this.controlName)?.value.includes(value);
  }

  getSelectedOptions() {
    const values = this.form.get(this.controlName)?.value || [];
    return this.options.filter(opt => values.includes(opt[this.optionValue]));
  }
}
