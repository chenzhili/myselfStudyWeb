// pages/feed-back/feed-back.js
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "意见反馈",
      isBackShow: true
    },
    $scope:{
      user:"",
      content:""
    }
  },
  /**
   * 信息初始化
   */
  _init:function(){
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status != 1) {
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
   * 获取输入值
   */
  bindinput:function(e){
    this.setData({
      "$scope.content": e.detail.value
    });
  },
  /**
   * 确认提交
   */
  confirm:function(){
    let me = this;
    $yikeUtils.loading();
    yikeTaishan.feedback(me.data.$scope.content, me.data.$scope.user.phone)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          $yikeUtils.toast('提交完成');
        } else {
          $yikeUtils.toast('提交失败');
        }
        me.setData({
          "$scope.content":""
        });
      });
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
      "$scope.user": wx.getStorageSync("user")
    });
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