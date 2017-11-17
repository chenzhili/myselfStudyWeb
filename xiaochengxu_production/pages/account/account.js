let img = require("../../utils/img_base64");
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:{
      "account_bg": img.account_bg
    },
    message:{
      userData:""
    },
    $scope:{
      user:""
    }
  },
  /**
   * 选择图片上传
   */
  chooseImage:function(){
    let me = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://jihua.yike1908.com/app/index.php?i=1&c=entry&m=yike_ts_plan&do=image_upload',
          filePath: tempFilePaths[0],
          name: 'imgs',
          success: function (res) {
            let tempUser = me.data.$scope.user;
            res.data = JSON.parse(res.data);
            if(res.data.status){
              tempUser.image = res.data.result.image;
            }
            me.setData({
              "$scope.user":tempUser
            });
            $yikeUtils.toast("上传成功");
          },
          fail:function(err){
            console.log(err);
          }
        })
      }
    })
  },
  /**
   * 验证当前会员是不是代理
   */
  linkAgency:function(){
    if (Number(this.data.$scope.user.is_agency)) {
      wx.navigateTo({
        url: '../agency/agency-center',
      })
    } else {
      $yikeUtils.showModal("提示", "申请代理请联系客服", true, "知道了", "","客服")
        .then((data) => {
          console.log("联系客服");
        });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      "$scope.user": wx.getStorageSync("user")
    });
    // wx.getUserInfo({
    //   success: res => {
    //     this.setData({
    //       "message.userData": res.userInfo
    //     })
    //   }
    // })
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
   * 我的消息
   */
  myMessage:function(){
    wx.navigateTo({
      url: '../message/my-message/my-message',
    })
  },
  /**
   * 是否退出登录
   */
  isOutLogin:function(){
    $yikeUtils.showModal("退出登录","确认要退出登录?")
      .then((data)=>{
        wx.removeStorageSync("user");
         wx.redirectTo({
           url: '../login-register/login/login',
         })
      })
      .catch((err)=>{
        console.log(err);
      });
  }
})