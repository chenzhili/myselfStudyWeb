// pages/movements/movements.js
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: { 
      title: "开奖走势",
      isBackShow: false,
      isLeftTextShow: false,
      isRightTextShow: false,
      rightText: "客服",
      isDateShow: true,
      moeveDate:["最近30期","最近60期","最近90期"],
      dateIndex:0
    },
    $scope:{
      pkScreen: [{ ob: 'first', content: '冠军' }, { ob: 'second', content: '亚军' }, { ob: 'third', content: '季军' }, { ob: 'fourth', content: '第四' }, { ob: 'fifth', content: '第五' },{ ob: 'sixth', content: '第六' }, { ob: 'seventh', content: '第七' }, { ob: 'eighth', content: '第八' }, { ob: 'ninth', content: '第九' }, { ob: 'tenth', content: '第十' }],
      movementsNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      user:"",
      datas:"",
      movements:{
        num: '30',
        op: 'pk10',
        ob: 'first',
        digit: '冠军'
      },
      date:[30,60,90]
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
      "$scope.user": wx.getStorageSync("user")
    });
    this._init();
  },
  /**
   * 初始化信息
   */
  _init:function(){
    let me = this;
    $yikeUtils.loading();
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          if (wx.getStorageSync("datas") && wx.getStorageSync("analysis")) {
            me.setData({
              "$scope.datas": wx.getStorageSync("datas"),
              "$scope.analysis" : wx.getStorageSync("analysis")
            });
            
          }
          me._movements();
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
   * 位数走势
   */
  digitMovements:function(e) {
    let me = this;
    $yikeUtils.loading();
    me.setData({
      "$scope.movements.ob":e.currentTarget.dataset.ob,
      "$scope.movements.digit": e.currentTarget.dataset.content
    });
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          me._movements();
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
   * 走势数据
   */
  _movements:function() {
    let me = this;
    yikeTaishan.movements(me.data.$scope.movements.op, me.data.$scope.movements.ob, Number(me.data.$scope.movements.num))
      .then(function (data) {
        if (data.status == 1) {
          me.setData({
            "$scope.datas": data.result.list,
            "$scope.analysis": data.result.analysis
          });
          wx.setStorageSync("datas", data.result.list);
          wx.setStorageSync("analysis", data.result.list);
        }
      })
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
   * 改变期数
   */
  dateChange:function(e){
    let me = this;
    this.setData({
      "headerData.dateIndex": e.detail.value,
      "$scope.movements.num": me.data.$scope.date[e.detail.value]
    });
    $yikeUtils.loading();
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          me._movements();
        } else {
          $yikeUtils.showModal("提示", data.result.result).then(function () {
            wx.removeStorageSync('user');
            wx.redirectTo({
              url: '../login-register/login/login',
            })
          });
        }
      })
  }
})