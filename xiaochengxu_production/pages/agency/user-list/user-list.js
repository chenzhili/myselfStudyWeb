// pages/agency/user-list/user-list.js
let img = require("../../../utils/img_base64");
let yikeTaishan = require("../../../utils/request");
let $yikeUtils = require("../../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "会员列表",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    message:{
      picker1:"",
      picker2:"",
      type: 0,
      typeArr: ["全部","代理","会员"],
      down_black:img.down_black
    },
    $scope:{
      user:"",
      page:1,
      member:{
        username:"",
        type:""
      },
      memberList:"",
      noMoreItemsAvailable:""
    }
  },
  /**
   * 输入框有变化
   */
  bindinput:function(e){
    this.setData({
      "$scope.member.username": e.detail.value
    });
  },
  /**
   * 查询
   */
  _query:function(e){
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          $yikeUtils.loading();
          if (e) {
            me.setData({
              "$scope.page":1
            });
          }
          yikeTaishan.queryUserList(me.data.$scope.user.token, me.data.$scope.page, me.data.$scope.member.username, me.data.$scope.member.type, new Date(me.data.message.picker1).getTime(), new Date(me.data.message.picker2).getTime())
            .then(function (data) {
              wx.hideLoading();
              if (data.status == 1) {
                let tempMemberList = me.data.$scope.memberList;
                if (me.data.$scope.page == 1) {
                  tempMemberList = [];
                  tempMemberList = data.result.result;
                } else {
                  tempMemberList = tempMemberList.concat(data.result.result)
                }
                for(var i=0;i<tempMemberList.length;i++){
                  tempMemberList[i].create_time = $yikeUtils.formatTime(tempMemberList[i].create_time, 'Y-M-D h:m:s')
                }
                me.setData({
                  "$scope.page": me.data.$scope.page+1,
                  "$scope.memberList": tempMemberList
                });
                let noMoreItemsAvailable = me.data.$scope.memberList.length >= Number(data.result.count);
                me.setData({
                  "$scope.noMoreItemsAvailable": noMoreItemsAvailable
                });
              } else {
                me.setData({
                  "$scope.noMoreItemsAvailable": true
                });
              }
            })
            .catch(function (err) {
              wx.hideLoading();
              $yikeUtils.toast(err.message);
              me.setData({
                "$scope.noMoreItemsAvailable": true
              });
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
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    let me = this;
    $yikeUtils.loading();
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          me.setData({
            "$scope.page": 1
          });
          me._query();
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
  onReachBottom: function () {
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          if (!me.data.$scope.noMoreItemsAvailable) {
            me._query();
          }
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
      "$scope.user": wx.getStorageSync("user"),
      "message.picker2": new Date().toLocaleDateString().split("/").join("-"),
      "message.picker1": new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString().split("/").join("-")
    });
    this._query();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 选择的时间发生改变
   */
  dateChange:function(e){
    let ele = e.currentTarget.id;
    if(ele == "1"){
      this.setData({
        "message.picker1":e.detail.value
      });
    }
    if (ele == "2") {
      this.setData({
        "message.picker2": e.detail.value
      });
    }
  },
  /**
   * 选择添加的类型
   */
  selectType: function (e) {
    this.setData({
      "message.type": e.detail.value
    });
    let tempMemberType = "";
    switch (this.data.message.type){
      case "0": tempMemberType = "";break;
      case "1": tempMemberType = 1;break;
      case "2": tempMemberType = 0;break;
    }
    this.setData({
      "$scope.member.type":tempMemberType
    });
  }
})