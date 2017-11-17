// pages/news/details/details.js
let yikeTaishan = require("../../../utils/request");
let $yikeUtils = require("../../../utils/utils");
let WxParse = require("../../common/wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "详情",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    $scope:{
      id:"",
      content:""
    }
  },
  /**
   * 信息初始化
   */
  _init:function(){
    let me = this;
    let that = this;
    $yikeUtils.loading();
    yikeTaishan.details(me.data.$scope.id)
      .then(function (data) {
        wx.hideLoading();
        let pattern1 = /&lt;/gim;
        let pattern2 = /&gt;/gim;
        let pattern3 = /&quot;/gim;
        data.result.result.content = data.result.result.content.replace(pattern1, '<');
        data.result.result.content = data.result.result.content.replace(pattern2, '>');
        data.result.result.content = data.result.result.content.replace(pattern3, '"');
        me.setData({
          "$scope.content":data.result.result
        });
        WxParse.wxParse('content', 'html', me.data.$scope.content.content, that);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "$scope.id":options.id
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