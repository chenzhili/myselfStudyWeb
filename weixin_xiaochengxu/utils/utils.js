class Utils{
  constructor(){
    
  }
  /**
   * 等待圈
   */
  loading(msg,duraion,isClose){
    wx.showLoading({
      title: msg||"",
      mask:true, //为true 的话 不能进行任何其他操作
      success:function(res){
        if(isClose){
            setTimeout(()=>{
                wx.hideLoading();
        },duraion||1500);
        }
      },
      fail:function(err){
        console.log(err);
      }
    })
  }
  /**
   * 提示语句
   */
  toast(msg,url,duration){
    wx.showToast({
      title: msg,
      image:url || "../../img/err.png",
      duration: duration||1500
    })
  }
  /**
   * 选择提示
   */
  showModal(title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor){
    return new Promise(function(resolve,reject){
      wx.showModal({
        title: title,
        content: content || "",
        showCancel: showCancel || true,
        cancelText: cancelText || "取消",
        cancelColor: cancelColor || "",
        confirmText: confirmText || "确定",
        confirmColor: confirmColor || "",
        success: function (data) {
          if(data.confirm){
            resolve(data.confirm);
          }else{
            reject(data.cancel)
          }
        },
        fail: function (err) {
          console.log(err);
        }
      });
    });
  }
}
module.exports = new Utils();