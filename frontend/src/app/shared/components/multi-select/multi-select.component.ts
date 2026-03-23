import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit{
  @Input() label!: string;
  @Input() options: any[] = [];
  @Input() form!: FormGroup;
  @Input() controlName!: string;

  isOpen:boolean = false;

  constructor(private eRef: ElementRef){}

  ngOnInit(): void {
    
  }

  toggleSelection(option: any) {
    const control = this.form.get(this.controlName);
    const currentValue = control?.value || [];

    if (currentValue.includes(option._id)) {
      control?.setValue(currentValue.filter((id: any) => id !== option._id));
    } else {
      control?.setValue([...currentValue, option._id]);
    }
  }

  isSelected(option: any): boolean {
    return this.form.get(this.controlName)?.value?.includes(option._id);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  getSelectedLabels(): string {
    const selectedIds = this.form.get(this.controlName)?.value || [];
    return this.options
      .filter(opt => selectedIds.includes(opt._id))
      .map(opt => opt.email.split('@')[0])
      .join(', ');
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
