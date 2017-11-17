// pages/news/more/more.js
let yikeTaishan = require("../../../utils/request");
let $yikeUtils = require("../../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "更多",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    $scope:{
      id:"",
      word:""
    }
  },
  /**
   * 信息初始化
   */
  _init:function(){
    let me = this;
    $yikeUtils.loading();
    yikeTaishan.more(me.data.$scope.id)
      .then(function (data) {
        wx.hideLoading();
        me.setData({
          "$scope.word": data.result.result
        });
      })
  },
  /**
   * 去详情页面
   */
  todetail:function(e){
    wx.navigateTo({
      url: `../details/details?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "$scope.id":options.id
    });
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
  
  }
})