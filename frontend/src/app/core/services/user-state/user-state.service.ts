import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userState=new BehaviorSubject<any>(null);

  user$=this.userState.asObservable();

  constructor() { }

  setUser(user:any){
    this.userState.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(){
    if(!this.userState.value){
      const user=localStorage.getItem('user');

      if(user){
        this.userState.next(JSON.parse(user));
      }
    }

    return this.userState.value;
  }

  clearUser(){
    this.userState.next(null);
    localStorage.removeItem('user');
  }
}
