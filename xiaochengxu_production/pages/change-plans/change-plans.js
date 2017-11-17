// pages/change-plans/change-plans.js
let yikeTaishan = require("../../utils/request");
let $yikeUtils = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerData: {
      title: "更改计划",
      isBackShow: true
    },
    $scope:{
      user:"",
      collect:"",
      allplans:"",
      id:"",
      index:""
    }
  },
  /**
   * 获取我的收藏
   */
  _myCollect:function(){
    let me = this;
    $yikeUtils.loading();
    yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          yikeTaishan.myCollect('my_collection', 'pk10', me.data.$scope.user.id)
            .then(function (data) {
              wx.hideLoading();
              if (data.status == 1) {
                me.setData({
                  "$scope.collect": data.result.collection
                });
                /*让被收藏的id变颜色*/
                me._activePlans();
                
              } else {
                me.setData({
                  "$scope.collect": []
                });
                $yikeUtils.toast(data.result.collection);
              }
            })
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
   * 所有计划
   */
  _pkScheme:function() {
    $yikeUtils.loading();
    let me = this;
    yikeTaishan.pkScheme(me.data.$scope.user.token)
      .then(function (data) {
        wx.hideLoading();
        me.setData({
          "$scope.allplans": data.result.plan
        });
      })
  },
  /**
   * 购买提示引导
   */
  /*封装一下购买授权引导提示*/
  _buyNotes:function(userStatus, notes){
    if(userStatus == 0) {
      $yikeUtils.showModal("提示", notes,true,"知道了","去购买")
        .then((data) => {
          wx.navigateTo({
            url: '../rights/pay-rights/pay-rights',
          })
        });
    }
  },
  /**
   * 删除收藏id, index
   */
  deleteCollect:function(e) {
    let me = this;
    me.setData({
      "$scope.id":e.currentTarget.dataset.id,
      "$scope.index":e.currentTarget.dataset.index
    });
    if(Number(me.data.$scope.user.is_tourists)) {
      $yikeUtils.showModal("游客模式", "想更改收藏，请先登录")
        .then((data) => {
          wx.removeStorageSync("user");
          wx.redirectTo({
            url: '../login-register/login/login',
          })
        });
      return;
    }
    if (me.data.$scope.user.status == 1 || me.data.$scope.user.status == 2) {
      yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
      .then(function (data) {
        if (data.status == 1) {
          $yikeUtils.loading();
          yikeTaishan.deleteCollect('delete', 'pk10', me.data.$scope.id)
            .then(function (data) {
              wx.hideLoading();
              if (data.status == 1) {
                let tempCollect = me.data.$scope.collect;
                tempCollect.splice(me.data.$scope.index, 1);
                me.setData({
                  "$scope.collect":tempCollect
                });
              }
              me._myCollect();
              $yikeUtils.toast(data.result.result);
            })
        } else {
          $yikeUtils.showModal("提示", data.result.result).then(function () {
            wx.removeStorageSync('user');
            wx.redirectTo({
              url: '../login-register/login/login',
            })
          });
        }
      });
    }else{
      /*购买授权引导*/
      me._buyNotes(me.data.$scope.user.status, "购买授权之后才能更改计划");
    }
  },
  /**
   * 选择的计划成激活状态
   */
  _activePlans:function(){
    let me = this;
    let tempAllplans = me.data.$scope.allplans;
    if(me.data.$scope.allplans) {
      for (var s = 0; s < me.data.$scope.allplans.length; s++) {
        for (var l = 0; l < me.data.$scope.allplans[s].row.length; l++) {
          tempAllplans[s].row[l].active = 0;
        }
      }
      me.setData({
        "$scope.allplans": tempAllplans
      });
      for (var i = 0, l1 = me.data.$scope.collect.length; i < l1; i++) {
        for (var x = 0, l2 = me.data.$scope.allplans.length; x < l2; x++) {
          for (var y = 0, l3 = me.data.$scope.allplans[x].row.length; y < l3; y++) {
            if (me.data.$scope.collect[i].plan_id == me.data.$scope.allplans[x].row[y].id) {
              tempAllplans[x].row[y].active = 1;
              
            }
          }
        }
      }
      me.setData({
        "$scope.allplans": tempAllplans
      });
    }
  },
  /**
   * 添加收藏
   */
  addcollect:function(e) {
    let me = this;
    me.setData({
      "$scope.id": e.currentTarget.dataset.id
    });
    if(Number(me.data.$scope.user.is_tourists)) {
      $yikeUtils.showModal("游客模式", "想更改收藏，请先登录")
        .then((data) => {
          wx.removeStorageSync("user");
          wx.redirectTo({
            url: '../login-register/login/login',
          })
        });
      return;
    }
    if (me.data.$scope.user.status == 1 || me.data.$scope.user.status == 2) {
      yikeTaishan.expire(me.data.$scope.user.id, me.data.$scope.user.token)
        .then(function (data) {
          if (data.status == 1) {
            $yikeUtils.loading();
            yikeTaishan.collect('add', '2', me.data.$scope.id, me.data.$scope.user.id)
              .then(function (data) {
                wx.hideLoading();
                // if (data.status == 1) {
                //   $scope.isShow = false;
                // }
                me._myCollect();
                $yikeUtils.toast(data.result.result);
              })
          } else {
            $yikeUtils.showModal("提示", data.result.result).then(function () {
              wx.removeStorageSync('user');
              wx.redirectTo({
                url: '../login-register/login/login',
              })
            });
          }
        });
    }else{
      /*为付费的用户进行引导提示*/
      me._buyNotes(me.data.$scope.user.status,"购买授权之后才能更改计划");
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
    this._myCollect();
    this._pkScheme();
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