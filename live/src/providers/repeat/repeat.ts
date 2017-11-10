import { Injectable, Component, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController, LoadingController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as $ from "jquery";
/*
  Generated class for the RepeatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var AliPay: any;
// @Component({
//   selector: 'md-exa',
//   template: '<div class="modal-bg"><div class="modal-a"><div class="modal-hdt">' +
//   '<div class="modal-hd"><div class="modal-recb"><h2>{{modal.title||"123"}}</h2></div><p>{{modal.cont||"test"}}</p></div>' +
//   '</div><div class="box-cr left-cr"></div><div class="box-cr right-cr"></div>' +
//   '<div class="modal-btn">' +
//   '<button ion-button class="btn"  (click)="ok()">{{modal.ok||"确认"}}</button>' +
//   '<button ion-button class="gray" (click)="cancel()">{{modal.canel||"取消"}}</button>' +
//   '</div></div></div>'
// })
// export class ModalExample {
//   modal: {
//     title?: string,
//     cont?: any,
//     ok?: string,
//     cancel?: string
//   }
//   constructor() { }
//   create(params: any) {
//     this.modal = params;
//   }
//   ok(fn) {
//     fn();
//   }
//   cancel(fn) {
//     fn();
//   }
// }

/**
 * 简单封装的一些公共函数
 */
@Injectable()
export class RepeatProvider {
  loading: any;
  i:number;
  lType:any;
  constructor(public storage: Storage, public network: Network, public camera: Camera, public http: Http, public toast: ToastController, public loadingCtrl: LoadingController, public web: InAppBrowser) {
    this.i=5;
   }

  //发起post请求
  yikeData(mod: string, payload?: any, url?: string) {
    // var url = (url || 'http://118.190.138.112/index.php/api/') + mod;
    var url = (url || 'http://118.190.89.55/index.php/yike_live/') + mod;
    return this.http.post(url, payload).toPromise();
  }

  //发起get请求
  yikeGet(mod: string, payload?: any, url?: string) {
    // var url = (url || 'http://118.190.138.112/index.php/api/') + mod;
    var url = (url || 'http://118.190.89.55/index.php/yike_live/') + mod;
    return this.http.get(url + this.toQueryString(payload)).toPromise();
  }

  toQueryString(obj) {
     let ret = [];
     for (let key in obj) {
       key = encodeURIComponent(key);
       let values = obj[key];
       if (values && values.constructor == Array) {//数组
         let queryValues = [];
         for (let i = 0, len = values.length, value; i < len; i++) {
           value = values[i];
           queryValues.push(this.toQueryPair(key, value));
         }
         ret = ret.concat(queryValues);
       } else { //字符串
         ret.push(this.toQueryPair(key, values));
       }
    }
     return '?' + ret.join('&');
   }

   toQueryPair(key, value) {
     if (typeof value == 'undefined') {
       return key;
     }
     return key + '=' + encodeURIComponent(value === null ? '' : String(value));
   }

  //按钮是否可用
  isShow(num, obj) {
    num > 2 ? obj.removeAttribute('disabled') : obj.setAttribute('disabled', 'true');
  }
  //获取用户信息
  getUserInfo(payload?,obj?) {
    this.yikeData('user/user', payload)
      .then(data => {
        var userInfo = data.json();
        switch(userInfo.code){
          case 0://未购买
            obj.is_by='notBy';
            break;
          case 1://已购买
            obj.is_by='haveBought';
            break;
          case 2://新用户体验十分钟
            obj.is_by='experience';
            break;
        }
        obj.userInfo=userInfo;
        if(obj.popTips!=undefined){
          obj.popTips();
        }
      }).catch(err => {
        this.presentToast(err.msg);
      })
  }

  //弹窗
  presentToast(msg: string, time: number = 1500) {
    let toast = this.toast.create({
      message: msg,
      duration: time,
      position: 'middle',
      cssClass: 'ltoast'
    });
    toast.present();
  }

  //loading
  LoadingShow(msg: string) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }
  LoadingHide() {
    this.loading.dismiss();
  }

  //发送验证码
  getCode(data) {
    var dTimer = {
      currtime: data.cutime || 60,
      timer: null
    };
    var smsg = data.dom;
    var payload = data.payload;
    var domIS = data;
    this.yikeData(data.op, payload)
      .then(data => {
        var datax = data.json();
        this.presentToast(datax.msg);
        clearInterval(dTimer.timer);
        dTimer.timer = setInterval(() => {
          this.sendMsg(smsg, dTimer, domIS);
        }, 1000);
        domIS.fn1(datax.data);
      }).catch(err => {
        this.presentToast(JSON.parse(err.msg));
      })
  }
  sendMsg(obj, num, domIs) {
    if (num.currtime == 0) {
      obj.removeAttribute("disabled");
      obj.innerHTML = "获取验证码";
      clearInterval(num.timer);
      num = null;
      domIs.fn();
      return false;
    } else {
      obj.setAttribute("disabled", true);
      obj.innerHTML = "重新发送(" + num.currtime + ")";
      num.currtime--;
    }
  }

  //检测是否有网络连接
  judgeNetWork() {
    let nw = this.network.type;
    if (nw != null)
      return this.network;
    else
      return false;
  }

  //返回jquery对象
  $(dom: any = document) {
    return $(dom);
  }

  //数据存储函数
  storageCache(dataload) {
    this.storage.set(dataload.name, dataload.data);
  }
  //数据获取
  storageGet(name) {
    return this.storage.get(name);
  }
  //清除数据
  storageRemove(name){
    return this.storage.remove(name);
  }

  /**时间格式化 */
  TimeFormat(intDiff) {
    var day: any = 0, hour: any = 0, minute: any = 0, second: any = 0;//时间默认值
    day = Math.floor(intDiff / (60 * 60 * 24));
    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    second <= 9 ? second = '0' + second : '';
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    return hour + ':' + minute + ':' + second;
  }

  /*
   *时间缓存
   *ncs 默认值300秒,返回值true,false
   *函数的作用是避免重复请求，消耗资源
  */
  timerCache(ncs: any = 300000) {
    var tc = new Date().getTime();
    var tcs: any = this.storage.get('bd_fs_timer');
    if (tcs != undefined) {
      if (tc - tcs >= ncs) return true;
      else return false;
    } else {
      return true;
    }
  }

  //获取QQ客服
  openQQ(): Observable<any> {
    let url: string;
    return Observable.create(observer => {
      this.yikeData("Interfaces/QQ",{i:6})
        .then(data => {
          url = data.json().msg.qq;
          let brower = (`mqqwpa://im/chat?chat_type=wpa&uin=${url}&version=1&src_type=web&web_src=oicqzone.com`);
          observer.next(brower);
        })
        .catch((err) => {
          this.presentToast(err);
        });
    });
  }

  //插件支付宝支付
  getAlipay(options: any): Observable<any> {
    let ops = options;
    var _this = this;
    return Observable.create(observer => {
      AliPay.pay(ops, function (result) {
        observer.next(result);
      }, function (err) {
        //_this.presentToast(err);
      });
    });
  }

  //插件头像上传
  getPicture(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: 50,
      allowEdit: true,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 200,//缩放图像的宽度（像素）
      targetHeight: 200,//缩放图像的高度（像素）
      saveToPhotoAlbum: false,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);
    return Observable.create(observer => {
      this.camera.getPicture(ops).then((imgData: string) => {
        if (ops.destinationType == this.camera.DestinationType.DATA_URL) {
          observer.next('data:image/png;base64,' + imgData);
        } else {
          observer.next(imgData);
        }
      }).catch(err => {
        if (err == 20) {
          this.presentToast('没有权限,请在设置中开启权限');
          return;
        }
        if (String(err).indexOf('cancel') != -1) {
          return;
        }
        observer.next('error');
      });
    });
  };

  //从相册选择
  getByLibrary(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };

  //拍照上传
  getByCamera(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };
}

