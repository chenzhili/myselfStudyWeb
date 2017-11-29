import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';
import { ExchangePage } from "../exchange/exchange";
import * as $ from "jquery";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messList = [
    {name:"changdu",img:"assets/image/changdu.png",type:"长度"},
    {name:"mianji",img:"assets/image/mianji.png",type:"面积"},
    {name:"tiji",img:"assets/image/tiji.png",type:"体积"},
    {name:"zhiliang",img:"assets/image/zhiliang.png",type:"质量"},
    {name:"wendu",img:"assets/image/wendu.png",type:"温度"},
    {name:"yali",img:"assets/image/yali.png",type:"压力"},
    // {name:"gonglv",img:"assets/image/gonglv.png",type:"功率"},
    // {name:"gnr",img:"assets/image/gnr.png",type:"功/能/热"},
    // {name:"li",img:"assets/image/li.png",type:"力"},
    {name:"midu",img:"assets/image/midu.png",type:"密度"},
    // {name:"shijian",img:"assets/image/shijian.png",type:"时间"},
    {name:"sudu",img:"assets/image/sudu.png",type:"速度"},
    {name:"cache",img:"assets/image/cache.png",type:"数据缓存"},
    // {name:"jiaodu",img:"assets/image/jiaodu.png",type:"角度"},
    // {name:"rechuan",img:"assets/image/rechuan.png",type:"传热系统"},
];
  constructor(public navCtrl:NavController, public navParams: NavParams ) {

  }
  ionViewWillEnter(){

  }
//  跳转转化页面
  toDetail(item){
    item.state = true;
    console.log(item);
    setTimeout(()=>{
      item.state = false;
      this.navCtrl.push(ExchangePage,{type:item.type});
    },500);
  }
}
