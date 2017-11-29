import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
declare var MobclickAgent: any;
/*
* 友盟统计
*/
@Injectable()
export class UAnalyticsProvider {

  constructor(private platform: Platform, public http: Http) {
  }
  //初始化统计
  _initUAnalytics() {
    try {
      MobclickAgent.setLogEnabled( true );//是否调试
      MobclickAgent.init();
    } catch (err) {
      //alert(err);
    }
  }
  
  //关闭日志上报
  _stopCrashHandler(){
    
  }
  //页面启动/关闭
  _openPage(pageName?){
    MobclickAgent.onPageBegin(pageName);
  }
  _endPage(pageName?){
    MobclickAgent.onPageEnd(pageName);
  }
  //定义事件统计
  _eventUAnalytics(eventId, eventLabel){//0-用户注册
    MobclickAgent.onEventWithLabel(eventId, eventLabel)
  }
  //浏览事件
  _browseEvent(){
    
  }
  //登录事件
  _loginEvent(tokenId?){
    MobclickAgent.profileSignInWithPUID(tokenId);
  }
  //退出事件
  _signOutEvent(tokenId?){
    MobclickAgent.profileSignOff(tokenId);
  }
  //注册事件
  _registerEvent(){
    
  }
  //购买事件
  _purchaseEvent(){
    
  }
  //设置别名
  _setAlias(uid = '19') {
    
  }
  //设置标签
  _setTags() {
    let tags = this.platform.is('ios') ? 'ios' : 'android';
    
  }
}