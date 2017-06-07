import { Component, OnInit } from '@angular/core';
import {DetailHero} from '../hero';

@Component({
  selector: 'app-form-module',
  templateUrl: './form-module.component.html',
  styleUrls: ['./form-module.component.css']
})
export class FormModuleComponent{
  aa(v){console.log(v);}
  powers :any;
  model:any;
  submitted:boolean;
  safeString:any;
  constructor(){
    this.powers = ['Really Smart', 'Super Flexible',
      'Super Hot', 'Weather Changer'];

    this.model = new DetailHero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

    this.submitted = false;
  }
  //attribute 和 property的区别
  /*abc(){
    let a = document.getElementById("input");
    console.log(a.getAttribute("value"));
    console.log(input.value);
  }*/
  /*angular2中实现的ngFor方法是基于for of上实现，所以需要有iterator接口的数据类型，下面通过自己实现去实现的*/
  obj = {
    0:1,
    1:2,
    2:4,
    length:3,
    [Symbol.iterator]:function(){
      let me = this;
      let index = 0;
      return {
        next:()=>{
          //console.log(this);//这里这个this有点特殊在这里，可能是typescript的机制，可能是Symbol.iterator的原因，实际上一般这个的this指的是返回{};
          //这里返回的是obj
          let value = me[index];
          let done = (index >= me.length);
          index++;
          return {value,done}
        }
      }
    }
  };
  onSubmit(){}
  addHeroes(){}
}
