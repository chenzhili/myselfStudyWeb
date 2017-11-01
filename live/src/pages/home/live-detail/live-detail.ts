import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepeatProvider } from '../../../providers/repeat/repeat';
declare var CKobject: any, Hls: any,flvjs:any ;
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
    $scope.adStatus = 0;
    //获取上个页面的id
    $scope.liveId = this.navParams.get('item');
    this.getDetail();
    this.getAdLive();
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
      $scope.liveMsg = menu.msg;
      console.log($scope.liveMsg );
      $scope.sowing = menu.data;
      console.log($scope.sowing);
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }
  //观看直播
  show(){
    $scope.liveShow = 1;
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: 'http://live.yike1908.com/yike_live/aaa.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
    $scope.linesStatus = 0;

  }


  //获取广告
  getAdLive(){
    console.log(1231231231);
    let payload = {
      type: 1
    };
    this.goP.yikeGet('ad/index',payload).then(data => {
      let ad = data.json();
      //直播广告
      $scope.adMsg = ad.msg;
      console.log(ad);
      $scope.adLive = ad.data;
      console.log($scope.adLive);
    }).catch(err => {
      this.goP.presentToast(err);
    })
  }

  //选择路线
  SelectionRoute(){
    $scope.linesStatus = 1;
  }
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
