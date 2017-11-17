// pages/agency/add-link/add-new-link/add-new-link.js
let img = require("../../../../utils/img_base64");
let yikeTaishan = require("../../../../utils/request");
let $yikeUtils = require("../../../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "新增推广链接",
      isBackShow: true,
      img: "../../../../img/back.png"
    },
    message: {
      type: 0,
      typeArr: ["代理", "会员"],
      down_black: img.down_black
    },
    $scope:{
      user:"",
      addLinkMessage:{
        type: 1,
        num: "",
        ratio: "",
        alert: 0
      }
    }
  },
  /**
   * 信息更新
   */
  bindinput:function(e){
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        "$scope.addLinkMessage.num": e.detail.value
      });
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        "$scope.addLinkMessage.ratio": e.detail.value
      });
      if (this.data.$scope.user.ratio <= Number(this.data.$scope.addLinkMessage.ratio)) {
        this.setData({
          "$scope.addLinkMessage.alert":1
        });
      } else {
        this.setData({
          "$scope.addLinkMessage.alert": 0
        });
      }
    }
  },
  /**
   * 生成链接
   */
  generateLink:function(){
    let me = this;
    let reg = /^[1-9][0-9]*$/;
    if (me.data.$scope.addLinkMessage.alert == 1) {
      $yikeUtils.toast("下级代理返点不能超过账户", "../../../../img/err.png");
    } else if (!me.data.$scope.addLinkMessage.num) {
      $yikeUtils.toast("请输入使用最大次", "../../../../img/err.png");
    } else if (!reg.test(me.data.$scope.addLinkMessage.num)) {
      $yikeUtils.toast("只能为整数", "../../../../img/err.png");
    } else if (me.data.$scope.addLinkMessage.type == "1" && !me.data.$scope.addLinkMessage.ratio) {
      $yikeUtils.toast("请输入返点", "../../../../img/err.png");
    } else {
      yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
        .then(function (data) {
          if (data.status == 1) {
            $yikeUtils.loading();
            yikeTaishan.generateLink(me.data.$scope.user.token, me.data.$scope.addLinkMessage.type, me.data.$scope.addLinkMessage.num, me.data.$scope.addLinkMessage.ratio)
              .then(function (data) {
                wx.hideLoading();
                if (data.status == 1) {
                  me.setData({
                    "$scope.addLinkMessage.alert" : 0,
                    "$scope.addLinkMessage.num" : "",
                    "$scope.addLinkMessage.ratio" : ""
                  });
                  $yikeUtils.toast(data.result.result, "../../../../img/err.png");
                }
              })
              .catch(function (err) {
                $yikeUtils.toast(err, "../../../../img/err.png");
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
  selectType: function (e) {
    this.setData({
      "message.type": e.detail.value
    });
    let tempMemberType = "";
    switch (this.data.message.type) {
      case "0": tempMemberType = 1; break;
      case "1": tempMemberType = 0; break;
    }
    this.setData({
      "$scope.addLinkMessage.type": tempMemberType
    });
  }
})