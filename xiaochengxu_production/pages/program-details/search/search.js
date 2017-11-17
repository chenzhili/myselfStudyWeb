// pages/program-details/search/search.js
let yikeTaishan = require("../../../utils/request");
let $yikeUtils = require("../../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "搜索公式",
      isBackShow: true,
      isRightTextShow: true,
      rightText: "提交",
      img:"../../../img/back.png"
    },
    message:[ //四个滑块
      {
        slide11Start: 0,
        slide11Index: 0,
        slide12Index: 0,
        slider12Start: 280,
        slider11_first: 0,
        slider12_second: 280,
        slide1_percent1: 0,
        slide1_percent2: 100,
        low:0,
        high:100
      },
      {
        slide11Start: 0,
        slide11Index: 0,
        slide12Index: 0,
        slider12Start: 280,
        slider11_first: 0,
        slider12_second: 280,
        slide1_percent1: 0,
        slide1_percent2: 10,
        low: 0,
        high: 10
      },
      {
        slide11Start: 0,
        slide11Index: 0,
        slide12Index: 0,
        slider12Start: 280,
        slider11_first: 0,
        slider12_second: 280,
        slide1_percent1: 0,
        slide1_percent2: 10,
        low: 0,
        high: 10
      },
      {
        slide11Start: 0,
        slide11Index: 0,
        slide12Index: 0,
        slider12Start: 280,
        slider11_first: 0,
        slider12_second: 280,
        slide1_percent1: -10,
        slide1_percent2: 10,
        low: -10,
        high: 10
      }
    ],
    playList:[],
    $scope:{
      user:"",
      searchitem:{
        num: 3,
        code: 3,
        rate_high: 100,
        rate_low: 0,
        no_num_high: 10,
        no_num_low: 0,
        ok_num_high: 10,
        ok_num_low: 0,
        current_high: 10,
        current_low: -10
      },
      planid:"",
    }
  },
  /**
   * 选择planid是否存在于缓存
   */
  _judge: function (plan_id,playList){
    for (var i = 0; i < playList.length; i++) {
      if (playList[i].planid == plan_id) {
        return String(i);
      }
    }
    return false;
  },
  /**
   * 输入框发生变化
   */
  bindinput:function(e){
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        "$scope.searchitem.num": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        "$scope.searchitem.code": e.detail.value
      });
    }
  },
  /**
   * 自定义滑块实现事件
   */
  sliderStart:function(e){
    this._publicStart(e,1);
    this._publicStart(e,2);
    this._publicStart(e, 3);
    this._publicStart(e, 4);
  },
  sliderMove:function(e){
    var me = this;
    var moveTouche = e.changedTouches[0].clientX;
    this._publicSlider(e, 1, moveTouche)
    this._publicSlider(e, 2, moveTouche)
    this._publicSlider(e, 3, moveTouche)
    this._publicSlider(e, 4, moveTouche)
  },
  /**
   * 滑块开始的公共函数
   */
  _publicStart:function(e,n){
    // 第一个滑块
    if (e.currentTarget.id == `slider${n}1`) {
      let params = {};
      params[`message[${n - 1}].slide11Start`] = e.changedTouches[0].clientX
      this.setData(params);
    }
    // 第二个滑块
    if (e.currentTarget.id == `slider${n}2`) {
      let params = {};
      params[`message[${n - 1}].slider12Start`] = e.changedTouches[0].clientX
      this.setData(params);
    }
  },
  /**
   * 滑块移动的公共函数
   * n为第几个slider
   */
  _publicSlider: function (e, n, moveTouche){
    // 第一个滑块
    if (e.currentTarget.id == `slider${n}1`) {
      let params = {};
      params[`message[${n - 1}].slider11_first`] = this.data.message[n - 1].slider11_first + moveTouche - this.data.message[n - 1].slide11Start;
      params[`message[${n - 1}].slide11Start`] = moveTouche;
      params[`message[${n - 1}].slide1_percent1`] = this.data.message[n - 1].low +Math.ceil(this.data.message[n - 1].slider11_first * (this.data.message[n - 1].high - this.data.message[n - 1].low) / 280);
      this.setData(params);
      if (this.data.message[n - 1].slider11_first < 0) {
        let params = {};
        params[`message[${n - 1}].slider11_first`] = 0;
        params[`message[${n - 1}].slide11Start`] = 0;
        this.setData(params);
      }
      if (this.data.message[n - 1].slider11_first > this.data.message[n - 1].slider12_second) {
        let params = {};
        params[`message[${n - 1}].slider11_first`] = this.data.message[n - 1].slider12_second;
        params[`message[${n - 1}].slide11Start`] = this.data.message[n - 1].slider12_second;
        params[`message[${n - 1}].slide11Index`] = 100;
        params[`message[${n - 1}].slide12Index`] = 0;
        this.setData(params);
      }
    }
    // 第二个滑块
    if (e.currentTarget.id == `slider${n}2`) {
      let params = {};
      params[`message[${n - 1}].slider12_second`] = this.data.message[n - 1].slider12_second + moveTouche - this.data.message[n - 1].slider12Start;
      params[`message[${n - 1}].slider12Start`] = moveTouche;
      params[`message[${n - 1}].slide1_percent2`] = this.data.message[n - 1].low+Math.ceil(this.data.message[n - 1].slider12_second * (this.data.message[n - 1].high - this.data.message[n - 1].low) / 280);
      this.setData(params);

      if (this.data.message[n - 1].slider12_second > 280) {
        let params = {};
        params[`message[${n - 1}].slider12_second`] = 280;
        params[`message[${n - 1}].slider12Start`] = 280;
        this.setData(params);
      }
      if (this.data.message[n - 1].slider12_second < this.data.message[n - 1].slider11_first) {
        let params = {};
        params[`message[${n - 1}].slider12_second`] = this.data.message[n - 1].slider11_first;
        params[`message[${n - 1}].slider12Start`] = this.data.message[n - 1].slider11_first;
        params[`message[${n - 1}].slide11Index`] = 0;
        params[`message[${n - 1}].slide12Index`] = 100;
        this.setData(params);
      }
    }
  },
  /**
   * 提交 链接会详情
   */
  link:function(){
    let me = this;
    if (me.data.$scope.user.status == 0) {
      $yikeUtils.toast('购买权限之后才能使用此功能',"../../../img/err.png");
      return
    }
    me.setData({
      "$scope.searchitem.rate_low": me.data.message[0].slide1_percent1,
      "$scope.searchitem.rate_high": me.data.message[0].slide1_percent2,
      "$scope.searchitem.no_num_low": me.data.message[1].slide1_percent1,
      "$scope.searchitem.no_num_high": me.data.message[1].slide1_percent2,
      "$scope.searchitem.ok_num_low": me.data.message[2].slide1_percent1,
      "$scope.searchitem.ok_num_high": me.data.message[2].slide1_percent2,
      "$scope.searchitem.current_low": me.data.message[3].slide1_percent1,
      "$scope.searchitem.current_high": me.data.message[3].slide1_percent2,
    });
    yikeTaishan.search(me.data.$scope.planid, me.data.$scope.searchitem.code, me.data.$scope.searchitem.num, me.data.$scope.searchitem.rate_high, me.data.$scope.searchitem.rate_low, me.data.$scope.searchitem.no_num_high, me.data.$scope.searchitem.no_num_low, me.data.$scope.searchitem.ok_num_high, me.data.$scope.searchitem.ok_num_low, me.data.$scope.searchitem.current_high, me.data.$scope.searchitem.current_low, me.data.$scope.user.token)
      .then(function (data) {
        if (data.result.result) {
          $yikeUtils.toast('暂无该条件的数据', "../../../img/err.png");
          return false;
        } else {
          let nextObjg = {
            "planid": me.data.$scope.planid,
            "code": me.data.$scope.searchitem.code, //计划周期 num:code
            "num": me.data.$scope.searchitem.num, //定码个数  code:num
            "rate_low": me.data.message[0].slide1_percent1,
            "rate_high": me.data.message[0].slide1_percent2,
            "no_num_low": me.data.message[1].slide1_percent1,
            "no_num_high": me.data.message[1].slide1_percent2,
            "ok_num_low": me.data.message[2].slide1_percent1,
            "ok_num_high": me.data.message[2].slide1_percent2,
            "current_low": me.data.message[3].slide1_percent1,
            "current_high": me.data.message[3].slide1_percent2,
          }
          let isResultQuery = me._judge(me.data.$scope.planid, me.data.playList);
          if(isResultQuery){
            let params = {};
            params[`playList[${isResultQuery}].num`] = me.data.$scope.searchitem.num;
            params[`playList[${isResultQuery}].code`] = me.data.$scope.searchitem.code;
            params[`playList[${isResultQuery}].rate_high`] = me.data.$scope.searchitem.rate_high;
            params[`playList[${isResultQuery}].rate_low`] = me.data.$scope.searchitem.rate_low;
            params[`playList[${isResultQuery}].no_num_high`] = me.data.$scope.searchitem.no_num_high;

            params[`playList[${isResultQuery}].no_num_low`] = me.data.$scope.searchitem.no_num_low;
            params[`playList[${isResultQuery}].ok_num_high`] = me.data.$scope.searchitem.ok_num_high;
            params[`playList[${isResultQuery}].ok_num_low`] = me.data.$scope.searchitem.ok_num_low;
            params[`playList[${isResultQuery}].current_high`] = me.data.$scope.searchitem.current_high;
            params[`playList[${isResultQuery}].current_low`] = me.data.$scope.searchitem.current_low;
            me.setData(params);
          }else{
            let tempList = me.data.playList;
              tempList.push({
                planid: me.data.$scope.planid,
                num: me.data.$scope.searchitem.code,
                code: me.data.$scope.searchitem.num,
                rate_high: me.data.$scope.searchitem.rate_high,
                rate_low: me.data.$scope.searchitem.rate_low,
                no_num_high: me.data.$scope.searchitem.no_num_high,
                no_num_low: me.data.$scope.searchitem.no_num_low,
                ok_num_high: me.data.$scope.searchitem.ok_num_high,
                ok_num_low: me.data.$scope.searchitem.ok_num_low,
                current_high: me.data.$scope.searchitem.current_high,
                current_low: me.data.$scope.searchitem.current_low
              });
              me.setData({
                "playList":tempList
              });
          }
          wx.setStorageSync("playList", me.data.playList)
          // 为了能传值，navigationTo，后面返回两层就好
          wx.navigateTo({
            url: `../program-details?isTwo=1&obj=${JSON.stringify(nextObjg)}`
          });
        }
      });
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "$scope.planid": options.id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      "$scope.user": wx.getStorageSync("user")
    });
    if (wx.getStorageSync("playList")){
      this.setData({
        "playList": wx.getStorageSync("playList")
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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