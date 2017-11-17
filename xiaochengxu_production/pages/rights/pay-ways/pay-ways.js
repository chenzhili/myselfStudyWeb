// pages/rights/pay-ways/pay-ways.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "支付订单",
      isBackShow: true,
      img: "../../../img/back.png"
    },
    message:{
      type:"",
      price:"",
      selectType:1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "message.type":options.type,
      "message.price":options.price
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
   * 选择不同的类型支付
   */
  selectType:function(e){
    this.setData({
      "message.selectType": e.currentTarget.dataset.type
    });
  }
})