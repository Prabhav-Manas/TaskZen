import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  private popUpSate=new BehaviorSubject<any>({
    isOpen: false,
    title:'',
    message:'',
    type:'primary'
  })

  popUpState$=this.popUpSate.asObservable();

  constructor() { }

  show(title:string, message:string, type:'success' | 'error' | 'primary'='primary'){
    this.popUpSate.next({
      isOpen:true,
      title,
      message,
      type
    })
  }

  close(){
    this.popUpSate.next({
      isOpen:false,
      title:'',
      message:'',
      type:'primary'
    })
  }
}
