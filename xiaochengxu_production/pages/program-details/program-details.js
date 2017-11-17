// pages/program-details/program-details.js
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "计划详情",
      isBackShow: true,
      isRightTextShow:true,
      rightText:"搜索",
      isRightTextShowSecond:true,
      rightTextSecond:"复制",
      delta:""  //如果是从搜索页面进入，就给他个2
    },
    playList:[],
    $scope:{
      playId:"",
      user:"",
      id:"",
      type:"",
      collect:[],
      collectDetail:[],
      pkDetailList:"",
      pkDetail:"",
      pk:"",
      thispk: "",
      pkTime: "",
      playStatus: {
        pkStatus: 0
      },
      pkt: 5,
      pksh: "",
      params:{},
      searchitem: {
        num: "",
        code: "",
        rate_high: "",
        rate_low: "",
        no_num_high: "",
        no_num_low: "",
        ok_num_high: "",
        ok_num_low: "",
        current_high: "",
        current_low: ""
      },
    }
  },
  /**
   * 我的收藏
   */
  _myCollect:function(){
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          $yikeUtils.loading();
          yikeTaishan.myCollect('my_collection', 'pk10', me.data.$scope.user.id)
            .then(function (data) {
              wx.hideLoading();
              if (data.status == 1) {
                me.setData({
                  "$scope.collect": data.result.collection
                });
                me._getcollectId();
              } else {
                me.setData({
                  "$scope.collect": data.result.collection
                });
                $yikeUtils.toast(data.result.collection);
              }
            })
        } else {
          $yikeUtils.showModal("提示", data.result.result).then(function () {
            wx.removeStorageSync('user');
            wx.redirectTo({
              url: '../login-register/login/login',
            })
          });
        }
      })
  },
  /**
   * 获取收藏id
   */
  _getcollectId:function(){
    let me = this;
    for (var i = 0; i < me.data.$scope.collect.length; i++) {
      yikeTaishan.pkDetails(me.data.$scope.collect[i].plan_id, me.data.$scope.user.token)
        .then(function (data) {
          if (data.status == 1) {
            var a = data.result.win1.split(' ');
            var c = [];
            c.push(a[0]);
            c.push(a[1]);
            c.push(data.result.win3);
            c.push(data.result.win.rate);
            c.push(data.result.plan.id);
            c.push(data.result.plan.type);
            let tempArr = me.data.$scope.collectDetail;
            tempArr.push(c);
            me.setData({
              "$scope.collectDetail": tempArr
            });
          }
        })
    }
  },
  /**
   * 获取历史开奖
   */
  _lottery:function(){
    let me = this;
    yikeTaishan.lottery('index', '')
      .then(function (lottery) {
        if (lottery.status == 1) {
          me.setData({
            "$scope.pk": lottery.result.pk10,
            "$scope.thispk": Number(me.data.$scope.pk.num) + 1,
            "$scope.pkTime": parseInt(me.data.$scope.pk.difference_time)
          });
          if (me.data.$scope.type != 1) {
            if (new Date().getHours() >= 0 && new Date().getHours <= 8) {
              me.setData({
                "$scope.playStatus.pkStatus": 2
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
            me._pkTimer(me.data.$scope.pkTime);
          }
          me._pkDetails();
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
            "$scope.pkt": me.data.$scope.pkt - 1
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
        "$scope.pktime": minute + ':' + second
      });
      intDiff--;
    }, 1000);
  },
  /**
   * pk10方案详情
   */
  _pkDetails:function(){
    let me = this;
    yikeTaishan.pkDetails(me.data.$scope.id, me.data.$scope.user.token, me.data.$scope.searchitem.code, me.data.$scope.searchitem.num, me.data.$scope.searchitem.rate_high, me.data.$scope.searchitem.rate_low, me.data.$scope.searchitem.no_num_high, me.data.$scope.searchitem.no_num_low, me.data.$scope.searchitem.ok_num_high, me.data.$scope.searchitem.ok_num_low, me.data.$scope.searchitem.current_high, me.data.$scope.searchitem.current_low)
      .then(function (data) {
        if(data.status == 1){
          let tempData = data;
          tempData.result.win2.create_time = $yikeUtils.formatTime(Number(tempData.result.win2.create_time), 'Y年M月D h:m:s')
          let tempList = data.result.win;
          delete tempList.current;
          delete tempList.no_num;
          delete tempList.ok_num;
          delete tempList.rate;
          delete tempList.win;
          me.setData({
            "$scope.pkDetail":data.result,
            "$scope.pkDetailList":tempList
          });
          let rightAndWrong = [];
          let rightNum = 0 ,wrongNum = 0,maxRight = 0,maxWrong = 0;
          let firstRight = 0,secondRight = 0,thirdRight = 0;
          for(let i in tempList){
            if(tempList[i].is_win == "中"){
              rightNum++;
              rightAndWrong.push(1);
            }else{
              wrongNum++;
              rightAndWrong.push(0);
            }
            if(tempList[i].num == 1){
              firstRight++;
            }
            if (tempList[i].num == 2) {
              secondRight++;
            }
            if (tempList[i].num == 3) {
              thirdRight++;
            }
          }
          let rightConneted = rightAndWrong.join("").replace(/0+/g,",").split(",");
          maxRight = rightConneted.sort(function (a, b) { return a - b; })[rightConneted.length - 1].length;
          //由于可能出现空字符串
          let wrongConneted = rightAndWrong.join("").replace(/1+/g, ",").split(",").join("").split(",");
          maxWrong = wrongConneted.sort(function (a, b) { return a - b; })[wrongConneted.length - 1].length;
          me.setData({
            "$scope.params":{
              rate: parseFloat(rightNum / (rightNum + wrongNum) * 100,2),
              maxRight: maxRight,
              maxWrong: maxWrong,
              rw: parseInt(maxRight / maxWrong) || 10,
              firstRight: firstRight,
              secondRight: secondRight,
              thirdRight: thirdRight
            }
          });
        }
      })
  },
  /**
   * 复制内容
   */
  linkSecond:function(){
    wx.setClipboardData({
      data: this.data.$scope.pkDetail.win3,
      success:function(){
        $yikeUtils.toast("复制成功");
      }
    })
  },
  /**
   * 选择不同玩法的详情玩法
   */
  changeDetails:function(e){
    this.setData({
      "$scope.playId": e.currentTarget.id,
      "$scope.id": e.currentTarget.id.substring(4)
    });
    this._pkDetails();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isTwo){
      let obj = JSON.parse(options.obj);
      // 下面这种方式可以不要了，用缓存就可以
      this.setData({
        "headerData.delta":3,
        "$scope.id":obj.planid,
        "$scope.searchitem.num": obj.num,
        "$scope.searchitem.code": obj.code,
        "$scope.searchitem.rate_low": obj.rate_low,
        "$scope.searchitem.rate_high": obj.rate_high,
        "$scope.searchitem.no_num_low": obj.no_num_low,
        "$scope.searchitem.no_num_high": obj.no_num_high,
        "$scope.searchitem.ok_num_low": obj.ok_num_low,
        "$scope.searchitem.ok_num_high": obj.ok_num_high,
        "$scope.searchitem.current_low": obj.current_low,
        "$scope.searchitem.current_high": obj.current_high,
      });
    }else{
      this.setData({
        "$scope.id": options.id,
        "$scope.type": options.type
      });
    }
  },
  
  /**
   * 跳转到搜索页面
   */
  link:function(){
    let me = this;
    if (me.data.headerData.delta){
      wx.navigateBack({});
    }else{
      wx.navigateTo({
        url: `search/search?id=${me.data.$scope.id}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
     * 选择planid是否存在于缓存
     */
  _judge: function (plan_id, playList) {
    for (var i = 0; i < playList.length; i++) {
      if (playList[i].planid == plan_id) {
        return String(i);
      }
    }
    return false;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      "$scope.user": wx.getStorageSync("user"),
      // "$scope.playId": "play" + this.data.$scope.id
    });
    let me = this;
    setTimeout(function(){
      // 有个bug，初始化时候设置 scroll-view的滚动位置，没效果，只有通过这种方式了
      me.setData({
        "$scope.playId": "play" + me.data.$scope.id
      });
    },1000);
    this._myCollect();
    this._lottery();
    if (wx.getStorageSync("playList")){
      this.setData({
        "playList": wx.getStorageSync("playList")
      });
      let i = this._judge(this.data.$scope.id, this.data.playList);
      if(i){
        this.setData({
          "$scope.searchitem.num": this.data.playList[i].num,
          "$scope.searchitem.code": this.data.playList[i].code,
          "$scope.searchitem.rate_low": this.data.playList[i].rate_low,
          "$scope.searchitem.rate_high": this.data.playList[i].rate_high,
          "$scope.searchitem.no_num_low": this.data.playList[i].no_num_low,
          "$scope.searchitem.no_num_high": this.data.playList[i].no_num_high,
          "$scope.searchitem.ok_num_low": this.data.playList[i].ok_num_low,
          "$scope.searchitem.ok_num_high": this.data.playList[i].ok_num_high,
          "$scope.searchitem.current_low": this.data.playList[i].current_low,
          "$scope.searchitem.current_high": this.data.playList[i].current_high,
        });
      }
    }
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
  
  }
})