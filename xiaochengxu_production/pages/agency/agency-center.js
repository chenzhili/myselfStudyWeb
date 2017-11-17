// pages/agency/agency-center.js
let img = require("../../utils/img_base64");
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:{
      "account_bg": img.account_bg
    },
    $scope:{
      user:"",
      agency:""
    }
  },
  /**
   * 信息初始化
   */
  _init:function(){
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          me._getMessage();
        } else {
          $yikeUtils.showModal("提示", data.result.result).then(function () {
            wx.removeStorageSync('user');
            wx.redirectTo({
              url: '../login-register/login/login',
            })
          });
        }
      });
  },
  /**
   * 获取代理信息
   */
  _getMessage:function(){
    let me = this;
    yikeTaishan.agencyMessage(me.data.$scope.user.token)
      .then(function (data) {
        me.setData({
          "$scope.agency": data.result
        });
        console.log(data);
      })
      .catch(function (err) {
        $yikeUtils.toast(err);
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