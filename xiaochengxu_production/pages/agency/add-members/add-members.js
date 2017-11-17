// pages/agency/add-members/add-members.js
let img = require("../../../utils/img_base64");
let yikeTaishan = require("../../../utils/request");
let $yikeUtils = require("../../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "新增会员",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    message:{
      type:0,
      typeArr: ["代理", "会员"],
      down_black: img.down_black
    },
    $scope:{
      user:"",
      newMember:{
        typeName: "1",
        username: "",
        pwd: "",
        ratio: "",
        alert: 0
      }
    }
  },
  /**
   * 信息更新
   */
  bindinput:function(e){
    if (e.currentTarget.dataset.id == 1){
      this.setData({
        "$scope.newMember.username":e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        "$scope.newMember.pwd": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 3) {
      this.setData({
        "$scope.newMember.ratio": e.detail.value
      });
      if (this.data.$scope.user.ratio <= Number(this.data.$scope.newMember.ratio)) {
        this.setData({
          "$scope.newMember.alert":1
        });
      } else {
        this.setData({
          "$scope.newMember.alert": 0
        });
      }
    }
  },
  /**
   * 添加会员或者代理
   */
  addMembers:function(){
    let me = this;
    if (me.data.$scope.newMember.alert == 1) {
      $yikeUtils.toast("下级代理返点不能超过账户","../../../img/err.png");
    } else if (!me.data.$scope.newMember.username || me.data.$scope.newMember.username.length != 11) {
      $yikeUtils.toast("请输入正确的手机号", "../../../img/err.png");
    } else if (!me.data.$scope.newMember.pwd) {
      $yikeUtils.toast("请输入密码", "../../../img/err.png");
    } else if (String(me.data.$scope.newMember.pwd).length < 6) {
      $yikeUtils.toast("密码长度至少为6位", "../../../img/err.png");
    } else if (me.data.$scope.newMember.typeName == "1" && !me.data.$scope.newMember.ratio) {
      $yikeUtils.toast("请输入返点", "../../../img/err.png");
    } else {
      yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
        .then(function (data) {
          if (data.status == 1) {
            $yikeUtils.loading();
            yikeTaishan.addMembers(me.data.$scope.newMember.username, me.data.$scope.newMember.pwd, me.data.$scope.user.token, me.data.$scope.newMember.typeName, me.data.$scope.newMember.ratio)
              .then(function (data) {
                wx.hideLoading();
                if (data.status == 1) {
                  $yikeUtils.toast(data.result.result, "../../../img/err.png");
                  me.setData({
                    "$scope.newMember.username":"",
                    "$scope.newMember.pwd" : "",
                    "$scope.newMember.ratio" : "",
                    "$scope.newMember.alert" : 0
                  });
                } else {
                  $yikeUtils.toast(data.result.result, "../../../img/err.png");
                }
              })
              .catch(function (err) {
                wx.hideLoading();
                $yikeUtils.toast(err,"../../../img/err.png");
              });
          } else {
            $yikeUtils.showModal("提示", data.result.result).then(function () {
              wx.removeStorageSync('user');
              wx.redirectTo({
                url: '../../login-register/login/login',
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
  
  },
  /**
   * 选择添加的类型
   */
  selectType:function(e){
    this.setData({
      "message.type":e.detail.value
    });
    let tempMemberType = "";
    switch (this.data.message.type) {
      case "0": tempMemberType = 1; break;
      case "1": tempMemberType = 0; break;
    }
    this.setData({
      "$scope.newMember.typeName": tempMemberType
    });
  }
})