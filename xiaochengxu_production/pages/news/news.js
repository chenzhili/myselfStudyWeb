// pages/news/news.js
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "中级玩家宝典秘籍",
      isBackShow: true
    },
    page:{
      selectTab:1
    },
    $scope:{
      data:"",
      datas:"",
      user:""
    }
  },
  /**
   * 信息初始化页面
   */
  _init(){
    let me = this;
    $yikeUtils.loading();
    /*彩市新闻数据*/
    yikeTaishan.news()
      .then(function (data) {
        wx.hideLoading();
        if(data.status == 1){
          me.setData({
            "$scope.data": data.result.result
          });
        }
      });
    //技术技巧
    yikeTaishan.workmanship()
      .then(function (data) {
        wx.hideLoading();
        if(data.status == 1){
          me.setData({
            "$scope.datas": data.result.result
          });
        }
      });
  },
  /**
   * 到详情页面
   */
  godetails:function(e){
    let me = this;
    if (me.data.$scope.user.status == 0) {
      $yikeUtils.toast('未购买授权用户不能进行操作',"../../../img/err.png");
      return false;
    } else {
      wx.navigateTo({
        url: `details/details?id=${e.currentTarget.dataset.id}`,
      })
    }
  },
  /**
   * 更多
   */
  gomore:function(e){
    wx.navigateTo({
      url: `more/more?id=${e.currentTarget.dataset.id}`,
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
  
  },
  /**
   * 选择不同的tab
   */
  selectTab:function(e){
    this.setData({
      "page.selectTab": e.target.dataset.select
    });
  }
})