import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as $ from "jquery";

/**
 * Generated class for the ExchangeDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'exchange-detail',
  templateUrl: 'exchange-detail.html'
})
export class ExchangeDetailComponent {
  type;
  itemName;/*如果kind 为1*/
  itemArr;/*如果kind 为2*/
  kind;
  allList = {
    "长度":[{name:"米(m)",state:false},{name:"厘米(cm)",state:false},{name:"千米(km)",state:false},{name:"毫米(mm)",state:false},{name:"分米(dm)",state:false},{name:"微米(um)",state:false},
      {name:"尺",state:false},{name:"寸",state:false}],
    "面积":[{name:"平方米(m2)",state:false},{name:"平方厘米(cm2)",state:false},{name:"公顷(ha)",state:false},{name:"亩",state:false},{name:"公亩(are)",state:false},{name:"平方毫米(mm2)",state:false},
      {name:"平方分米(dm²)",state:false},{name:"平方千米(km²)",state:false}],
    "体积":[{name:"立方米(m3)",state:false},{name:"立方厘米(cm³)",state:false},{name:"升(l)",state:false},{name:"立方分米(dm³)",state:false},
      {name:"立方毫米(mm³)",state:false},{name:"毫升(ml)",state:false}],
    "质量":[{name:"千克(kg)",state:false},{name:"克(g)",state:false},{name:"斤",state:false},{name:"两",state:false},{name:"毫克(mg)",state:false}
    ,{name:"微克(μg)",state:false},{name:"吨(t)",state:false},{name:"磅(lb)",state:false}],
    "温度":[{name:"开氏度(K)",state:false},{name:"摄氏度(℃)",state:false},{name:"华氏度(℉)",state:false},{name:"列氏度(°Re)",state:false},{name:"兰氏度(°R)",state:false}],
    "压力":[{name:"帕斯卡(Pa)",state:false},{name:"兆帕(MPa)",state:false},{name:"千帕(kpa)",state:false},{name:"百帕(hpa)",state:false},{name:"标准大气压(atm)",state:false}],
    "密度":[{name:"千克/立方米(kg/m3)",state:false},{name:"克/立方厘米(g/cm³)",state:false},{name:"千克/立方分米(kg/dm³)",state:false},
      {name:"千克/立方厘米(kg/cm³)",state:false},{name:"克/立方米(g/m³)",state:false},{name:"克/立方分米(g/dm³)",state:false}],
    "速度":[{name:"米/秒(m/s)",state:false},{name:"千米/时(km/h)",state:false},{name:"千米/秒(km/s)",state:false},{name:"光速(c)",state:false}],
    "数据缓存":[{name:"字节(b)",state:false},{name:"千字节(kb)",state:false},{name:"兆字节(mb)",state:false},{name:"千兆字节(gb)",state:false},{name:"太字节(tb)",state:false}]
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
    this.type = this.navParams.get("type");
    this.kind = this.navParams.get("kind");
    if(this.kind == 1){
      this.itemName = this.navParams.get("selected");
    }
    if(this.kind == 2){
      this.itemArr = this.navParams.get("selected");
      for(let i=0;i<this.allList[this.type].length;i++){
        for(let l=0;l<this.itemArr.length;l++){
          if(this.itemArr[l].name == this.allList[this.type][i].name){
            this.allList[this.type][i].state = true;
          }
        }
      }
    }
  }
  ionViewWillEnter(){
    this._initConfirmHeight();
  }
  _initConfirmHeight(){
    let tempHeight = parseFloat(getComputedStyle($(".select")[0]).height);
    let tempKind = $(".kind2").length?parseFloat(getComputedStyle($(".kind2")[0]).height):60;
    if(tempHeight > parseFloat(getComputedStyle($(".menu")[0]).height)){
      $(".confirm")[0].style.height = tempHeight - 120 - tempKind+"px";
    }else{
      $(".confirm")[0].style.height = parseFloat(getComputedStyle($(".menu")[0]).height) - 120 - tempKind+"px";
    }
  }
  clickSelect(name){
    if(this.kind == 1){
      this.itemName = name;
    }
    if(this.kind == 2){
      for(let i=0,tempAllList = this.allList[this.type];i<tempAllList.length;i++){
        if(tempAllList[i].name == name){
          tempAllList[i].state = !tempAllList[i].state;
        }
      }
      setTimeout(()=>{
        this._initConfirmHeight();
      },10);
    }
  }
  backResult(itemName){
    if(this.kind == 1){
      let itemObj = {};
      itemObj[this.type] = itemName;
      this.storage.set("itemName",itemObj);
    }
    if(this.kind == 2){
      let tempArr = [];
      let tempObj = {};
      for(let i=0,tempAllList = this.allList[this.type];i<tempAllList.length;i++){
        if(tempAllList[i].state){
          tempArr.push(tempAllList[i]);
        }
      }
      tempObj[this.type] = tempArr;
      this.storage.set("exchangeArr",tempObj);
    }
    this.navCtrl.pop();
  }
}
