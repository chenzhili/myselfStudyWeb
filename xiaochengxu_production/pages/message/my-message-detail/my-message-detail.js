// pages/message/my-message-detail/my-message-detail.js
let $yikeUtils = require("../../../utils/utils");
let yikeTaishan = require("../../../utils/request");
let WxParse = require("../../common/wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "消息详情",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    $scope:{
      id:"",
      content:""
    }
  },
  /**
   * 初始化信息
   */
  _init:function(){
    let me = this;
    let that = this;
    yikeTaishan.myMessageAndDetail("view", "", me.data.$scope.id)
      .then(function (res) {
        let pattern1 = /&lt;/gim;
        let pattern2 = /&gt;/gim;
        let pattern3 = /&quot;/gim;
        res.result.result.content = res.result.result.content.replace(pattern1, '<');
        res.result.result.content = res.result.result.content.replace(pattern2, '>');
        res.result.result.content = res.result.result.content.replace(pattern3, '"');
        res.result.result.creation_time = $yikeUtils.formatTime(Number(res.result.result.creation_time), 'Y.M.D h:m:s');
        me.setData({
          "$scope.content":res.result.result
        });
        WxParse.wxParse('content', 'html', me.data.$scope.content.content, that);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "$scope.id":options.id
    });
    console.log(this.data.$scope.id);
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
    this._init();
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