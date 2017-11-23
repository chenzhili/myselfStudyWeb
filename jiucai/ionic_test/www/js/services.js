angular.module('starter.services', [])

  .factory('Service', function($http,$rootScope) {
    var baseUrl = "http://www.yike1908.com/app/index.php";
    var params = {
      yike:'app',
      i:$rootScope.i,
      c:'entry',
      do:'agent',
      m:'yike_gas',
      method:'GetGasFee',
      userCode:'',
      compId:'',
      url:'http://125.70.229.175:7002/qjyj/qbsinterface.do'
    };
    return {
      getCompId:function(){
        return $http.get('http://www.yike1908.com/app/index.php', {params:{i:$rootScope.i,c:'entry',do:'compid',m:'yike_gas',yike:'app'}});
      },
      userSearch: function(data) {
        params.method = data.method;//'GetGasFee';
        params.userCode = data.userCode;
        params.compId = data.compId;
        return $http.get(baseUrl, {params:params});
      },
      getUserInfo:function(data){
        var param = {
          i:$rootScope.i,
          c:'entry',
          do:'agent',
          m:'yike_gas',
          yike:'app',
          url:'http://125.70.229.175:7002/qjyj/qbsinterface.do'
        };
        param.method = 'GetCustomer';
        param.userCode = data.userCode;
        param.compId = data.compId;
        return $http.get(baseUrl, {params:param});
      },
      getUserList:function(data){
        return $http.get(baseUrl+'?do=binding&op=list&i='+$rootScope.i+'&c=entry&m=yike_gas&yike=app&token='+token);
      },
      deleteUser:function(id){
        return $http.get(baseUrl+'?do=binding&op=delete&i='+$rootScope.i+'&c=entry&m=yike_gas&yike=app&id='+id);
      },
      userBind:function(data){
        return $http({url:baseUrl+'?do=binding&op=submit&i='+$rootScope.i+'&c=entry&m=yike_gas&yike=app',method:'post',data:data});
      },
      gasQuery:function(data){
        params.userCode = data.userCode;
        params.compId = data.compId;
        params.method = 'GetMrData';
        return $http.get(baseUrl, {params:params});
      },
      getComp:function(type){
        var params = {
          i:$rootScope.i,
          c:'entry',
          m:'yike_gas',
          do:'apply',
          op:'list',
          type:type
        }
        return $http.get(baseUrl, {params:params});
      },
      submitApply:function(data){
        return $http({url:baseUrl+'?do=apply&op=submit&i='+$rootScope.i+'&c=entry&m=yike_gas',method:'post',data:data});
      },
      submitSub:function(data){
        return $http({url:baseUrl+'?do=comp_sub&op=submit&i='+$rootScope.i+'&c=entry&m=yike_gas',method:'post',data:data});
      }
    };
  });
