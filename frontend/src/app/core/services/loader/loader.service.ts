import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface LoaderState {
  isLoading: boolean;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderState=new BehaviorSubject<LoaderState>({
    isLoading:false,
    label:''
  })

  loader$=this.loaderState.asObservable();

  constructor() { }

  show(label:string='Loading'){
    this.loaderState.next({
      isLoading:true,
      label
    })
  }

  hide(){
    this.loaderState.next({
      isLoading:false,
      label:''
    })
  }
}
