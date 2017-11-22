import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepeatProvider } from '../../../providers/repeat/repeat';
import { ScreenOrientation } from '@ionic-native/screen-orientation'; //允许横屏
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import * as $ from "jquery";
declare let chplayer: any, Hls: any,flvjs:any,returnCitySN:any; //获取ip地址: returnCitySN["cip"]
var $scope;
@IonicPage()
@Component({
  selector: 'page-live-detail',
  templateUrl: 'live-detail.html',
})
export class LiveDetailPage {
  liveShow:string;
  linesStatus:string;
  constructor(public goP: RepeatProvider, public navCtrl: NavController, public navParams: NavParams,
              public screenOrientation:ScreenOrientation,public web:InAppBrowser,private device: Device) {
    $scope=this;
    $scope.liveShow = 0;
    $scope.linesStatus = 0;
    $scope.isStart = true;
    $scope.advShow = 1;
    $scope.sowing = {};
    $scope.headerIsShow = true;
    $scope.playOrPause = "data:image/png;base64,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";
    //获取上个页面的id
    $scope.liveId = this.navParams.get('item').id;
    $scope.sowing.main_logo = this.navParams.get('item').main_logo;
    $scope.sowing.visit_logo = this.navParams.get('item').visit_logo;
    this.getDetail();
    this.getAdLive();
    this._adv();
    /*this.screenOrientation.onChange().subscribe(
      () => {
        console.log(this.screenOrientation.type);
      }
    );*/
  }
  //页面即将进入
  ionViewWillEnter(){
    this.tryHeight();
    document.addEventListener("visibilitychange",$scope._visibilityChange)
  }
  //只是用于监听事件的回调函数
  _visibilityChange(){
    if($scope.liveShow){
      if(document.hidden){
        let payload = {
          id: $scope.liveId,
          op:"out"
        };
        $scope.goP.yikeGet('match/play',payload);
      }else{
        let payload = {
          id: $scope.liveId,
          op:"in"
        };
        $scope.goP.yikeGet('match/play',payload);
      }
    }
  }
  //页面即将离开
  ionViewWillLeave(){
    document.removeEventListener("visibilitychange",$scope._visibilityChange);
    /*try{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    }catch(err){
      console.log(err);
    }*/
  }
  //自适应广告的高度
  tryHeight(){
    setTimeout(()=>{
      let footer = document.getElementsByTagName("ion-footer")[0];
      $scope.bottom = getComputedStyle(footer).height;
    },200);
  }
  //  获取底部广告
  _adv(){
    let payload = {
      type: 2
    };
    this.goP.yikeGet('ad/index',payload).then(data => {
      let ad = data.json();
      //直播广告
      if(ad.data.length > 0){
        for(let i=0;i<ad.data.length;i++){
          ad.data[i].adStatus = 1;
        }
        $scope.adv = ad.data;
      }
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
  //  跳转网页
  toWeb(url){
    let browser = this.web.create(url,"_blank");
    browser.show();
  }
  //返回
  back(){
    if($scope.initTimeout){
      clearTimeout($scope.initTimeout);
    }
    if($scope.playTimeout){
      clearTimeout($scope.playTimeout);
    }
    if($scope.liveShow){
      $scope.liveShow = !$scope.liveShow;
      $scope.advShow = 1;
    }else{
      this.navCtrl.pop();
    }
  }
  //下拉刷新
  doRefresh(refresher) {
    refresher != undefined ? refresher.complete() : '';
    this.getDetail();
    this.getAdLive();
    this._adv();
  }

  //获取详情
  getDetail() {
    let payload = {
      id: $scope.liveId,
      ip:returnCitySN["cip"]
    };
    this.goP.yikeGet('match/details', payload).then(data => {
      let menu = data.json();
      //直播详情
      $scope.liveMsg = menu.msg;
      $scope.sowing = menu.data;
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
  //隐藏或者显示头部和控制条
  hideOrShow(){
    $scope.headerIsShow = !$scope.headerIsShow;
  }
  //获取人数值
  getPerson(){
    let payload = {
      id: $scope.liveId,
      op:"in"
    };
    $scope.goP.yikeGet('match/play',payload);
  }
  //观看直播
  livePlay(){
    if($scope.sowing.is_open == 0){
      this.goP.presentToast("直播尚未开始");
    }else{
      if($scope.sowing.is_end == 1){
        this.goP.presentToast("直播已结束");
      }else{
        this.getPerson();
        $scope.headerIsShow = false;
        $scope.liveShow = 1;
        // this.screenOrientation.unlock();
        //chplayer做了兼容,这个在移动端的终极版本，可以兼容 android 和 ios都能播放
        $scope.playTimeout = setTimeout(()=>{
          $scope.advShow = 0;
          let videoObject = {
            container: '#videoElement',//“#”代表容器的ID，“.”或“”代表容器的class
            variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
            live: true, //是否是直播
            video:$scope.sowing.url_m3u8//视频地址
          };
          let player=new chplayer(videoObject);
        },3000);
        /*这种原声播放，在pc端调试 m3u8 看不了,android的浏览器播不了*/
        /*$scope.playTimeout = setTimeout(()=>{
          $scope.advShow = 0;
        },3000);*/
        /*这个是播放 flv 格式的 视频*/
        /*$scope.initTimeout = setTimeout(()=>{
          $scope.videoElement = document.getElementById('videoElement');
          $scope.flvPlayer = flvjs.createPlayer({
            type: 'm3u8',
            isLive: true,
            url: $scope.sowing.url_m3u8
          });
          $scope.flvPlayer.attachMediaElement($scope.videoElement);
          $scope.flvPlayer.load();
        },100);*/
        /*这种用 HLS 插件，可以在pc端播放了*/
        /*$scope.playTimeout = setTimeout(()=>{
          $scope.advShow = 0;
          if(Hls.isSupported()) {
            $scope.video = document.getElementById('videoElement');
            let hls = new Hls();
            hls.loadSource($scope.sowing.url_m3u8);
            hls.attachMedia($scope.video);
            hls.on(Hls.Events.MANIFEST_PARSED, function (e) {
              $scope.video.play();
            });
          }
        },3000);*/
      }
    }
  }

  //格式化时间
  convertTime(time){
    let h,hSplit,m,s;
    h = Math.floor(time/60/60);
    h = h < 10?"0"+h:h;
    h = Number(h) || "";
    hSplit = h?h+":":"";
    m = Math.floor((time-h*60*60)/60);
    m = m < 10?"0"+m:m;
    s = Math.floor(time%60);
    s = s < 10?"0"+s:s;
    return `${hSplit}${m}:${s}`
  }

  //获取广告
  getAdLive(){
    let payload = {
      type: 3
    };
    this.goP.yikeGet('ad/index',payload).then(data => {
      let ad = data.json();
      //直播广告
      $scope.adLive = ad.data[0].img;
    }).catch(err => {
      console.log(err);
    })
  }
  //暂停或者开始
  flv_pause(){
    if($scope.isStart){
      $scope.video.pause();
      $scope.playOrPause = "data:image/png;base64,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";
    }else{
      $scope.video.play();
      $scope.playOrPause = "data:image/png;base64,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";
    }
    $scope.isStart = !$scope.isStart;
  }
  //  全屏
  fullScreen(){
    /*if(this.screenOrientation.type == "portrait-primary"){
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }else{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    }*/
  }
  //关闭线路
  CloseSelectionRoute(){
    $scope.linesStatus = 0;
  }
  //关闭广告资源
  CloseAd(item){
    this.tryHeight();
    item.adStatus = 0;
  }















  //视屏播放
  videoInit() {
    if (Hls.isSupported()) {
      let video: any = document.getElementsByClassName('ckplayer')[0];
      let hls = new Hls();
      let flag = false;
      //http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8
      //console.log( hls.loadSource('http://ztest.qiniudn.com/sintel.m3u8'));
     // hls.loadSource('http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,()=>{
         video.play();
         flag = true;
         this.goP.LoadingHide();
      });
      let timer = setTimeout(()=>{
         clearTimeout(timer);
         this.goP.LoadingHide();
         flag == false ?this.goP.presentToast('加载失败'):"";
      }, 3000);
    } else {
      this.goP.presentToast('加载失败');
      this.goP.LoadingHide();
    }
  }
  ionViewDidLoad() {
    //let dom = document.getElementsByClassName('live_box')[0];
    //this.goP.LoadingShow('正在加载~');
    //this.videoInit();
    //this.show();
  }





}
