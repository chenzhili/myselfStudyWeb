let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
// pages/lottery/lottery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "历史开奖",
      isBackShow: false,
      isLeftTextShow: true,
      isRightTextShow: true,
      rightText: "两面长龙"
    },
    $scope:{
      user:"",
      op : 'pk10',
      page:1,
      lotteryList:"",
      noMoreItemsAvailable:""
    }
  },
  /**
   * 获取历史开奖数据
   */
  _lottery:function() {
    let me = this;
    yikeTaishan.lottery(me.data.$scope.op, me.data.$scope.page)
      .then(function (data) {
        if (data.status == 1) {
          for (var i = 0; i < data.result.list.length; i++) {
            data.result.list[i].time = $yikeUtils.formatTime(Number(data.result.list[i].time), 'Y-M-D h:m:s')
          }
          if (me.data.$scope.page == 1) {
            me.setData({
              "$scope.lotteryList" : data.result.list
            });
            wx.setStorageSync("lotteryList", data.result.list)
          } else {
            let tempArr = me.data.$scope.lotteryList.concat(data.result.list);
            me.setData({
              "$scope.lotteryList": tempArr
            });
          }
        } else {
          me.setData({
            "$scope.lotteryList": []
          });
        };
        me.data.$scope.noMoreItemsAvailable = me.data.$scope.lotteryList.length >= Number(data.result.total);
        me.setData({
          "$scope.page": me.data.$scope.page+1
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
    this._lottery();
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
   * 下拉刷新
   */
  onPullDownRefresh:function(){
    let me = this;
    $yikeUtils.loading();
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          me.setData({
            "$scope.page":1
          });
          me._lottery();
          wx.stopPullDownRefresh();
        } else {
          wx.stopPullDownRefresh();
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
   * 上拉加载
   */
  onReachBottom:function(){
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          me._lottery();
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
   * 进入双面长龙
   */
  link:function(){
    wx.navigateTo({
      url: '../long/long',
    })
  }
})