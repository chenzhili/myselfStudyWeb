// pages/password/modification-password.js
let img = require("../../utils/img_base64")
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "密码管理",
      isBackShow: true
    },
    img:{
      "login_bg": img.login_bg
    },
    $scope:{
      user:"",
      input:{
        oldPassword: '',
        newPassword: '',
        password: ''
      }
    }
  },
  /**
   * 获取输入的值
   */
  bindinput:function(e){
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        "$scope.input.oldPassword": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        "$scope.input.newPassword": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        "$scope.input.password": e.detail.value
      });
    }
  },
  /**
   * 确认修改
   */
  modification:function(){
    let me = this;
    if (me.data.$scope.input.oldPassword == '') {
      $yikeUtils.toast('请先输入旧密码');
    } else if (me.data.$scope.input.oldPassword.length < 6) {
      $yikeUtils.toast('密码长度至少6位');
    } else if (me.data.$scope.input.newPassword == '') {
      $yikeUtils.toast('请先输入新密码');
    } else if (me.data.$scope.input.newPassword.length < 6) {
      $yikeUtils.toast('密码长度至少6位');
    } else if (me.data.$scope.input.password == '') {
      $yikeUtils.toast('请再次输入密码');
    } else if (me.data.$scope.input.password != me.data.$scope.input.newPassword) {
      $yikeUtils.toast('两次密码不一致');
    } else {
      yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
        .then(function (data) {
          if (data.status == 1) {
            $yikeUtils.loading();
            yikeTaishan.modificationPassword('modify', '', me.data.$scope.input.newPassword, me.data.$scope.input.oldPassword, me.data.$scope.user.token)
              .then(function (data) {
                wx.hideLoading();
                $yikeUtils.toast(data.result.result);
                if (data.status == 1) {
                  wx.removeStorageSync("user");
                  wx.redirectTo({
                    url: '../login-register/login/login',
                  })
                }
              })
          } else {
            $yikeUtils.showModal("提示", data.result.result).then(function () {
              wx.removeStorageSync('user');
              wx.redirectTo({
                url: '../login-register/login/login',
              })
            });
          }
        });
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