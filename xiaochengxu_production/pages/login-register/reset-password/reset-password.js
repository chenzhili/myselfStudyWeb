// pages/login-register/reset-password/reset-password.js
let $yikeUtils = require("../../../utils/utils");
let yikeTaishan = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "忘记密码",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    $scope:{
      user:{
        phone: '',
        password: '',
        passwordTwo: '',
        op: 'reset',
        msg: ''
      },
      countdown: 60,
      msgCotent: "获取验证码"
    }
  },
  /**
     * 发送验证码
     */
  sendMsg: function () {
    let me = this;
    if (me.data.$scope.user.phone == '' || me.data.$scope.user.phone == null) {
      $yikeUtils.toast('请输入正确帐号', "../../../img/err.png");
      return false;
    }
    if (me.data.$scope.msgCotent == "获取验证码") {
      yikeTaishan.sendMsg(me.data.$scope.user.phone, me.data.$scope.user.op)
        .then(function (data) {
          $yikeUtils.toast(data.result.result, "../../../img/err.png");
          if (data.status == 1) {
            me.setData({
              "$scope.user.msg": data.result.msg
            });
            me._settime();
          }
        });
    }

  },
  /**
   * 倒计时
   */
  _settime: function () {
    let me = this;
    if (me.data.$scope.countdown == 0) {
      me.setData({
        "$scope.msgCotent": "获取验证码",
        "$scope.countdown": 60
      });
      return;
    } else {
      me.setData({
        "$scope.msgCotent": "重新发送(" + me.data.$scope.countdown + ")",
        "$scope.countdown": me.data.$scope.countdown - 1
      });
    }
    setTimeout(function () {
      me._settime()
    }
      , 1000)
  },
  /**
   * 获取输入框输出的值
   */
  bindinput: function (e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        "$scope.user.phone": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        "$scope.user.msg": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        "$scope.user.password": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 4) {
      this.setData({
        "$scope.user.passwordTwo": e.detail.value
      });
    }
  },
  /**
   * 确认修改
   */
  reset:function(){
    let me = this;
    if (me.data.$scope.user.phone == '' || me.data.$scope.user.phone == null) {
      $yikeUtils.toast('请先输入手机号');
    } else if (me.data.$scope.user.msg == '' || me.data.$scope.user.msg == null) {
      $yikeUtils.toast('请先输入验证码');
    } else if (me.data.$scope.user.password == '' || me.data.$scope.user.password == null) {
      $yikeUtils.toast('请先输入密码');
    } else if (me.data.$scope.user.password.length < 6) {
      $yikeUtils.toast('密码长度至少6位');
    } else if (me.data.$scope.user.passwordTwo == '' || me.data.$scope.user.passwordTwo == null) {
      $yikeUtils.toast('请再次输入密码');
    } else if (me.data.$scope.user.passwordTwo != me.data.$scope.user.password) {
      $yikeUtils.toast('两次密码不一致');
    } else {
      $yikeUtils.loading();
      yikeTaishan.modificationPassword('reset', me.data.$scope.user.phone, me.data.$scope.user.password, '', '')
        .then(function (data) {
          wx.hideLoading();
          $yikeUtils.toast(data.result.result, "../../../img/err.png");
          if (data.status == 1) {
            wx.navigateBack();
          }
        })
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