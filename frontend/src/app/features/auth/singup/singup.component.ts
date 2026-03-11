import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit{
  hide:string='password';
  cnfhide:string='password';

  constructor(){}

  ngOnInit(): void {
    
  }
}
