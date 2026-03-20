import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit{
  state: 'loading' | 'success' | 'error' = 'loading';

  message: string = 'Verifying your email...';

  email: string = '';
  token: string = '';

  isResending = false;

  constructor(private route:ActivatedRoute, private authService:AuthService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {
    this.email=this.route.snapshot.paramMap.get('email') || '';
    this.token=this.route.snapshot.paramMap.get('token') || '';

    if(!this.email || !this.token){
      this.state='error'
      this.message='Invalid verification link.';
      return;
    }

    this.verifyEmail();
  }

  verifyEmail(){
    this.state='loading';

    this.authService.verifyEmail(this.email, this.token).subscribe({next:(res:any)=>{
      if(res.status===200){
        this.state='success';
        this.message=res.message || 'Email verified successfully!'

        this.toastr.success(res.message, '');

        // Redirect after 3 sec
        setTimeout(() => {
          this.router.navigate(['/auth/signin']);
        }, 3000);
      }
    }, error:(error)=>{
      this.state='error';
      this.message=error.error.message || 'Verification Failed!';

      this.toastr.error(error.error.message, '');
    }})
  }

  resendEmail(){
    this.isResending=true;

    this.authService.resendVerification(this.email).subscribe({next:(res:any)=>{
      if(res.status===200){
        this.toastr.success(res.message, 'Verification email sent!');
        this.isResending=false;
      }
    }, error:(error)=>{
      this.toastr.error(error.error.message, 'Failed to send email!');
      this.isResending=false;
    }})
  }
}
