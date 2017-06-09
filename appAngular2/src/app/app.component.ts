import { Component } from '@angular/core';


@Component({
  selector:'app-root',
  templateUrl:'./app.component.html',
  styleUrls:['./app.component.css']
  /*selector: 'app-root',
  templateUrl: './app.component.html',
  template:'<app-form-module></app-form-module>',
  styleUrls:['form-module/form-module.component.css']
  template:'<h1>first{{title}}</h1>',
  styleUrls: ['./app.component.css']*/
})
export class AppComponent {
  title = "Tour of Heroes";
  routerState = 1;
  changeRouterState(state){
    this.routerState = state;
  }
}
