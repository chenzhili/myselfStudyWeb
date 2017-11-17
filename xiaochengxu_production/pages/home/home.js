// pages/home/home.js
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
let qr = require("../../utils/wxqrcode.js");
// 如果是用二维码存储客服图片用的
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData:{
      title:"PK10追号计划",
      isBackShow:false,
      isLeftTextShow:true,
      kf:true
    },
    playList: [],
    $scope:{
      user:"",
      banners:"",
      noticeList:"",
      pk:"",
      thispk:"",
      pkTime:"",
      playStatus:{
        pkStatus:0
      },
      pkt:5,
      pksh:"",
      collectDetail:[],
      collect:"",
      url:"",
      isHiddenImg:true
    }
  },
  /**
   * 是否隐藏二维码
   */
  link:function(){
    let me = this;
    me.setData({
      "$scope.isHiddenImg": !me.data.$scope.isHiddenImg
    });
    let img = qr.createQrCodeImg("https://www.baidu.com",{
        size:50
      });
    this.setData({
      "$scope.url":img
    })
  },
  /**
   * 是否隐藏二维码
   */
  isHiddenImg:function(){
    let me = this;
    me.setData({
      "$scope.isHiddenImg": !me.data.$scope.isHiddenImg
    });
  },
  /**
   * 扫描二维码
   */
  scanCode:function(){
    let me = this;
    wx.scanCode({
      success:function(res){
        console.log(res);
      }
    })
    // wx.saveImageToPhotosAlbum({
    //   filePath: me.data.$scope.url,
    //   complete:function(res){
    //     console.log(res);
    //   }
    // })
    // wx.downloadFile({
    //   url:me.data.$scope.url,
    //   complete:function(res){
    //     console.log(res);
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 获取详情
   */
  toMessage:function(e){
    wx.navigateTo({
      url: `../message/my-message-detail/my-message-detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
     * 选择planid是否存在于缓存
     */
  _judge: function (plan_id, playList) {
    for (var l = 0; l < playList.length; l++) {
      if (playList[l].planid == plan_id) {
        return String(l);
      }
    }
    return false;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      "$scope.user": wx.getStorageSync("user")
    });
    /*取出缓存里的方案详情*/
    if (wx.getStorageSync("myCollectionDetails")) {
      this.setData({
        "$scope.collectDetail": wx.getStorageSync("myCollectionDetails")
      });
    } else {
      this.setData({
        "$scope.collectDetail": []
      });
    }
    if (wx.getStorageSync("playList")) {
      this.setData({
        "playList": wx.getStorageSync("playList")
      });
    }
    this._banner();
    this._notes();
    this._lottery();
    this._myCollect();
  },
  /**
   * 我的收藏系列
   */
  _myCollect:function() {
    $yikeUtils.loading();
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          yikeTaishan.myCollect('my_collection', 'pk10', me.data.$scope.user.id)
            .then(function (data) {
              if (data.status == 1) {
                me.setData({
                  "$scope.collect":data.result.collection
                });
                me._getcollectId();
              } else {
                me.setData({
                  "$scope.collect": []
                });
                $yikeUtils.toast(data.result.collection);
              }
            })
        } else {
          clearInterval(me.data.$scope.pksh);
          $yikeUtils.showModal("提示",data.result.result).then(function () {
            wx.removeStorageSync('user');
            wx.redirectTo({
              url: '../login-register/login/login',
            })
          });
        }
      })
  },
  /**
   * 获取我的收藏玩法
   */
  _getcollectId:function(){
    let me = this;
    let dataTemp = [];
      for(var i = 0; i<me.data.$scope.collect.length; i++){
        dataTemp.length = 0;
        let x = me._judge(me.data.$scope.collect[i].plan_id, me.data.playList);
        if(x){
          dataTemp[0] = me.data.$scope.collect[i].plan_id; dataTemp[1] = me.data.$scope.user.token; dataTemp[2] = me.data.playList[x].num; dataTemp[3] = me.data.playList[x].code; dataTemp[4] = me.data.playList[x].rate_high;
          dataTemp[5] = me.data.playList[x].rate_low; dataTemp[6] = me.data.playList[x].no_num_high; dataTemp[7] = me.data.playList[x].no_num_low; dataTemp[8] = me.data.playList[x].ok_num_high;
          dataTemp[9] = me.data.playList[x].ok_num_low; dataTemp[10] = me.data.playList[x].current_high; dataTemp[11] = me.data.playList[x].current_low;
        }else{
          dataTemp[0] = me.data.$scope.collect[i].plan_id; dataTemp[1] = me.data.$scope.user.token;
        }
        yikeTaishan.pkDetails(dataTemp[0], dataTemp[1], dataTemp[2], dataTemp[3], dataTemp[4], dataTemp[5], dataTemp[6], dataTemp[7], dataTemp[8], dataTemp[9], dataTemp[10], dataTemp[11])
          .then(function (data) {
            let a = data.result.win1.split(' ');
            let c = {};
            c.v1 = a[0];
            c.v2 = a[1];
            c.v3 = data.result.win3;
            c.v4 = data.result.win.rate;
            c.v5 = data.result.plan.id;
            c.v6 = data.result.plan.type;
            let tempArr = me.data.$scope.collectDetail;
            tempArr.push(c);
            me.setData({
              "$scope.collectDetail": tempArr
            });
          }).catch(function(err){
            console.log(err);
          });
      }
      
},
  /**
   * banner图
   */
  _banner:function(){
    let me = this;
    yikeTaishan.banner()
      .then(function (banner) {
        if (banner.status == 1) {
          me.setData({
            "$scope.banners":banner.result.banner
          });
        }
      })
      .catch((e)=>{
        console.log(e);
      });
  },
  /**
   * 广告列表
   */
  _notes:function(){
    let me = this;
    yikeTaishan.homeNotice()
      .then(function (data) {
        if (data.status == 1) {
          me.setData({
            "$scope.noticeList" : data.result.result
          });
        }
      });
  },
  /**
   * 首页历史开奖
   */
  _lottery:function(){
    let me = this;
    yikeTaishan.lottery('index', '')
      .then(function (lottery) {
        if (lottery.status == 1) {
          me.setData({
            "$scope.pk" : lottery.result.pk10,
            "$scope.thispk" : Number(me.data.$scope.pk.num) + 1,
            "$scope.pkTime": parseInt(me.data.$scope.pk.difference_time)
          });
          if (new Date().getHours() >= 0 && new Date().getHours <= 8) {
            me.setData({
              "$scope.playStatus.pkStatus" : 2
            });
            
          } else {
            if (me.data.$scope.pkTime > 0) {
              me.setData({
                "$scope.playStatus.pkStatus": 1
              });
            } else {
              me.setData({
                "$scope.playStatus.pkStatus": 0
              });
            }
          }
          me._pkTimer(me.data.$scope.pkTime-5);
        }
      })
  },
  /**
   * 倒计时
   */
  _pkTimer: function (intDiff){
    let me = this;
    clearInterval(me.data.$scope.pksh);
    me.data.$scope.pksh = setInterval(function () {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;//时间默认值
      if (intDiff > 0) {
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      } else {
        clearInterval(me.data.$scope.pksh);
        if (intDiff == 0) {
          me._lottery();
        } else {
          me.setData({
            "$scope.pkt":me.data.$scope.pkt-1
          });
          if (me.data.$scope.pkt == 0) {
            me._lottery();
            me.setData({
              "$scope.pkt": 5
            });
          } else {
            me._pkTimer(-1);
          }
        }
      }
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      me.setData({
        "$scope.pktime":minute + ':' + second
      });
      intDiff--;
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.$scope.pksh);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.$scope.pksh);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  clickTo:function(){
  },
  /**
   * 跳转到宝典秘籍
   */
  news:function(){
    wx.navigateTo({
      url: '../news/news',
    })
  },
  /**
   * 购买授权
   */
  rights:function(){
    wx.navigateTo({
      url: '../rights/pay-rights/pay-rights',
    })
  },
  /**
   * 更改计划
   */
  changePlans:function(){
    wx.navigateTo({
      url: '../change-plans/change-plans',
    })
  }
})