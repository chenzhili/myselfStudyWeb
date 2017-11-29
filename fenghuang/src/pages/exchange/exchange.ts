import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ExchangeDetailComponent } from "./exchange-detail/exchange-detail";
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {
  exchangeValue = 0; /*这是输入的值*/
  type; /*这是对应首页传的类型*/
  beExchanged;/*要被转换的 单位*/
  exchangeArr = [];/*转换成的数组*/
  allList = {
    "长度":["米(m)","厘米(cm)"],
    "面积":["平方米(m2)","平方厘米(cm2)"],
    "体积":["立方米(m3)","立方厘米(cm³)"],
    "质量":["千克(kg)","克(g)"],
    "温度":["开氏度(K)","摄氏度(℃)"],
    "压力":["帕斯卡(Pa)","兆帕(MPa)"],
    "密度":["千克/立方米(kg/m3)","克/立方厘米(g/cm³)"],
    "速度":["米/秒(m/s)","千米/时(km/h)"],
    "数据缓存":["字节(b)","千字节(kb)"]
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
    this.type = this.navParams.get("type");
  }
  ionViewWillEnter(){
    setTimeout(()=>{
      this.exchangeAll(this.exchangeValue);
      if(this.type == "密度"){
        if($(".exchange_to").length){
          $(".exchange_to")[0].style.fontSize = "12px";
        }
        if($(".exchanged").length){
          $(".exchanged")[0].style.fontSize = "12px";
        }
      }
    },60);
    this.storage.get("itemName").then(data=>{
      if((data && data[this.type])){
        this.beExchanged = data[this.type];
      }else{
        this.beExchanged = this.allList[this.type][0];
      }
    });
    this.storage.get("exchangeArr").then(data=>{
      if(data && data[this.type] && data[this.type].length){
        this.exchangeArr = data[this.type];
      }else{
        this.exchangeArr = [{name:this.allList[this.type][1],state:true}];
      }
    });
  }
  exchangeChange(value){
    this.exchangeAll(value);
  }
  toDetail(type,selected,kind){
    this.navCtrl.push(ExchangeDetailComponent,{type:type,selected:selected,kind:kind});
  }
  exchangeAll(value){
    if(this.type == "长度"){
      this.length(value);
    }
    if(this.type == "面积"){
      this.area(value);
    }
    if(this.type == "体积"){
      this.volume(value);
    }
    if(this.type == "质量"){
      this.quality(value);
    }
    if(this.type == "温度"){
      this.temperature(value)
    }
    if(this.type == "压力"){
      this.pressure(value);
    }
    if(this.type == "密度"){
      this.density(value);
    }
    if(this.type == "速度"){
      this.speed(value);
    }
    if(this.type == "数据缓存"){
      this.cacheStorage(value);
    }
  }
  /*长度的函数*/
  length(value){
    /*以米为换算单位*/
    if(this.beExchanged == "米(m)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = 100*value;
        }
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = value/1000;
        }
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = 1000*value;
        }
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = 10*value;
        }
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = Math.pow(10,6)*value;
        }
        if(tempArr[i].name == "尺"){
          tempArr[i].value = 3*value;
        }
        if(tempArr[i].name == "寸"){
          tempArr[i].value = 30*value;
        }
      }
    }
    /*以毫米为换算单位*/
    if(this.beExchanged == "毫米(mm)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = value/10;
        }
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = value/Math.pow(10,-6);
        }
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value/Math.pow(10,-3);
        }
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = value/Math.pow(10,-2);
        }
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = Math.pow(10,3)*value;
        }
        if(tempArr[i].name == "尺"){
          tempArr[i].value = 3*Math.pow(10,3)*value;
        }
        if(tempArr[i].name == "寸"){
          tempArr[i].value = 3*Math.pow(10,2)*value;
        }
      }
    }
    /*以米为换算单位*/
    if(this.beExchanged == "厘米(cm)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value/Math.pow(10,-2);
        }
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = value/Math.pow(10,-5);
        }
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = 10*value;
        }
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = value/10;
        }
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = Math.pow(10,4)*value;
        }
        if(tempArr[i].name == "尺"){
          tempArr[i].value = 3*value/100;
        }
        if(tempArr[i].name == "寸"){
          tempArr[i].value = 3*value/10;
        }
      }
    }
    /*以分米为换算单位*/
    if(this.beExchanged == "分米(dm)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value/Math.pow(10,-1);
        }
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = value/Math.pow(10,-4);
        }
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = 100*value;
        }
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = value*10;
        }
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = Math.pow(10,5)*value;
        }
        if(tempArr[i].name == "尺"){
          tempArr[i].value = 3*value/10;
        }
        if(tempArr[i].name == "寸"){
          tempArr[i].value = 3*value;
        }
      }
    }
    /*以千米为换算单位*/
    if(this.beExchanged == "千米(km)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value*Math.pow(10,3);
        }
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = value*Math.pow(10,4);
        }
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = Math.pow(10,6)*value;
        }
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = value*Math.pow(10,5);
        }
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = Math.pow(10,9)*value;
        }
        if(tempArr[i].name == "尺"){
          tempArr[i].value = 3*value*Math.pow(10,3);
        }
        if(tempArr[i].name == "寸"){
          tempArr[i].value = 3*value*Math.pow(10,4);
        }
      }
    }
    /*以微米为换算单位*/
    if(this.beExchanged == "微米(um)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = value*Math.pow(10,-5);
        }
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = Math.pow(10,-3)*value;
        }
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = value*Math.pow(10,-4);
        }
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = Math.pow(10,-9)*value;
        }
        if(tempArr[i].name == "尺"){
          tempArr[i].value = 3*value*Math.pow(10,-6);
        }
        if(tempArr[i].name == "寸"){
          tempArr[i].value = 3*value*Math.pow(10,-7);
        }
      }
    }
    /*以尺为换算单位*/
    if(this.beExchanged == "尺"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "尺"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value*1/3;
        }
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = value*1/3*Math.pow(10,1);
        }
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = value*1/3*Math.pow(10,3);
        }
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = value*1/3*Math.pow(10,2);
        }
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = value*1/3*Math.pow(10,-3);
        }
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = value*1/3*Math.pow(10,6);
        }
        if(tempArr[i].name == "寸"){
          tempArr[i].value = value*Math.pow(10,1);
        }
      }
    }
    /*以寸为换算单位*/
    if(this.beExchanged == "寸"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "寸"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "米(m)"){
          tempArr[i].value = value*1/3;
        }
        if(tempArr[i].name == "分米(dm)"){
          tempArr[i].value = value*1/3*Math.pow(10,0);
        }
        if(tempArr[i].name == "毫米(mm)"){
          tempArr[i].value = value*1/3*Math.pow(10,2);
        }
        if(tempArr[i].name == "厘米(cm)"){
          tempArr[i].value = value*1/3*Math.pow(10,1);
        }
        if(tempArr[i].name == "千米(km)"){
          tempArr[i].value = value*1/3*Math.pow(10,-4);
        }
        if(tempArr[i].name == "微米(um)"){
          tempArr[i].value = value*1/3*Math.pow(10,5);
        }
        if(tempArr[i].name == "尺"){
          tempArr[i].value = value*Math.pow(10,-1);
        }
      }
    }
  }
  /*面积的函数*/
  area(value){
    if(this.beExchanged == "平方米(m2)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value*Math.pow(10,4);
        }
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value*Math.pow(10,-4);
        }
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value*15*Math.pow(10,-3);
        }
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value*Math.pow(10,-2);
        }
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value*Math.pow(10,6);
        }
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value*Math.pow(10,2);
        }
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value*Math.pow(10,-6);
        }
      }
    }
    if(this.beExchanged == "平方厘米(cm2)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value*Math.pow(10,-4);
        }
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value*Math.pow(10,-8);
        }
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value*15*Math.pow(10,-7);
        }
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value*Math.pow(10,2);
        }
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value*Math.pow(10,-2);
        }
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value*Math.pow(10,-10);
        }
      }
    }
    if(this.beExchanged == "公顷(ha)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value*Math.pow(10,4);
        }
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value*Math.pow(10,8);
        }
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value*15;
        }
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value*Math.pow(10,2);
        }
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value*Math.pow(10,10);
        }
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value*Math.pow(10,6);
        }
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value*Math.pow(10,-2);
        }
      }
    }
    if(this.beExchanged == "亩"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value*2/3*Math.pow(10,3);
        }
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value*2/3*Math.pow(10,7);
        }
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value*2/3*Math.pow(10,-1);
        }
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value*2/3;
        }
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value*2/3*Math.pow(10,9);
        }
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value*2/3*Math.pow(10,6);
        }
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value*2/3*Math.pow(10,-3);
        }
      }
    }
    if(this.beExchanged == "公亩(are)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value*Math.pow(10,2);
        }
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value*Math.pow(10,6);
        }
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value*Math.pow(10,-2);
        }
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value*15*Math.pow(10,-2);
        }
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value*Math.pow(10,8);
        }
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value*Math.pow(10,4);
        }
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value*Math.pow(10,-4);
        }
      }
    }
    if(this.beExchanged == "平方毫米(mm2)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value*Math.pow(10,-2);
        }
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value*Math.pow(10,-10);
        }
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value*15*Math.pow(10,-10);
        }
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value*Math.pow(10,-8);
        }
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value*Math.pow(10,-4);
        }
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value*Math.pow(10,-12);
        }
      }
    }
    if(this.beExchanged == "平方分米(dm²)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value*Math.pow(10,-2);
        }
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value*Math.pow(10,2);
        }
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value*15*Math.pow(10,-5);
        }
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value*Math.pow(10,-4);
        }
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value*Math.pow(10,4);
        }
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value*Math.pow(10,-8);
        }
      }
    }
    if(this.beExchanged == "平方千米(km²)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++){
        if(tempArr[i].name == "平方千米(km²)"){
          tempArr[i].value = value;
        }
        if(tempArr[i].name == "平方米(m2)"){
          tempArr[i].value = value*Math.pow(10,6);
        }
        if(tempArr[i].name == "平方厘米(cm2)"){
          tempArr[i].value = value*Math.pow(10,10);
        }
        if(tempArr[i].name == "公顷(ha)"){
          tempArr[i].value = value*Math.pow(10,2);
        }
        if(tempArr[i].name == "亩"){
          tempArr[i].value = value*15*Math.pow(10,2);
        }
        if(tempArr[i].name == "公亩(are)"){
          tempArr[i].value = value*Math.pow(10,4);
        }
        if(tempArr[i].name == "平方毫米(mm2)"){
          tempArr[i].value = value*Math.pow(10,12);
        }
        if(tempArr[i].name == "平方分米(dm²)"){
          tempArr[i].value = value*Math.pow(10,8);
        }
      }
    }
  }
  /*体积的函数*/
  volume(value){
    if(this.beExchanged == "立方米(m3)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "立方米(m3)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "立方厘米(cm³)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "升(l)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "立方分米(dm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "立方毫米(mm³)") {
          tempArr[i].value = value*Math.pow(10,9);
        }
        if (tempArr[i].name == "毫升(ml)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
      }
    }
    if(this.beExchanged == "立方厘米(cm³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "立方厘米(cm³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "立方米(m3)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "升(l)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "立方分米(dm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "立方毫米(mm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "毫升(ml)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
      }
    }
    if(this.beExchanged == "升(l)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "升(l)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "立方米(m3)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "立方厘米(cm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "立方分米(dm³)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
        if (tempArr[i].name == "立方毫米(mm³)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "毫升(ml)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
      }
    }
    if(this.beExchanged == "立方分米(dm³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "立方分米(dm³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "立方米(m3)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "立方厘米(cm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "升(l)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
        if (tempArr[i].name == "立方毫米(mm³)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "毫升(ml)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
      }
    }
    if(this.beExchanged == "立方毫米(mm³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "立方毫米(mm³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "立方米(m3)") {
          tempArr[i].value = value*Math.pow(10,-9);
        }
        if (tempArr[i].name == "立方厘米(cm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "升(l)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "立方分米(dm³)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "毫升(ml)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
      }
    }
    if(this.beExchanged == "毫升(ml)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "毫升(ml)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "立方米(m3)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "立方厘米(cm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "升(l)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "立方分米(dm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "立方毫米(mm³)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
      }
    }
  }
  /*质量的函数*/
  quality(value){
    if(this.beExchanged == "千克(kg)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value*2;
        }
        if (tempArr[i].name == "两") {
          tempArr[i].value = value*2*Math.pow(10,1);
        }
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value*Math.pow(10,9);
        }
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value*2.2046226;
        }
      }
    }
    if(this.beExchanged == "克(g)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value*2*Math.pow(10,-3);
        }
        if (tempArr[i].name == "两") {
          tempArr[i].value = value*2*Math.pow(10,-2);
        }
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value*2.2046226*Math.pow(10,-3);
        }
      }
    }
    if(this.beExchanged == "斤"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value/2*Math.pow(10,0);
        }
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value/2*Math.pow(10,3);
        }
        if (tempArr[i].name == "两") {
          tempArr[i].value = value*Math.pow(10,1);
        }
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value/2*Math.pow(10,6);
        }
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value/2*Math.pow(10,9);
        }
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value/2*Math.pow(10,-3);
        }
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value*2.2046226/2*Math.pow(10,0);
        }
      }
    }
    if(this.beExchanged == "两"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "两") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value/2*Math.pow(10,-1);
        }
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value/2*Math.pow(10,2);
        }
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value*Math.pow(10,-1);
        }
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value/2*Math.pow(10,5);
        }
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value/2*Math.pow(10,8);
        }
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value/2*Math.pow(10,-5);
        }
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value*2.2046226/2*Math.pow(10,-1);
        }
      }
    }
    if(this.beExchanged == "毫克(mg)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value*2*Math.pow(10,-6);
        }
        if (tempArr[i].name == "两") {
          tempArr[i].value = value*2*Math.pow(10,-5);
        }
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value*Math.pow(10,-9);
        }
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value*2.2046226*Math.pow(10,-6);
        }
      }
    }
    if(this.beExchanged == "微克(μg)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value*2*Math.pow(10,-9);
        }
        if (tempArr[i].name == "两") {
          tempArr[i].value = value*2*Math.pow(10,-8);
        }
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value*Math.pow(10,-9);
        }
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value*Math.pow(10,-12);
        }
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value*2.2046226*Math.pow(10,-9);
        }
      }
    }
    if(this.beExchanged == "吨(t)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value*2*Math.pow(10,3);
        }
        if (tempArr[i].name == "两") {
          tempArr[i].value = value*2*Math.pow(10,4);
        }
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value*Math.pow(10,9);
        }
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value*Math.pow(10,12);
        }
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value*2.2046226*Math.pow(10,3);
        }
      }
    }
    if(this.beExchanged == "磅(lb)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "磅(lb)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "克(g)") {
          tempArr[i].value = value/2.2046226*Math.pow(10,3);
        }
        if (tempArr[i].name == "斤") {
          tempArr[i].value = value/2.2046226*2*Math.pow(10,0);
        }
        if (tempArr[i].name == "两") {
          tempArr[i].value = value/2.2046226*2*Math.pow(10,1);
        }
        if (tempArr[i].name == "千克(kg)") {
          tempArr[i].value = value/2.2046226*Math.pow(10,0);
        }
        if (tempArr[i].name == "毫克(mg)") {
          tempArr[i].value = value/2.2046226*Math.pow(10,6);
        }
        if (tempArr[i].name == "微克(μg)") {
          tempArr[i].value = value/2.2046226*Math.pow(10,9);
        }
        if (tempArr[i].name == "吨(t)") {
          tempArr[i].value = value*2.2046226*Math.pow(10,-4);
        }
      }
    }
  }
  /*温度的函数*/
  temperature(value){
    if(this.beExchanged == "开氏度(K)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "开氏度(K)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "摄氏度(℃)") {
          tempArr[i].value = value-273.15;
        }
        if (tempArr[i].name == "华氏度(℉)") {
          tempArr[i].value = 1.8*value-459.67;
        }
        if (tempArr[i].name == "列氏度(°Re)") {
          tempArr[i].value = 0.8*value-218.52;
        }
        if (tempArr[i].name == "兰氏度(°R)") {
          tempArr[i].value = value*1.8;
        }
      }
    }
    if(this.beExchanged == "摄氏度(℃)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "摄氏度(℃)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "开氏度(K)") {
          tempArr[i].value = 273.15+1.5*value;
        }
        if (tempArr[i].name == "华氏度(℉)") {
          tempArr[i].value = 32+1.8*value;
        }
        if (tempArr[i].name == "列氏度(°Re)") {
          tempArr[i].value = 0.8*value;
        }
        if (tempArr[i].name == "兰氏度(°R)") {
          tempArr[i].value = 491.67+value*2.8;
        }
      }
    }
    if(this.beExchanged == "华氏度(℉)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "华氏度(℉)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "开氏度(K)") {
          tempArr[i].value = 255.37+0.55*value;
        }
        if (tempArr[i].name == "摄氏度(℃)") {
          tempArr[i].value = -17.77+0.55*value;
        }
        if (tempArr[i].name == "列氏度(°Re)") {
          tempArr[i].value = -1422+0.44*value;
        }
        if (tempArr[i].name == "兰氏度(°R)") {
          tempArr[i].value = 459.67+value;
        }
      }
    }
    if(this.beExchanged == "列氏度(°Re)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "列氏度(°Re)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "开氏度(K)") {
          tempArr[i].value = 273.2+1.2*value;
        }
        if (tempArr[i].name == "摄氏度(℃)") {
          tempArr[i].value = 1.25*value;
        }
        if (tempArr[i].name == "华氏度(℉)") {
          tempArr[i].value = 32+2.25*value;
        }
        if (tempArr[i].name == "兰氏度(°R)") {
          tempArr[i].value = 491.8+2.1*value;
        }
      }
    }
    if(this.beExchanged == "兰氏度(°R)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "兰氏度(°R)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "开氏度(K)") {
          tempArr[i].value = 0.5*value;
        }
        if (tempArr[i].name == "摄氏度(℃)") {
          tempArr[i].value = -273.15+1.4*value;
        }
        if (tempArr[i].name == "华氏度(℉)") {
          tempArr[i].value = -459.57+value;
        }
        if (tempArr[i].name == "列氏度(°Re)") {
          tempArr[i].value = -218.07+0.4*value;
        }
      }
    }
  }
  /*压力的函数*/
  pressure(value){
    if(this.beExchanged == "帕斯卡(Pa)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "帕斯卡(Pa)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "兆帕(MPa)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "千帕(kpa)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "百帕(hpa)") {
          tempArr[i].value = value*Math.pow(10,-2);
        }
        if (tempArr[i].name == "标准大气压(atm)") {
          tempArr[i].value = value*9.8692*Math.pow(10,-6);
        }
      }
    }
    if(this.beExchanged == "兆帕(MPa)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "兆帕(MPa)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "帕斯卡(Pa)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "千帕(kpa)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "百帕(hpa)") {
          tempArr[i].value = value*Math.pow(10,4);
        }
        if (tempArr[i].name == "标准大气压(atm)") {
          tempArr[i].value = value*9.8692*Math.pow(10,1);
        }
      }
    }
    if(this.beExchanged == "千帕(kpa)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千帕(kpa)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "帕斯卡(Pa)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "兆帕(MPa)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "百帕(hpa)") {
          tempArr[i].value = value*Math.pow(10,1);
        }
        if (tempArr[i].name == "标准大气压(atm)") {
          tempArr[i].value = value*9.8692*Math.pow(10,-3);
        }
      }
    }
    if(this.beExchanged == "百帕(hpa)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "百帕(hpa)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "帕斯卡(Pa)") {
          tempArr[i].value = value*Math.pow(10,2);
        }
        if (tempArr[i].name == "兆帕(MPa)") {
          tempArr[i].value = value*Math.pow(10,-4);
        }
        if (tempArr[i].name == "千帕(kpa)") {
          tempArr[i].value = value*Math.pow(10,-1);
        }
        if (tempArr[i].name == "标准大气压(atm)") {
          tempArr[i].value = value*9.8692*Math.pow(10,-4);
        }
      }
    }
    if(this.beExchanged == "标准大气压(atm)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "标准大气压(atm)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "帕斯卡(Pa)") {
          tempArr[i].value = value*101325;
        }
        if (tempArr[i].name == "兆帕(MPa)") {
          tempArr[i].value = value*101325*Math.pow(10,-6);
        }
        if (tempArr[i].name == "千帕(kpa)") {
          tempArr[i].value = value*101325*Math.pow(10,-3);
        }
        if (tempArr[i].name == "百帕(hpa)") {
          tempArr[i].value = value*101325*Math.pow(10,-2);
        }
      }
    }
  }
  /*密度的函数*/
  density(value){
    if(this.beExchanged == "千克/立方米(kg/m3)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千克/立方米(kg/m3)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "克/立方厘米(g/cm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "千克/立方分米(kg/dm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "千克/立方厘米(kg/cm³)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "克/立方米(g/m³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "克/立方分米(g/dm³)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
      }
    }
    if(this.beExchanged == "克/立方厘米(g/cm³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "克/立方厘米(g/cm³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克/立方米(kg/m3)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "千克/立方分米(kg/dm³)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
        if (tempArr[i].name == "千克/立方厘米(kg/cm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "克/立方米(g/m³)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "克/立方分米(g/dm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
      }
    }
    if(this.beExchanged == "千克/立方分米(kg/dm³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千克/立方分米(kg/dm³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克/立方米(kg/m3)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "克/立方厘米(g/cm³)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
        if (tempArr[i].name == "千克/立方厘米(kg/cm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "克/立方米(g/m³)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "克/立方分米(g/dm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
      }
    }
    if(this.beExchanged == "千克/立方厘米(kg/cm³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千克/立方厘米(kg/cm³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克/立方米(kg/m3)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
        if (tempArr[i].name == "克/立方厘米(g/cm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "千克/立方分米(kg/dm³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "克/立方米(g/m³)") {
          tempArr[i].value = value*Math.pow(10,9);
        }
        if (tempArr[i].name == "克/立方分米(g/dm³)") {
          tempArr[i].value = value*Math.pow(10,6);
        }
      }
    }
    if(this.beExchanged == "克/立方米(g/m³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "克/立方米(g/m³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克/立方米(kg/m3)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "克/立方厘米(g/cm³)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "千克/立方分米(kg/dm³)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "千克/立方厘米(kg/cm³)") {
          tempArr[i].value = value*Math.pow(10,-9);
        }
        if (tempArr[i].name == "克/立方分米(g/dm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
      }
    }
    if(this.beExchanged == "克/立方分米(g/dm³)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "克/立方分米(g/dm³)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千克/立方米(kg/m3)") {
          tempArr[i].value = value*Math.pow(10,0);
        }
        if (tempArr[i].name == "克/立方厘米(g/cm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "千克/立方分米(kg/dm³)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "千克/立方厘米(kg/cm³)") {
          tempArr[i].value = value*Math.pow(10,-6);
        }
        if (tempArr[i].name == "克/立方米(g/m³)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
      }
    }
  }
  /*速度的函数*/
  speed(value){
    if(this.beExchanged == "米/秒(m/s)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "米/秒(m/s)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千米/时(km/h)") {
          tempArr[i].value = value*3.6;
        }
        if (tempArr[i].name == "千米/秒(km/s)") {
          tempArr[i].value = value*Math.pow(10,-3);
        }
        if (tempArr[i].name == "光速(c)") {
          tempArr[i].value = value*3.3356*Math.pow(10,-9);
        }
      }
    }
    if(this.beExchanged == "千米/时(km/h)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千米/时(km/h)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "米/秒(m/s)") {
          tempArr[i].value = value*0.2777778;
        }
        if (tempArr[i].name == "千米/秒(km/s)") {
          tempArr[i].value = value*0.2777778*Math.pow(10,-3);
        }
        if (tempArr[i].name == "光速(c)") {
          tempArr[i].value = value*9.2657*Math.pow(10,-10);
        }
      }
    }
    if(this.beExchanged == "千米/秒(km/s)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千米/秒(km/s)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "米/秒(m/s)") {
          tempArr[i].value = value*Math.pow(10,3);
        }
        if (tempArr[i].name == "千米/时(km/h)") {
          tempArr[i].value = value*3.6*Math.pow(10,3);
        }
        if (tempArr[i].name == "光速(c)") {
          tempArr[i].value = value*3.3356*Math.pow(10,-6);
        }
      }
    }
    if(this.beExchanged == "光速(c)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "光速(c)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "米/秒(m/s)") {
          tempArr[i].value = value*299792458;
        }
        if (tempArr[i].name == "千米/时(km/h)") {
          tempArr[i].value = value*1079252848.8;
        }
        if (tempArr[i].name == "千米/秒(km/s)") {
          tempArr[i].value = value*299792.458;
        }
      }
    }
  }
  /*数据缓存函数*/
  cacheStorage(value){
    if(this.beExchanged == "字节(b)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "字节(b)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "千字节(kb)") {
          tempArr[i].value = value*0.0009766;
        }
        if (tempArr[i].name == "兆字节(mb)") {
          tempArr[i].value = value*9.5367*Math.pow(10,-7);
        }
        if (tempArr[i].name == "千兆字节(gb)") {
          tempArr[i].value = value*9.3132*Math.pow(10,-10);
        }
        if (tempArr[i].name == "太字节(tb)") {
          tempArr[i].value = value*9.0949*Math.pow(10,-13);
        }
      }
    }
    if(this.beExchanged == "千字节(kb)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千字节(kb)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "字节(b)") {
          tempArr[i].value = value*1024;
        }
        if (tempArr[i].name == "兆字节(mb)") {
          tempArr[i].value = value*0.0009766;
        }
        if (tempArr[i].name == "千兆字节(gb)") {
          tempArr[i].value = value*9.5367*Math.pow(10,-7);
        }
        if (tempArr[i].name == "太字节(tb)") {
          tempArr[i].value = value*9.3132*Math.pow(10,-10);
        }
      }
    }
    if(this.beExchanged == "兆字节(mb)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "兆字节(mb)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "字节(b)") {
          tempArr[i].value = value*1048576;
        }
        if (tempArr[i].name == "千字节(kb)") {
          tempArr[i].value = value*1024;
        }
        if (tempArr[i].name == "千兆字节(gb)") {
          tempArr[i].value = value*0.0009766;
        }
        if (tempArr[i].name == "太字节(tb)") {
          tempArr[i].value = value*9.5367*Math.pow(10,-7);
        }
      }
    }
    if(this.beExchanged == "千兆字节(gb)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "千兆字节(gb)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "字节(b)") {
          tempArr[i].value = value*1073741824;
        }
        if (tempArr[i].name == "千字节(kb)") {
          tempArr[i].value = value*1048576;
        }
        if (tempArr[i].name == "兆字节(mb)") {
          tempArr[i].value = value*1024;
        }
        if (tempArr[i].name == "太字节(tb)") {
          tempArr[i].value = value*0.0009766;
        }
      }
    }
    if(this.beExchanged == "太字节(tb)"){
      for(let i=0,tempArr=this.exchangeArr;i<tempArr.length;i++) {
        if (tempArr[i].name == "太字节(tb)") {
          tempArr[i].value = value;
        }
        if (tempArr[i].name == "字节(b)") {
          tempArr[i].value = value*1099511627776;
        }
        if (tempArr[i].name == "千字节(kb)") {
          tempArr[i].value = value*1073741824;
        }
        if (tempArr[i].name == "兆字节(mb)") {
          tempArr[i].value = value*1048576;
        }
        if (tempArr[i].name == "千兆字节(gb)") {
          tempArr[i].value = value*1024;
        }
      }
    }
  }
}
