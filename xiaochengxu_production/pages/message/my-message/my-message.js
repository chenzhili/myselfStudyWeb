// pages/message/my-message/my-message.js
let $yikeUtils = require("../../../utils/utils");
let yikeTaishan = require("../../../utils/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "我的消息",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    $scope:{
      page:1,
      messageTitleList:[],
      is_loadMore:false,
      user:""
    }
  },
  /**
   * 获取消息信息
   */
  _loadMoreTmeplate:function(){
    let me = this;
    yikeTaishan.myMessageAndDetail("show", me.data.$scope.page)
      .then(function (res) {
        if (res.status == 1) {
          for (var i = 0; i < res.result.result.length; i++) {
            res.result.result[i].creation_time = $yikeUtils.formatTime(Number(res.result.result[i].creation_time), 'Y.M.D h:m:s');
          }
          if (me.data.$scope.page == 1) {
            me.setData({
              "$scope.messageTitleList": res.result.result
            });
          } else {
            let tempArr = me.data.$scope.messageTitleList;
            tempArr = tempArr.concat(res.result.result);
            me.setData({
              "$scope.messageTitleList": tempArr
            });
          }
        }
        let loadMore = me.data.$scope.messageTitleList.length >= res.result.count;
        if (res.status == -1) {
          loadMore = true;
        }
        me.setData({
          "$scope.is_loadMore":loadMore,
          "$scope.page":me.data.$scope.page+1
        });
      });
  },
  /**
   * 跳转到详情
   */
  toDetails:function(e){
    wx.navigateTo({
      url: `../my-message-detail/my-message-detail?id=${e.currentTarget.dataset.id}`,
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
      "$scope.user": wx.getStorageSync("user")
    });
    this._loadMoreTmeplate();
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
    let me = this;
    $yikeUtils.loading();
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        if (data.status == 1) {
          me.setData({
            "$scope.page": 1
          });
          me._loadMoreTmeplate();
          wx.stopPullDownRefresh();
        } else {
          wx.stopPullDownRefresh();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let me = this;
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          if (!me.data.$scope.is_loadMore) {
            me._loadMoreTmeplate();
          }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})