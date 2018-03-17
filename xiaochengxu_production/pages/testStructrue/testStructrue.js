// pages/testStructrue/testStructrue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{
      name:"curry",
      age:45,
      arr: ["全能", "很强势","很牛掰"]
    },
    time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(new Date("2018-3-17"));
    console.log(new Date("2018-3-17").getTime());
    console.log(new Date("2018/3/17"));
    console.log(new Date("2018/3/17").getTime());
    console.log(new Date("2018/03/21 14:12:10"));
    console.log(new Date("2018/03/21 14:12:10").getTime());
    let me = this;
    this.data.time = setTimeout(()=>{
      let tempObj = {};
      tempObj["obj.name"] = "改变了";
      tempObj["obj.arr[0]"] = "试一哈";
      // me.setData(tempObj);
      let tempArr = me.data.obj.arr;
      tempArr.push("新填一个");
      me.setData({
        "obj.name":"这样也行",
        "obj.arr":tempArr
      });
    },1000);
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