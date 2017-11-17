// pages/login-register/login/login.js
let img = require("../../../utils/img_base64");
let $yikeUtils = require("../../../utils/utils");
let yikeTaishan = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "登录"
    },
    img: {
      "login_bg": img.login_bg
    },
    message:{
      user:{
        email:"",
        password:"",
        op:"phone"
      }
    }
  },
   /**
    * 登录
    */
  login:function(){
    let me = this;
    if (me.data.message.user.email == '' || me.data.message.user.email == null || me.data.message.user.email.length != 11) {
      $yikeUtils.toast('请输入正确帐号',"../../../img/err.png");
    } else if (me.data.message.user.password == '' || me.data.message.user.password == null) {
      $yikeUtils.toast('请输入密码', "../../../img/err.png");
    } else {
      $yikeUtils.loading();
      yikeTaishan.login(me.data.message.user.email, me.data.message.user.password, me.data.message.user.op)
        .then(function (data) {
          wx.hideLoading();
          $yikeUtils.toast(data.result.result, "../../../img/err.png");
          if (data.status == 1) {
            wx.setStorageSync('alluser', {
              id: data.result.user.id,
              token: data.result.user.token
            });
            wx.setStorageSync('user', data.result.user);
            wx.setStorageSync('account', me.data.message.user);
            wx.switchTab({
              url: '../../home/home',
            })
          }
        })
        .catch((err)=>{
          wx.hideLoading();
          console.log(err);
          $yikeUtils.toast("err");
        });
    }
  },
  /**
   * 获取输入框输出的值
   */
  bindinput:function(e){
    if(e.currentTarget.dataset.id == 1){
      this.setData({
        "message.user.email":e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        "message.user.password": e.detail.value
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