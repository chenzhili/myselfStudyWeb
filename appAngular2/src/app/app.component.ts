import { Component } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /*template:'<h1>first{{title}}</h1>',*/
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "first angular2";
  heroes = [
    new Hero(0,"tom"),
    new Hero(1,"carry"),
    new Hero(2,"marry"),
    new Hero(3,"brown"),
  ];

}
