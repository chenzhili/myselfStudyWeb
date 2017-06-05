import { Component } from '@angular/core';

import { Hero } from './hero';
import {A} from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /*template:'<h1>first{{title}}</h1>',*/
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "first angular2";
  age = new A(11);
  heroes = [
    new Hero(0,"tom"),
    new Hero(1,"carry"),
    new Hero(2,"marry"),
    new Hero(3,"brown"),
  ];
  clickFun(e){
    /*alert(1);*/
    console.log(e.target);
  }
  keyDo(e:any){
    console.log(e.target.value);
  }
}
