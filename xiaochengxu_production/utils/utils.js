class Utils{
  constructor(){
    
  }
  /**
   * 等待圈
   */
  loading(msg, duraion, isClose) {
    wx.showLoading({
      title: msg || "",
      mask: true, //为true 的话 不能进行任何其他操作
      success: function (res) {
        if (isClose) {
          setTimeout(() => {
            wx.hideLoading();
          }, duraion || 1500);
        }
      },
      fail: function (err) {
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
        confirmColor: confirmColor || "#387ef5",
        success: function (data) {
          if(data.confirm){
            resolve(data.confirm);
          }else{
            reject(false)
          }
        },
        fail: function (err) {
          console.log(err);
        }
      });
    });
  }
  /**
   * 格式化时间
   */
_formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
formatTime(number, format) {

  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];

  let date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(this._formatNumber(date.getMonth() + 1));
  returnArr.push(this._formatNumber(date.getDate()));

  returnArr.push(this._formatNumber(date.getHours()));
  returnArr.push(this._formatNumber(date.getMinutes()));
  returnArr.push(this._formatNumber(date.getSeconds()));
  for (let i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}  
}
module.exports = new Utils();