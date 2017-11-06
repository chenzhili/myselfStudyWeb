import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepeatProvider } from '../../../providers/repeat/repeat';
declare var CKobject: any, Hls: any,flvjs:any,screen:any ;
import * as $ from "jquery";
var $scope;
@IonicPage()
@Component({
  selector: 'page-live-detail',
  templateUrl: 'live-detail.html',
})
export class LiveDetailPage {
  liveShow:string;
  linesStatus:string;
  adStatus:string;
  constructor(public goP: RepeatProvider, public navCtrl: NavController, public navParams: NavParams) {
    $scope=this;
    $scope.liveShow = 0;
    $scope.linesStatus = 0;
    $scope.isStart = true;
    $scope.adStatus = 0;
    $scope.advShow = 1;
    //获取上个页面的id
    $scope.liveId = this.navParams.get('item');
    this.getDetail();
    this.getAdLive();
    // window.addEventListener('deviceorientation', function(event) {
    //   // 以设备坐标系z轴为轴，旋转alpha度。alpha的作用域为(0, 360)
    //   // 以设备坐标系x轴为轴，旋转beta度。beta的作用域为(-180, 180)
    //   // 已设备坐标系y轴为轴，旋转gamma度。gamma的作用域为(-90, 90)
    //   console.log(window.orientation);
    // });
    console.log(screen);
  }

  //下拉刷新
  doRefresh(refresher) {
    refresher != undefined ? refresher.complete() : '';
    this.getDetail();
    this.getAdLive();
  }




  //获取详情
  getDetail() {
    let payload = {
      id: $scope.liveId
    };
    this.goP.yikeGet('match/details', payload).then(data => {
      let menu = data.json();
      //直播详情
      console.log(menu);
      $scope.liveMsg = menu.msg;
      $scope.sowing = menu.data;
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
  
  //观看直播
  livePlay(){
    $scope.liveShow = 1;
    setTimeout(()=>{
      $scope.advShow = 0;
      if (flvjs.isSupported()) {
        $scope.videoElement = document.getElementById('videoElement');
        // http://www.cnblogs.com/babuge/p/6894797.html
        screen.orientation.unlock();
        $scope.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: "http://live.yike1908.com/yike_live/asd.flv"
        });
        $scope.flvPlayer.attachMediaElement($scope.videoElement);
        $scope.flvPlayer.load();
        $scope.flvPlayer.play();
        console.log($scope.flvPlayer);
      }
    },3000);
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
      this.goP.presentToast(err);
    })
  }
  //暂停或者开始
  flv_pause(){
    if($scope.isStart){
      $scope.flvPlayer.pause();
    }else{
      $scope.flvPlayer.start();
    }
  }
  //  全屏
  fullScreen(){
    $scope.videoElement.webkitRequestFullScreen();
  }
  //选择路线
  // SelectionRoute(){
  //   // $scope.linesStatus = 1;
  //   $scope.liveShow = 1;
  //   if (flvjs.isSupported()) {
  //     var videoElement = document.getElementById('videoElement');
  //     var flvPlayer = flvjs.createPlayer({
  //       type: 'flv',
  //       isLive: true,
  //       url: 'http://live.yike1908.com/yike_live/英超.flv'
  //     });
  //     flvPlayer.attachMediaElement(videoElement);
  //     flvPlayer.load();
  //     flvPlayer.play();
  //   }
  //   $scope.linesStatus = 0;
  // }
  //关闭线路
  CloseSelectionRoute(){
    $scope.linesStatus = 0;
  }
  //关闭广告资源
  CloseAd(){
    $scope.adStatus = 1;
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

  playerInit(dom, src?) {
    //this.playerInit(dom, 'http://www.streambox.fr/playlists/test_001/stream.m3u8');
    var st = encodeURIComponent(src);
    let flashvars = {
      f: 'assets/ckplayer/m3u8.swf',
      a: st,
      s: 4,
      c: 0,
      p: 1,
      b: 0,
      lv: 1,//注意，如果是直播，需设置lv:1
      i: 'http://www.ckplayer.com/static/images/cqdw.jpg'
    };
    let video = [src + '->video/m3u8'];
    //let video = [src];
    var params = { bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent' };
    CKobject.embed('assets/ckplayer/ckplayer.swf', dom, 'ckplayer_a1', '100%', '400', false, flashvars, video, params);
  }

  ionViewDidLoad() {
    //let dom = document.getElementsByClassName('live_box')[0];
    //this.goP.LoadingShow('正在加载~');
    //this.videoInit();
    //this.show();
  }





}
