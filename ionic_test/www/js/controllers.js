angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$timeout,$ionicScrollDelegate) {
  $(document).ready(function(){
    var friend={
      firstName: 'Good',
      'lastName': 'Man',
      'address': undefined,
      'phone': ["1234567",undefined],
      'fullName': function(){
        return this.firstName + ' ' + this.lastName;
      }
    };
  });
  $scope.cancelTime = function(){
    $timeout.cancel($scope.timeEnd);
  };
  $scope.content = [111];
  $scope.n=10;
  /*//倒计时时间
        $scope.timeState = 1;
        $scope.startTime = 60;
        function timeMethod(startTime){
          console.log(startTime);
          if(!startTime){
            $scope.timeState = 0;
          }
          $scope.startTime--;
        }
        function daoTime(){
          if(!$scope.timeState){
            return;
          }
          timeMethod($scope.startTime);
          setTimeout(daoTime,1000);
        }*/

  var timeout = false; //启动及关闭按钮
  var method = function(){
    if($scope.n){
      $scope.content.push($scope.n);
      console.log($scope.content);
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
    }else{
      timeout = true;
    }
    $scope.n--;
  };
  time();
  function time()
  {
    if(timeout) return;
    method();
    $scope.timeEnd = $timeout(time,300);
  }
  /*var  abc=setInterval(method,300);
  if(n >= 41){
    clearInterval(abc);
  }*/
})
  .controller('openUserCtrl', function($scope,$ionicLoading,$location,$timeout) {
    console.log($location.path());
    $scope.openContent = {
      userNum:[
        {id:1},{id:2},{id:3}
      ],
      type:[
        {name:"商用",value:"1"},{name:"私用",value:"2"}
      ]
    };
    $scope.testaa = function(){
      console.log(1);
      $("#homeProperty").on('change',function () {

      });
    };
    $scope.userMessage={
      propertyUser:"",
      userTel:"",
      userAddress:"",
      userNum:$scope.openContent.userNum[0].id,
      userType:$scope.openContent.type[0].value,
      homeProperty:"",
      businessLicence:"",
      useGas:"",
      propertyOwner1:"",
      propertyOwner2:"",
      propertyOwner3:"",
      propertyOwner4:"",
      propertyOwner5:"",
      propertyOwner6:""
    };
    function toast(message){
      $ionicLoading.show({template:message,duration:100000000000000000});
    }
    $scope.timeout = false;
    $scope.n = 3;
    function method(){
      if($scope.n != 0){
        console.log($scope.n);
      }else{
        $scope.timeout = true;
        $scope.n = 4;
        $ionicLoading.hide();
      }
      $scope.n--;
    };
    function time()
    {
      if($scope.timeout) return;
      method($scope.n);
      $timeout(time,1000);
    }
    $scope.submitData = function(){
      console.log($scope.n);
      $scope.timeout = false;
      time();
      /*console.log($scope.userMessage.userNum);
      console.log($scope.userMessage.userType);*/
      if(!$scope.userMessage.propertyUser){
        toast("请输入房屋产权人");
      }else if(!$scope.userMessage.userTel || $scope.userMessage.userTel.length != 11 ){
        toast("请输入正确的手机号");
      }else if(!$scope.userMessage.userAddress){
        toast("请输入开户地址");
      }else if(!fileHomeProper){
        toast("房屋产权证图片不能为空");
      }else if($scope.userMessage.userType == 1){
        if(!fileBusinessLicence){
          toast("营业执照图不能为空");
        }
        if(!fileUseGas){
          toast("用气图不能为空");
        }
      }else if($scope.userMessage.userNum >= 1){
        if(!filePropertyOwner1 || !filePropertyOwner2){
          toast("请正确上传两张图片");
        }
      }else if($scope.userMessage.userNum >= 2){
        if(!filePropertyOwner3 || !filePropertyOwner4){
          toast("请正确上传两张图片");
        }
      }else if($scope.userMessage.userNum >= 3){
        if(!filePropertyOwner5 || !filePropertyOwner6){
          toast("请正确上传两张图片");
        }
      }else{
        imgSub(formData);
      }
    };
    $scope.changeNum = function(num){
      $scope.userMessage.userNum = num;
    };
    $scope.changeType = function(type){
      $scope.userMessage.userType = type;
    };
    var formData = new FormData();
    var fileHomeProper,fileBusinessLicence,fileUseGas,
      filePropertyOwner1,filePropertyOwner2,filePropertyOwner3,filePropertyOwner4,filePropertyOwner5,filePropertyOwner6;/*上传的文件*/
    var homeProper = document.getElementById("homeProperty");
    var businessLicence = document.getElementById("businessLicence");
    var useGas = document.getElementById("userGas");
    var propertyOwner1 = document.getElementById("propertyOwner1");
    var propertyOwner2 = document.getElementById("propertyOwner2");
    var propertyOwner3 = document.getElementById("propertyOwner3");
    var propertyOwner4 = document.getElementById("propertyOwner4");
    var propertyOwner5 = document.getElementById("propertyOwner5");
    var propertyOwner6 = document.getElementById("propertyOwner6");
    propertyOwner1.addEventListener("change",function(){
      $scope.userMessage.propertyOwner1 = URL.createObjectURL(propertyOwner1.files[0]);
      filePropertyOwner1 = propertyOwner1.files[0];
      $scope.$digest();
    });
    propertyOwner2.addEventListener("change",function(){
      $scope.userMessage.propertyOwner2 = URL.createObjectURL(propertyOwner2.files[0]);
      filePropertyOwner2 = propertyOwner2.files[0];
      $scope.$digest();
    });
    propertyOwner3.addEventListener("change",function(){
      $scope.userMessage.propertyOwner3 = URL.createObjectURL(propertyOwner3.files[0]);
      filePropertyOwner3 = propertyOwner1.files[0];
      $scope.$digest();
    });
    propertyOwner4.addEventListener("change",function(){
      $scope.userMessage.propertyOwner4 = URL.createObjectURL(propertyOwner4.files[0]);
      filePropertyOwner4 = propertyOwner4.files[0];
      $scope.$digest();
    });
    propertyOwner5.addEventListener("change",function(){
      $scope.userMessage.propertyOwner5 = URL.createObjectURL(propertyOwner5.files[0]);
      filePropertyOwner5 = propertyOwner5.files[0];
      $scope.$digest();
    });
    propertyOwner6.addEventListener("change",function(){
      $scope.userMessage.propertyOwner6 = URL.createObjectURL(propertyOwner6.files[0]);
      filePropertyOwner6 = propertyOwner6.files[0];
      $scope.$digest();
    });

    useGas.addEventListener("change",function(){
      $scope.userMessage.useGas = URL.createObjectURL(useGas.files[0]);
      fileUseGas = useGas.files[0];
      $scope.$digest();
    });
    homeProper.addEventListener("change",function(){
      $scope.userMessage.homeProperty = URL.createObjectURL(homeProper.files[0]);
      fileHomeProper = homeProper.files[0];
      $scope.$digest();
    });
    businessLicence.addEventListener("change",function(){
      $scope.userMessage.businessLicence = URL.createObjectURL(businessLicence.files[0]);
      fileBusinessLicence = businessLicence.files[0];
      $scope.$digest();
    });

    /*先建一个function*/
    function imgSub(data){
      /*上传的名字自己指定*/
      formData.append("propertyUser",$scope.userMessage.propertyUser);
      formData.append("tel",$scope.userMessage.userTel);
      formData.append("userAddress",$scope.userMessage.userAddress);
      formData.append("filePropertyOwner1",filePropertyOwner1);
      formData.append("filePropertyOwner2",filePropertyOwner2);
      formData.append("fileHomeProper",fileHomeProper);
      if($scope.userMessage.userType == 1){
        formData.append("fileBusinessLicence",fileBusinessLicence);
        formData.append("fileUseGas",fileUseGas);
      }
      if($scope.userMessage.userNum >= 2){
        formData.append("filePropertyOwner3",filePropertyOwner3);
        formData.append("filePropertyOwner4",filePropertyOwner4);
        if($scope.userMessage.userNum == 3){
          formData.append("filePropertyOwner5",filePropertyOwner5);
          formData.append("filePropertyOwner6",filePropertyOwner6);
        }
      }
      $.ajax({
        url: "http://www.yike1908.com/app/index.php?i=52&c=entry&m=yike_gas&do=application&op=application",
        type:"post",
        data:data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
          var Data = JSON.parse(data);
          if(Data){
            if(Data.status == 1){
              toast(Data.result["data"]);
            }else{
              toast(Data.result["data"]);
            }
          }else{
            toast("申请失败，请重新尝试");
          }
        },
        error: function (err) {
          toast("申请失败，请重新尝试");
        }
      })
    }

  })

