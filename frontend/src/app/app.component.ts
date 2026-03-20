import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoading = false;
  label = '';

  constructor(private loaderService: LoaderService){}

  ngOnInit(): void {
    this.loaderService.loader$.subscribe((state) => {
      this.isLoading = state.isLoading;
      this.label = state.label;
    });
  }
}
