import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isSidebarOpen = false;

  constructor(private authService:AuthService, private tokenService:TokenService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {
    
  }

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onCloseSideBar(){
    this.isSidebarOpen=false;
  }

  logout(){
    this.authService.signout().subscribe({next:(res)=>{
      if(res.status===200){
        this.tokenService.clearTokens();
        this.router.navigate(['/']);

        this.toastr.success(res.message, 'Sign out Sucessful!');
      }
    }, error:(error)=>{
      this.tokenService.clearTokens(); //still logout
      this.router.navigate(['/']);

      this.toastr.error(error.error.message, 'Sign out Error!');
    }})
  }
}
