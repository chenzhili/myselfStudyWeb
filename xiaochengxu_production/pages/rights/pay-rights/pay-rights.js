// pages/rights/pay-rights/pay-rights.js
let $yikeUtils = require("../../../utils/utils");
let yikeTaishan = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "购买授权",
      isBackShow:true,
      img:"../../../img/back.png"
    },
    page:{
      radioIndex:1
    },
    $scope:{
      allways:"",
      user:"",
      price:""
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
          me._getsetWays();
        } else {
          $yikeUtils.showModal("提示", data.result.result).then(function () {
            wx.removeStorageSync('user');
            wx.redirectTo({
              url: '../../login-register/login/login',
            })
          });
        }
      })
  },
  /**
   * 获取所有的方式
   */
  _getsetWays:function(){
    let me = this;
    yikeTaishan.setWays()
      .then(function (data) {
        me.setData({
          "$scope.allways": data.result.result
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
  
  },
  /**
   * 自己定制 单选按钮
   */
  makeRadio:function(e){
    this.setData({
      "page.radioIndex": e.currentTarget.dataset.radio,
      "$scope.price": e.currentTarget.dataset.price
    });
  },
  /**
   * 下一步
   */
  next:function(){
    let me = this;
    wx.navigateTo({
      url: `../pay-ways/pay-ways?type=1&price=${me.data.$scope.price}`,
    })
  }
})