.controller('ChatsCtrl', function($scope,$ionicLoading) {
  $scope.userMessage={
    userName:"",
    userTel:"",
    userAddress:"",
    userHome:"",
    homeData:"",
    userId:"",
    idData:"",
    userGas:"",
    gasData:""
  };

  /*先建一个function*/
  function imgSub(data){
    $.ajax({
      url: "http://www.yike1908.com/app/index.php?i=52&c=entry&m=yike_gas&do=application&op=application",
      type:"post",
      data:data,
      cache: false,
      processData: false,
      contentType: false,
      success: function (data) {
        var Data = JSON.parse(data);
        if(Data){
          if(Data.status == 1){
            toast(Data.result["data"]);
          }else{
            toast(Data.result["data"]);
          }
        }else{
          toast("申请失败，请重新尝试");
        }
    },
    error: function (err) {
      toast("申请失败，请重新尝试");
    }
  })
  }

  var userHome = document.getElementsByClassName("userHome")[0];
  var userId = document.getElementsByClassName("userId")[0];
  var userGas = document.getElementsByClassName("userGas")[0];
  var formData = new FormData();
  var file1,file2,file3;
  userHome.addEventListener("change",function(){
    $scope.userMessage.userHome = URL.createObjectURL(userHome.files[0]);
    file1 = userHome.files[0];
    $scope.$digest();
  });
  userId.addEventListener("change",function(){
    $scope.userMessage.userId = URL.createObjectURL(userId.files[0]);
    file2 = userId.files[0];
    $scope.$digest();
  });
  userGas.addEventListener("change",function(){
    $scope.userMessage.userGas = URL.createObjectURL(userGas.files[0]);
    file3 = userGas.files[0];
    $scope.$digest();
  });
  function toast(message){
    $ionicLoading.show({template:message,duration:1000});
  }
  $scope.submitData = function(){
    if(!$scope.userMessage.userName){
      toast("请输入姓名");
    }else if(!$scope.userMessage.userTel || $scope.userMessage.userTel.length != 11 ){
      toast("请输入正确的手机号");
    }else if(!$scope.userMessage.userAddress){
      toast("请输入地址");
    }else if(!file1){
      toast("产权证图片不能为空");
    }else if(!file2){
      toast("身份证不能为空");
    }else if(!file3){
      toast("用气不能为空");
    }else{
      formData.append("deed",file1);
      formData.append("name",$scope.userMessage.userName);
      formData.append("phone",$scope.userMessage.userTel);
      formData.append("address",$scope.userMessage.userAddress);
      formData.append("card",file2);
      formData.append("gas",file3);
      imgSub(formData);
    }
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($rootScope,$scope) {
  /*判断图片加载的问题，如果没有加载成功可以通过onerror事件来监听*/
 /* document.getElementsByClassName("tryOn")[0].onload=function(e){
    e.stopPropagation();
    console.log(e);
    console.log(1);
  };
  setInterval(function(){
    console.log(document.getElementsByClassName("tryOn")[0].complete);
  },1000);*/

  /*promise方法*/
  /*const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
  var image = new Image();
  image.onload = resolve;
  image.onerror = reject;
  image.src = path;
  });
  };*/
  
  $rootScope.disState = 1;
})
.controller("swipCtrl",function($scope){
  var swiperExample = new Swiper(".swiper-container",{
    direction:"vertical",
    loop:true,
    pagination:".swiper-pagination",
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
      swiperAnimateCache(swiper); //隐藏动画元素
      swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper){
      swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }
  });

  console.log(a);
  fun();
  var a =1;
  function fun(){
    console.log("函数体提前没");
  }
  var fun = 1;
  console.log(fun);
})
  .controller("gasQueryCtrl",function($scope){
    /*初始化*/
    function init(){

    }
    $scope.userContent = ["刘思思思思","留","哎"];
    $scope.userMessage = {
      tel:"",
      gasQuery:"",
      name:""
    };

    var gasQuery = document.getElementsByClassName("gasQuery")[0];
    var formData = new FormData();
    gasQuery.addEventListener("change",function(){
      $scope.userMessage.gasQuery = URL.createObjectURL(gasQuery.files[0]);
      console.log(gasQuery.files[0]);
      $scope.$digest();
    });
    function toast(message){
      $ionicLoading.show({template:message,duration:1000});
    }
    $scope.gasQuery = function(){
      if(!$scope.userMessage.name){
        toast("用户名不能为空")
      }else if(!$scope.userMessage.tel || $scope.userMessage.tel.length != 11 ){
        toast("请输入正确的手机号");
      }else if(!$scope.userMessage.gasQuery){
        toast("请上传图片");
      }else{
        formData.append("name",$scope.userMessage.name);
        formData.append("tel",$scope.userMessage.tel);
        formData.append("gasQuery",$scope.userMessage.gasQuery);
      }
      $.ajax({
        url: "http://www.yike1908.com/app/index.php?i=52&c=entry&m=yike_gas&do=application&op=application",
        type:"post",
        data:formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
          var Data = JSON.parse(data);
          if(Data){

          }else{
            toast("申请失败，请重新尝试");
          }
        },
        error: function (err) {
          toast("申请失败，请重新尝试");
        }
      })
    }
  })
  .controller("applyB1Ctrl",function($scope,Service){
    $scope.data={
      address:[
        {type:"用户输入",id:1},{type:"系统地址",id:2}
      ],
      tel:[
        {name:"用户输入",id:1},{name:"系统地址",id:2}
      ]
    };
    $scope.userMessage = {
      add:$scope.data.address[0].id,
      realAdd:"",
      tel:$scope.data.address[0].id,
      realTe:"",
      type:"改管申请",
      applyContent:[]   /*最后提交的时候转成字符串*/
    };
    $scope.setAddress = function(adds){
      $scope.userMessage.add = adds;
      if(adds == 2){
        $scope.userMessage.realAdd = "后台获取";
      }else{
        $scope.userMessage.realAdd = "";
      }
    };
    $scope.selTel = function(tel){
      $scope.userMessage.tel = tel;
      if(tel == 2){
        $scope.userMessage.realTe = "后台获取";
      }else{
        $scope.userMessage.realTe = "";
      }
    };
    $scope.content=["实例内容1","实例内容2","实例内容3"];
    $scope.contentClick = function(data){
      console.log(data);
      console.log(this.state);
      if(this.state){
        $scope.userMessage.applyContent.push(data);
        console.log($scope.userMessage.applyContent);
      }else{
        for(var i=0;i<$scope.userMessage.applyContent.length;i++){
          if($scope.userMessage.applyContent[i] == data){
            $scope.userMessage.applyContent.splice(i,1);
            i--;
          }
        }
        console.log($scope.userMessage.applyContent);
      }
    };
    /*封装一个判断申请的方法*/
    function judgeType(){
      return location.href.split("#")[1].slice(1);
    }
  })
  .controller("account2Ctrl",function($scope){
    $scope.state = 0;
    $scope.csClick = function(){
      if($scope.state == 0){
        $scope.state = 1;
      }else{
        $scope.state = 0;
      }
    }
  });
