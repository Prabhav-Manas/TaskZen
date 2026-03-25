import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OtpResponse } from 'src/app/core/models/auth/otp-response';
import { AuthStateService } from 'src/app/core/services/auth-state/auth-state.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit{
  otpForm!:FormGroup;
  email:string='';
  maskedEmail:string='';

  otpArray = [0,1,2,3,4,5];
  otpValue: string[] = ['', '', '', '', '', ''];

  isResendDisabled:boolean=true;
  isLoading:boolean=false;
  timer:number=30;
  interval:any;

  popup:any={
    isOpen:false,
    title:'',
    message:'',
    type:'primary'
  };

  // isLoader:boolean=false;

  toastr = inject(ToastrService);

  constructor(private fb:FormBuilder, private authStateService:AuthStateService, private authService:AuthService, private router:Router, private popupService:PopUpService, private loaderService:LoaderService){
    this.otpForm=this.fb.group({
      otp:new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.email=this.authStateService.getEmail() || localStorage.getItem('resetEmail') || '';
    this.maskedEmail=this.maskEmail(this.email);

    this.setTimer();

    this.popupService.popUpState$.subscribe((data)=>{
      this.popup=data;
    })
  }

  maskEmail(email: string) {
    if(!email){
      this.router.navigate(['/auth/forgot-password']);
      return '';
    }

    console.log('Mask Email:=>', this.email)
    
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

    // Block TAB if current box is empty
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

    // Backspace logic (your existing - good)
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

  setTimer(){
    this.isResendDisabled=true;
    this.timer=30;

    this.interval=setInterval(()=>{
      this.timer--;

      if(this.timer <= 0){
        this.isResendDisabled=false;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  onSubmit() {
    if (this.otpForm.invalid){
      this.otpForm.markAllAsTouched();
      return;
    }

    this.loaderService.show('Verifying OTP');

    const payload ={
      email:this.email,
      otp: this.otpForm.value.otp
    }

    this.authService.verifyOtp(payload).subscribe({next:(res:OtpResponse)=>{
      if(res.status===200){
        localStorage.removeItem('resetEmail');
        this.authStateService.clearEmail();
        console.log('Otp Response:=>', res.message);
        this.otpValue=['', '', '', '', '', ''];
        this.otpForm.reset();

        this.popupService.show('', res.message, 'success');

        // this.router.navigate(['/auth/reset-password', res.token]);
      }

      this.loaderService.hide();
    }, error:(err:any)=>{
      console.log('Otp Error:=>', err.error.message);
      this.popupService.show('Error! Verification Failed', err.error.message, 'danger');

      this.loaderService.hide();
    }})
  }

  onResendOTP(){
    if(!this.email){
      return;
    }

    this.loaderService.show('Re-sending OTP');

    this.authService.resendOtp(this.email).subscribe({next:(res:OtpResponse)=>{
      if(res.status===200){
        this.otpValue=['', '', '', '', '', ''];
        this.otpForm.reset();

        this.toastr.success(res.message, 'Re-send OTP successful!');

        this.setTimer();

        console.log('Resend OTP Response:=>', res);
      }

      this.loaderService.hide();
    }, error:(err)=>{
      console.log('Resend OTP Error:=>', err.error.message);
      this.toastr.error(err.error.message, 'Re-send OTP Error!');

      this.loaderService.hide();
    }})
  }
}
