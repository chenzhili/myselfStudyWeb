// pages/rights/my-rights/my-rights.js
let $yikeUtils = require("../../../utils/utils");
let yikeTaishan = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "我的授权",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    $scope:{
      user:"",
      buystatus:"",
      endtime:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      "$scope.user":wx.getStorageSync("user")
    });
    if (this.data.$scope.user.status == 0) {
      this.setData({
        "$scope.buystatus": '未购买'
      });
    } else if (this.data.$scope.user.status == 1) {
      this.setData({
        "$scope.buystatus": '标准版'
      });
    } else {
      this.setData({
        "$scope.buystatus": '专业版'
      });
    }
    let tempTime = $yikeUtils.formatTime(Number(this.data.$scope.user.end_time),"Y-M-D")
    this.setData({
      "$scope.endtime":tempTime
    });
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