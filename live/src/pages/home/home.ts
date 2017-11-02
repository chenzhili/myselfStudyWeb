import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';
import { LiveDetailPage } from './live-detail/live-detail';
import { RepeatProvider } from '../../providers/repeat/repeat';
import * as $ from "jquery";
declare let $:any;
let me;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  host:{
    "(window:scroll)":"onWindowScroll($event)"
  }
})
export class HomePage {
  //初始化变量
  mess = {
    type:"7",
    firstId:"",
    firstList:[],
    secList:[],
    startTime:"",
    endTime:"",
    teamList:[]
  };

  constructor(private goP:RepeatProvider, public navCtrl:NavController, public navParams: NavParams ) {
    //保存this 这里面执行的很快
    me = this;

  }
//  初始化数据
  ngOnInit(){
    //初始化一级菜单
    me._getFirstGameList();
    //初始化二级菜单
    me._getSecMenu();
  }

//  获取当天0点到后七天0点的毫秒数
  _getStartToEnd(){
    let nowEnd = new Date(new Date().setHours(23, 59, 59, 0));
    let sevenTime = 24*60*60*7*1000;
    me.mess.startTime = nowEnd.getTime();
    me.mess.endTime = Number(nowEnd.getTime()) + sevenTime;
  }
//  一级菜单发生变化
  firstMenuChange(e){
    me.mess.type = e;
    me._getSecMenu();
  }
//  获取一级类型
  _getFirstGameList(){
    me.goP.yikeData('classify/main_classify')
      .then(data=>{
        let type = data.json();
        me.mess.firstList = type.data;
      }).catch(err=>{
      me.goP.presentToast(err);
    });
  }
//获取二级菜单
  _getSecMenu() {
    let payload = {
      parent_id: me.mess.type
    };
    me.goP.yikeData('classify/classify', payload).then(data => {
      let menu = data.json();
      console.log(menu);
      me.mess.secList = menu.data;
    }).catch(err => {
      me.goP.presentToast(err);
    })
  }
//  获取某段时间内的所有对应id下的球队列表
  _getTeamList(payload){
    me.goP.yikeGet('match/index', payload).then(data => {
      let list = data.json();
      for(let i = 0;i<list.data.length;i++){
        list.data[i].dateTime = me._formatTime(list.data[i].time);
        list.data[i].beginTiem = new Date(list.data[i].time*1000).getHours()+":"+new Date(list.data[i].time*1000).getMinutes();
      }
      me.mess.teamList = list.data;
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
//时间格式化 形如 2014年10月2日 星期二
  _formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
  }
  _formatTime(number) {

    let year ,month,day,dateN;

    let date = new Date(number * 1000);
    year = date.getFullYear();
    month = me._formatNumber(date.getMonth() + 1);
    day = me._formatNumber(date.getDate());

    dateN = date.getDay();
    switch(dateN){
      case 0:dateN = "日";break;
      case 1:dateN = "一";break;
      case 2:dateN = "二";break;
      case 3:dateN = "三";break;
      case 4:dateN = "四";break;
      case 5:dateN = "五";break;
      case 6:dateN = "六";break;
    }
    return `${year}年${month}月${day}日 星期${dateN}`;
  }
}
