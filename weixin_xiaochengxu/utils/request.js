/**
 * 接口请求
 */
let url = "http://pk10.dev.yike1908.com/app/index.php?version=1.0";
let id = "1";

let request = (function(url,id) {
  class Request{
    constructor(url,id){
      this.url = url;
      this.id = id;
    }
    _query(data){
      let me = this;
      return new Promise(function(resolve,reject){
        wx.request({
          url: me.url,
          data: data,
          method: "get",
          dataType: "json",
          success:function(res){
            resolve(res.data);
          },
          fail:function(err){
            reject(err);
          }
        });
      });
    }
    getUser(data){
      return this._query(data);
    }
  }
  return new Request(url,id);
})(url,id);
module.exports = request;