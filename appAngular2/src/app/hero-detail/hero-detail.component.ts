import { Component, Input } from '@angular/core';
import { Hero }  from '../hero';
import {A} from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent{
  /*@Input() hero:Hero;*/
  /*首页的信息*/
  title = "first angular2";
  age = new A(11);
  contValue = "";
  selectHero:Hero;
  eC = "";
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
  kp(v){
    this.contValue = v +"|";
  }
  ke(v){
    this.eC = v;
  }
  addKE(v){
    this.heroes.push(new Hero(10,v));
  }
  select(hero){
    console.log(hero);
    this.selectHero = hero;
  }
}
