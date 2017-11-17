/**
 * 接口请求
 */
let id = "1";
let url = `https://fir.yike1908.com/app/index.php?version=1.0&i=${id}&c=entry&m=yike_ts_plan`;

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
          method: "GET",
          dataType:"json",
          success(res){
            res = res.data.replace(/\(([\w\W]+)\)/g, function (a, b, c) {
              return b;
            });
            resolve(JSON.parse(res));
          },
          fail(err){
            reject(err);
          }
        });
      });
    }
    /**
     * 注册
     * @param phone
     * @param mac
     * @param qq
     * @param nickname
     * @param password
     * @returns {*|AV.Promise}
     */
    register(phone, mac, qq, nickname, password, tourists, code, password1){
      return this._query({
        do: 'register',
        phone: phone,
        mac: mac,
        qq: qq,
        nickname: nickname,
        password: password,
        tourists: tourists,
        code: code,
        password1: password1
      });
    }
    /**
     * 发送手机验证码
     * @param phone
     * @param op
     * @returns {*|AV.Promise}
     */
    sendMsg(phone, op){
        return this._query({
          do: 'sendmsg',
          op: op,
          phone: phone
        });
    }
      /**
       * 确认邮箱验证完成
       * @param uid
       * @returns {*|AV.Promise}
       */
      confirmEmail(uid){
          return this._query({
              do:'confirm',
              op:'ok',
              uid:uid
          });
      }
      /**
       * 登录
       * @param email
       * @param password
       * @param op
       * @returns {*|AV.Promise}
       */
      login(email,password,op){
          return this._query({
              do:'login',
              op:op,
              email:email,
              password:password
          });
      }
      /**
       * 双面长龙
       * @returns {*|AV.Promise}
       */
      long(){
          return this._query({
              do:"ranking",
              op:"pk10"
          });
      }
      /**
       * 获取账户是否到期
       * @param uid
       * @param token
       * @returns {*|AV.Promise}
       */
      expire(uid,token){
          return this._query({
              do:'user',
              uid:uid,
              token:token
          });
      }
      /**
       * 首页banner
       * @returns {*|AV.Promise}
       */
      banner(){
          return this._query({
            do: 'banner'
          });
      }
      /**
       * 历史开奖
       * @param op
       * @param page
       * @returns {*|AV.Promise}
       */
      lottery(op,page){
          return this._query({
              do:'lottery',
              op:op,
              page:page
          });
      }
      /**
       * 开奖走势
       * @param op
       * @param ob
       * @param num
       * @returns {*|AV.Promise}
       */
      movements(op,ob,num){
          return this._query({
              do:'trend',
              op:op,
              ob:ob,
              num:num
          });
      }
      /**
       * 重庆时时彩方案列表
       * @returns {*|AV.Promise}
       */
      sscScheme(){
          return this._query({
              do:'plan',
              op:'list'
          });
      }
      /**
       * pk10方案列表
       * @returns {*|AV.Promise}
       */
      pkScheme(token){
          return this._query({
              do:'pk10_plan',
              op:'list',
              token:token
          });
      }
      /**
       * 重庆时时彩方案详情
       * @param plan_id
       * @returns {*|AV.Promise}
       */
      schemeDetails(plan_id){
          return this._query({
              do:'plan',
              op:'detail',
              plan_id:plan_id
          });
      }
      /**
       * pk10方案详情
       * @param plan_id
       * @returns {*|AV.Promise}
       */
      pkDetails(plan_id,token,num,code,rate_high,rate_low,no_num_high,no_num_low,ok_num_high,ok_num_low,current_high,current_low){
          return this._query({
              do:'pk10_plan',
              op:'detail',
              num:num || 3,
              code:code || 5,
              plan_id:plan_id,
              token:token,
              rate_high:rate_high || "",
              rate_low:rate_low || "",
              no_num_high:no_num_high || "",
              no_num_low:no_num_low || "",
              ok_num_high:ok_num_high || "",
              ok_num_low:ok_num_low || "",
              current_high:current_high || "",
              current_low:current_low || ""
          });
      }
      /**
       * 获取代理用户信息
       * @param token
       * @returns {*|AV.Promise}
       */
      agencyMessage(token){
          return this._query({
              do:"agency",
              op:"index",
              token:token
          });
      }
      /**
       * 查询会员和代理列表
       * @param token
       * @param page
       * @param phone
       * @param type
       * @param time
       * @param time1
       * @returns {*|AV.Promise}
       */
      queryUserList(token,page,phone,type,time,time1){
          return this._query({
              do:"agency",
              op:"list",
              token:token,
              page:page,
              phone:phone,
              type:type,
              time:time,
              time1:time1
          });
      }
      /**
       *代理和会员链接列表
       * @param token
       * @param type
       * @returns {*|AV.Promise}
       */
      getLinks(token,type){
          return this._query({
              do:"agency",
              op:"linksd",
              token:token,
              type:type
          });
      }
      /**
       * 删除链接
       * @param token
       * @param type
       * @returns {*|AV.Promise}
       */
      delLinks(token,id){
          return this._query({
              do:"agency",
              op:"linksdelect",
              token:token,
              id:id
          });
      }
      /**
       * 获取会员详情
       * @param token
       * @param id
       * @returns {*|AV.Promise}
       */
      userListDetails(token,id){
          return this._query({
              do:"agency",
              op:"view",
              token:token,
              id:id
          });
      }
      /**
       * 生成注册链接
       * @param token
       * @param type
       * @param num
       * @param ratio
       * @returns {*|AV.Promise}
       */
      generateLink(token,type,num,ratio){
          return this._query({
              do:"agency",
              op:"links",
              token:token,
              type:type,
              num:num,
              ratio:ratio
          });
      }
      /**
       * 收藏方案
       * @param ob
       * @param op
       * @param plan_id
       * @param uid
       * @returns {*|AV.Promise}
       */
      collect(op,ob,plan_id,uid){
          return this._query({
              do:'collection',
              op:op,
              ob:ob,
              plan_id:plan_id,
              uid:uid
          });
      }
      /**
       * 我收藏的方案
       * @param op
       * @param ob
       * @param uid
       * @returns {*|AV.Promise}
       */
      myCollect(op,ob,uid){
          return this._query({
              do:'collection',
              op:op,
              ob:ob,
              uid:uid
          });
      }
      /**
       * 删除我的收藏
       * @param op
       * @param ob
       * @param id
       * @returns {*|AV.Promise}
       */
      deleteCollect(op,ob,id){
          return this._query({
              do:'collection',
              op:op,
              ob:ob,
              id:id
          });
      }
      /**
       * 获取消息列表和详情
       * @param type
       * @param page
       * @param id
       * @returns {*|AV.Promise}
       */
      myMessageAndDetail(type,page,id){
          return this._query({
              do:"inform",
              op:"pk10",
              type:type,
              page:page,
              id:id
          });
      }
      /**
       * 修改密码
       * @param op
       * @param phone
       * @param password
       * @param new_password
       * @param token
       * @returns {*|AV.Promise}
       */
      modificationPassword(op,phone,new_password,password,token){
          return this._query({
              do:'reset',
              op:op,
              phone:phone,
              new_password:new_password,
              password:password,
              token:token
          });
      }
      /**
       * 新增会员或者代理
       * @param phone
       * @param password
       * @param token
       * @param type
       * @param ratio
       * @returns {*|AV.Promise}
       */
      addMembers(phone,password,token,type,ratio){
          return this._query({
              do:'agency',
              op:"add_agency",
              phone:phone,
              password :password,
              password1:password,
              token:token,
              type:type,
              ratio:ratio
          });
      }
      /**
       * 公告列表
       * @returns {*|AV.Promise}
       */
      notice(){
          return this._query({
              do:'notice'
          });
      }
      /**
       * 首页公告列表
       * @returns {*|AV.Promise}
       */
      homeNotice(){
          return this._query({
              do:'inform',
              op:"pk101",
              type:"show",
              page:1
          });
      }
      /**
       * 个人中心
       * @param uid
       * @param op
       * @returns {*|AV.Promise}
       */
      personalCenter(op,uid){
          return this._query({
              do:'personal_center',
              op:op,
              uid:uid
          });
      }
      /**
       * 充值
       * @param phone
       * @param password
       * @param token
       * @returns {*|AV.Promise}
       */
      recharge(phone,password,token){
          return this._query({
              do:'recharge',
              phone:phone,
              password:password,
              token:token
          });
      }
      /***
       * 退出登录
       * @param uid
       * @returns {*|AV.Promise}
       */
      logout(uid){
          return this._query({
              do:'login_out',
              uid:uid
          });
      }
      /**
       * 绑定手机号
       * @param phone
       * @param token
       * @returns {*|AV.Promise}
       */
      bindPhone(phone,token){
          return this._query({
              do:'binding',
              phone:phone,
              token:token
          });
      }
      //咨询秘籍 >彩票新闻
      news(){
          return this._query({
              do:'info',
              op:'index',
              type:1
          });
      }
      //咨询秘籍 >技术技巧
      workmanship(){
          return this._query({
              do:'info',
              op:'index',
              type:2
          });
      }
      //更多
      more(id){
          return this._query({
              do:'info',
              op:'more',
              classify_id:id
          });
      }
      //详情
      details(id){
          return this._query({
              do:'info',
              op:'details',
              id:id
          });
      }
      /**
       * 是否显示充值按钮
       * @returns {*|AV.Promise}
       */
      isShowRecharge(){
          return this._query({
              do:'open'
          });
      }
      /**
       * 支付接口
       * @returns {*|AV.Promise}
       */
      payPorts(id){
          return this._query({
              do:'req',
              package_id:id
          });
      }
      /**
       * 套餐接口
       //  *{*|AV.Promise
     */
      setWays(){
          return this._query({
              do:'package',
              op:'index'
          });
      }
      //选择充值方式充值
      choseChargeWay(payway,id,token){
          return this._query({
              do:'package',
              op:'recharge',
              pay:payway,
              id:id,
              token:token
          });
      }
      // 微信支付
      weixinpay(){
          return this._query({
              do:'pay'
          });
      }
      // 意见反馈提交
      feedback(content,from){
          return this._query({
              op:'add',
              do:'addmsg',
              content:content,
              from:from
          });
      }
      // 计划详情搜索
      search(plan_id,num,code,rate_high,rate_low,no_num_high,no_num_low,ok_num_high,ok_num_low,current_high,current_low,token){
          return this._query({
              op:'detail',
              do:'pk10_plan',
              m:'yike_ts_plan',
              plan_id:plan_id,
              num:num,
              code:code,
              rate_high:rate_high,
              rate_low:rate_low,
              no_num_high:no_num_high,
              no_num_low:no_num_low,
              ok_num_high:ok_num_high,
              ok_num_low:ok_num_low,
              current_high:current_high,
              current_low:current_low,
              token:token
          });
      } 

  
  
  }
  return new Request(url,id);
})(url,id);
module.exports = request;