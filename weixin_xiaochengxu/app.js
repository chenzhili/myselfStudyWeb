//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function () {
    wx.getSetting({
      success:function(res){
        // console.log(res);
      }
    });
    // wx.openSetting({
    //   success:function(res){
    //     console.log(res);
    //   },
    //   fail:function(err){
    //     console.log(err);
    //   },
    //   complete:function(data){
    //     console.log(data)
    //   }
    // });
    wx.authorize({
      scope:"scope.invoiceTitle",
      success:function(res){
        // console.log(res);
      },
      fail:function(err){
        console.log(err);
      }
    });
    wx.getUserInfo({
      success:function(res){
        // console.log(res);
      },
      fail:function(err){
        console.log(err);
      }
    });
    // let promise = new Promise(function(resolve,reject){
    //   wx.showModal({
    //     title: '账户授权',
    //     content: '登录',
    //     success: function (options) {
    //       if (options.confirm) {
    //         resolve(1);
    //         // console.log(1);
    //         // wx.login({
    //         //   success:function(res){
    //         //     console.log(res);
    //         //   }
    //         // });
    //       }
    //     },
    //     fail: function (err) {
    //       reject(2);
    //     }
    //   })
    // });
    // promise.then((data)=>{
    //   console.log(data);
    // }).catch((err)=>{
    //   console.log(err);
    // });
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
  
})