import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
declare var JPush: any;
/*
* 极光推送
*/
@Injectable()
export class JpushProvider {

  constructor(private platform: Platform, public http: Http) {
  }

  //初始化推送
  _initJpush() {
    try {
      JPush.init();
      this._setTags();
      this._setAlias();
    } catch (err) {
      //alert(err);
    }
  }

  //点击推送消息触发
  _jpush_openNotification() {
    document.addEventListener("jpush.openNotification", event => {
      alert(event);
    }, false);
  }

  //停止推送
  _stopPush() {
    JPush.stopPush();
  }

  //重启推送
  _resumePush() {
    JPush.resumePush();
  }

  //设置别名
  _setAlias(uid = '19') {
    JPush.setAlias(uid);
  }

  //设置标签
  _setTags() {
    let tags = this.platform.is('ios') ? 'ios' : 'android';
    JPush.setTags(tags);
  }

}
