// pages/home/home.js

let request = require("../../utils/request");
let utils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[
      {id:1,name:"手工镶钻黑色凉拖",price:1003.00,img:"../../img/goods/1.jpg"},
      { id: 2, name: "手工镶钻棕色凉拖", price: 998, img: "../../img/goods/2.jpg" },
      { id: 3, name: "手工镶钻褐色凉拖", price: 558, img: "../../img/goods/3.jpg" },
      { id: 4, name: "黄麻布镶钻棕色凉拖", price: 360, img: "../../img/goods/4.jpg" },
      { id: 5, name: "手工坠饰水晶凉拖", price: 10000, img: "../../img/goods/5.jpg" }
    ],
    typesList:[
      { id: 1, name: "衣服", img: "../../img/types/1.webp" },
      { id: 2, name: "女鞋", img: "../../img/types/2.webp" },
      { id: 3, name: "男鞋", img: "../../img/types/3.webp" },
      { id: 4, name: "旅行箱", img: "../../img/types/4.webp" }
    ],
    headerData:{
      title:"这是底部home页"
    },
    footerData:{
      title:"这是底部home页"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.route)
    console.log(request.getUser().then(function(data){
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    }));
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
   * 设置头部标题
   */
  setHeaderTitle:function(){
    // let title = "设置的home";
    // this.setData({
    //   headerData:{title:title}
    // });
    utils.showModal("是否登录")
      .then((data)=>{
        utils.toast(String(data));
      }).catch((err)=>{
        utils.toast(String(err))
      });
  }
})