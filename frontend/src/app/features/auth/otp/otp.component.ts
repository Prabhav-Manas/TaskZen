import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{
  otpForm!:FormGroup;
  email:string='';

  otpArray = [0,1,2,3,4,5];
  otpValue: string[] = ['', '', '', '', '', ''];

  constructor(private fb:FormBuilder){
    this.otpForm=this.fb.group({
      otp:new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    
  }

  maskEmail(email: string) {
    const [name, domain] = email.split('@');
    return name.slice(0, 2) + '******@' + domain;
  }

  onInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^[0-9]$/.test(value)) {
      input.value = '';
      return;
    }

    this.otpValue[index] = value;

    if (value && index < 5) {
      const next = input.nextElementSibling as HTMLElement;
      next?.focus();
    }

    this.updateForm();
  }

  onKeyDown(event: KeyboardEvent, index: number) {

    const input = event.target as HTMLInputElement;

    // 🔒 Block TAB if current box is empty
    if (event.key === 'Tab') {

      // If current box is empty → stop moving forward
      if (!this.otpValue[index]) {
        event.preventDefault();
        return;
      }

      // Optional: also ensure no skipping ahead
      for (let i = 0; i < index; i++) {
        if (!this.otpValue[i]) {
          event.preventDefault();
          const inputs = document.querySelectorAll('.otp-input');
          (inputs[i] as HTMLElement).focus();
          return;
        }
      }
    }

    // ⬅️ Backspace logic (your existing - good)
    if (event.key === 'Backspace') {

      if (input.value) {
        input.value = '';
        this.otpValue[index] = '';
        this.updateForm();

        if (index > 0) {
          const prev = input.previousElementSibling as HTMLInputElement;
          prev?.focus();
        }

        event.preventDefault();
        return;
      }

      if (index > 0) {
        const prev = input.previousElementSibling as HTMLInputElement;
        prev?.focus();
      }
    }
  }

  updateForm() {
    const otp = this.otpValue.join('');
    this.otpForm.patchValue({ otp });
  }

  onPaste(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text') || '';

    if (!/^\d{6}$/.test(pasted)) return;

    this.otpValue = pasted.split('');
    this.updateForm();

    event.preventDefault();
  }

  onFocus(index: number, event: any) {
    const input = event.target as HTMLInputElement;

    for (let i = 0; i < index; i++) {
      if (!this.otpValue[i]) {
        const inputs = document.querySelectorAll('.otp-input');
        (inputs[i] as HTMLElement).focus();
        return;
      }
    }

    input.select();
  }

  onSubmit() {
    if (this.otpForm.invalid) return;

    const otp = this.otpForm.value.otp;

    console.log('Final OTP:', otp);

    // API call
  }
}
