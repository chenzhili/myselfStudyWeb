// pages/agency/add-link/add-link.js
let yikeTaishan = require("../../../utils/request");
let $yikeUtils = require("../../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "会员链接",
      isBackShow: true,
      img: "../../../img/back.png",
      isRightTextShow:true,
      rightText:"新增推广链接"
    },
    message:{
      activeTab:1
    },
    $scope:{
      user:"",
      typeMessage:{
        content: []
      }
    }
  },
  /**
   * 获取会员的信心
   */
  _userLinksLs: function (activeTab){
    let me = this;
    if (me.data.$scope.typeMessage.content.length) {
      let tempArr = me.data.$scope.typeMessage.content;
      tempArr.lenght = 0;
      me.setData({
        "$scope.typeMessage.content":tempArr
      });
    }
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          yikeTaishan.getLinks(me.data.$scope.user.token, activeTab)
            .then(function (data) {
              if (data.status == 1) {
                if (data.result.result instanceof Array) {
                  me.setData({
                    "$scope.typeMessage.content": data.result.result
                  });
                } else {
                  $yikeUtils.toast("还未生成链接", "../../../img/err.png");
                }
              } else {
                $yikeUtils.toast("出错了", "../../../img/err.png");
              }
            })
            .catch(function (err) {
              $yikeUtils.toast(err, "../../../img/err.png");
            })
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
   * 复制链接
   */
  copyLink:function(e){
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          wx.setClipboardData({
            data: e.currentTarget.dataset.url,
            success:function(){
              $yikeUtils.toast('复制成功', "../../../img/err.png");
            }
          })
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
   * 删除链接
   */
  delLink:function(e){
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          $yikeUtils.loading();
          yikeTaishan.delLinks(me.data.$scope.user.token, e.currentTarget.dataset.id)
            .then(function (data) {
              wx.hideLoading();
              if (data.status == 1) {
                $yikeUtils.toast(data.result.result,"../../../img/err.png");
                me._userLinksLs(me.data.message.activeTab);
              }
            })
            .catch(function (err) {
              $yikeUtils.toast(err, "../../../img/err.png");
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
    this._userLinksLs(this.data.message.activeTab)
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
   * 选择不同的类型
   */
  changeTab:function(e){
    this.setData({
      "message.activeTab":e.currentTarget.id
    });
    this._userLinksLs(this.data.message.activeTab);
  },
  /**
   * 跳转新增推广链接
   */
  link:function(){
    wx.navigateTo({
      url: 'add-new-link/add-new-link',
    })
  }
})