angular.module('starter.controllers', [])

  /*自己做的滑动 验证 功能*/
.controller("UserRegisterCtrl",['$scope','$state','$ionicHistory','$ionicModal','$ionicTabsDelegate','$ionicLoading',
  function($scope,$state,$ionicHistory,$ionicModal,$ionicTabsDelegate,$ionicLoading){
  $scope.user = {
    phone: '',
    qq: '',
    name: '',
    password: '',
    passwordTwo: '',
    op: 'register',
    msg: '',
    code: ''
  };

  $scope.png = {
    state:false,
    /*验证没上的时候的 抖动效果*/
    notState:false,
    id:"",
    topPng:0, //图片离 上面的距离
    leftPng:0, //图片离 左面的距离
    i:0,  //系数
    validateVa:document.getElementsByClassName("validate_validate")[0],
    changLeft:0,
    barDom:document.getElementsByClassName("validate_bar")[0]
  };

  $scope.register = register;
  $scope.sendMsg = sendMsg;
  $scope.focus = focus;
  $scope.blur = blur;
  init();
  function init() {
    randomPNG();
  }

  //表单验证
  function formValidation() {
    console.log("hehe");
  }

  //记录原始的宽高
  /*
   序号      距离左边的距离     距离上面边的距离       原图大小         抠图的大小
   1           410                 269                 750*438          102*100
   2           527                 119
   3           164                 74
   4           626                 120

   5           344                 297                    750*438
   6           630                 304
   7           344                 254
   8           309                 40

   9           165                 274                     750*438
   10          295                 93
   12          516                 276
   13          627                 23

   14          271                 288                     760*441
   15          562                 279
   16          596                 107
   17          278                 56
   * */
  $scope.pngList ={
    1: {id: 1, left: 410, top: 269, origin_width: 750, origin_height: 438},
    2: {id: 2, left: 527, top: 119, origin_width: 750, origin_height: 438},
    3:  {id: 3, left: 164, top: 74, origin_width: 750, origin_height: 438},
    4:  {id: 4, left: 626, top: 120, origin_width: 750, origin_height: 438},

    5: {id: 5, left: 344, top: 297, origin_width: 750, origin_height: 438},
    6:  {id: 6, left: 630, top: 304, origin_width: 750, origin_height: 438},
    7:  {id: 7, left: 344, top: 254, origin_width: 750, origin_height: 438},
    8:  {id: 8, left: 309, top: 40, origin_width: 750, origin_height: 438},

    9:  {id: 9, left: 165, top: 274, origin_width: 750, origin_height: 438},
    10:  {id: 10, left: 295, top: 93, origin_width: 750, origin_height: 438},
    12:  {id: 12, left: 516, top: 269, origin_width: 750, origin_height: 438},
    13: {id: 13, left: 627, top: 23, origin_width: 750, origin_height: 438},

    14:  {id: 14, left: 271, top: 288, origin_width: 760, origin_height: 441},
    15: {id: 15, left: 562, top: 279, origin_width: 760, origin_height: 441},
    16: {id: 16, left: 596, top: 107, origin_width: 760, origin_height: 441},
    17: {id: 17, left: 278, top: 56, origin_width: 760, origin_height: 441}
  };
  function randomPNG(){
    var validateBg = document.getElementsByClassName("validate_bg")[0];
    $scope.png.id = parseInt(Math.random()*17+1);
    $scope.png.id = $scope.png.id == 11?1:$scope.png.id;
    Promise.all([judgeIMG(validateBg),judgeIMG($scope.png.validateVa)])
      .then(function(data){
        $scope.png.width = parseFloat(getComputedStyle(validateBg).width);

        // console.log($scope.png.width);
        // console.log($scope.png.id);
        $scope.png.i = $scope.png.width/$scope.pngList[$scope.png.id].origin_width;
        // console.log($scope.png.i);

        $scope.png.validateVa.style.width = $scope.png.validateVa.naturalWidth*$scope.png.i+"px";
        $scope.png.validateVa.style.height = $scope.png.validateVa.naturalHeight*$scope.png.i+"px";
        $scope.png.validateVa.style.top = $scope.pngList[$scope.png.id].top*$scope.png.i + 10 + "px";

        $scope.png.leftPng = $scope.pngList[$scope.png.id].left*$scope.png.i +10;

        // validateVa.style.left = $scope.png.leftPng + 10 + "px";

      }).catch(function(){
      console.log("未加载完成");

    });
  }

  /*对于动作的操作*/
  $scope.imgDrag = function(e){
    var el = e.target;
    // console.log(parseFloat(getComputedStyle($scope.png.barDom).width) - parseFloat(getComputedStyle(el).width));
    if(parseFloat(el.style.left) < 0){
      el.style.left = 0;
      $scope.png.validateVa.style.left = "10px";
    }else if(parseInt(el.style.left) > (parseFloat(getComputedStyle($scope.png.barDom).width) - parseFloat(getComputedStyle(el).width))){
      el.style.left = parseFloat(getComputedStyle($scope.png.barDom).width) - parseFloat(getComputedStyle(el).width) -2 + "px";
      $scope.png.validateVa.style.left = parseFloat(getComputedStyle($scope.png.barDom).width) - parseFloat(getComputedStyle(el).width)-2+10 +"px";
    }else{
      el.style.left = $scope.png.changLeft + e.gesture.deltaX + "px";
      $scope.png.validateVa.style.left = $scope.png.changLeft + e.gesture.deltaX + 10 + "px";
    }
  };
  $scope.imgTouch = function(e){
    var el = e.target;
    $scope.png.changLeft = parseFloat(getComputedStyle(el).left);

  };
  $scope.imgRelease = function(e){
    var el = e.target;
    if(parseFloat(el.style.left) < 0){
      el.style.left = 0;
      $scope.png.validateVa.style.left = "10px";
    }else if(parseInt(el.style.left) > (parseFloat(getComputedStyle($scope.png.barDom).width) - parseFloat(getComputedStyle(el).width))){
      el.style.left = parseFloat(getComputedStyle($scope.png.barDom).width) - parseFloat(getComputedStyle(el).width) -2 + "px";
      $scope.png.validateVa.style.left = parseFloat(getComputedStyle($scope.png.barDom).width) - parseFloat(getComputedStyle(el).width)-2+10 +"px";
    }else{
      el.style.left = $scope.png.changLeft + e.gesture.deltaX + "px";
      $scope.png.validateVa.style.left = $scope.png.changLeft + e.gesture.deltaX +10 + "px";
    }

    /*判断是否要 获取验证码*/
    if(parseFloat($scope.png.validateVa.style.left) <= $scope.png.leftPng+5 && parseFloat($scope.png.validateVa.style.left) >= $scope.png.leftPng-5){
      $scope.png.state = !$scope.png.state;
      console.log("发送验证码成功");
      try{
        yikeTaishan.sendMsg($scope.user.phone,$scope.user.op)
          .then(function (data) {
            console.log(data.result.result);
            if(data.status == 1){
              $scope.user.msg=data.result.msg;
              var sendMsg=document.body.querySelector('#send-msg');
              settime(sendMsg);
            }
            el.style.left = 0;
            $scope.png.validateVa.style.left = "10px";
          }).catch(function(err){
          console.log(err);
          el.style.left = 0;
          $scope.png.validateVa.style.left = "10px";
        });
      }catch(err){
        console.log(err);
      }
      randomPNG();
    }else{
      $scope.png.notState = !$scope.png.notState;
      el.style.left = 0;
      $scope.png.validateVa.style.left = "10px";
      setTimeout(function(){
        $scope.png.notState = !$scope.png.notState;
      },12)
    }
  };
  /*删除 验证*/
  $scope.validateDelete = function(){
    $scope.png.state = !$scope.png.state;
    document.getElementsByClassName("validate_circle")[0].style.left = 0;
    $scope.png.validateVa.style.left = "10px";
    randomPNG();
  };
  /*刷新重新获取*/
  $scope.validateRefresh = function(){
    randomPNG();
  };
  /*判断图片是否加载完成*/
  function judgeIMG(img){
    return new Promise(function(resolve,reject){
      img.onload = function(){
        resolve();
      };
      img.onerror = function(){
        reject();
      }
    });
  }

  //发送短信验证码
  function sendMsg() {
    if($scope.user.phone == '' || $scope.user.phone==null){
      console.log('请先输入手机号');
      return false;
    }
    $scope.png.state = !$scope.png.state;
    /*if($scope.user.phone == '' || $scope.user.phone==null){
     console.log('请先输入手机号');
     return false;
     }
     yikeTaishan.sendMsg($scope.user.phone,$scope.user.op)
     .then(function (data) {
     console.log(data.result.result);
     if(data.status == 1){
     $scope.user.msg=data.result.msg;
     var sendMsg=document.body.querySelector('#send-msg');
     settime(sendMsg);
     }
     }).catch(function(err){
     console.log(err);
     });*/
  }
  var countdown=60;
  //倒计时
  function settime(obj) {
    if (countdown == 0) {
      obj.removeAttribute("disabled");
      obj.innerHTML="获取验证码";
      countdown = 60;
      return;
    } else {
      obj.setAttribute("disabled", true);
      obj.innerHTML="重新发送(" + countdown + ")";
      countdown--;
    }
    setTimeout(function() {
        settime(obj) }
      ,1000)
  }
  //注册
  function register() {
    var suc=formValidation();
    if(suc){
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner>'
      });
      yikeTaishan.register($scope.user.phone,'',$scope.user.qq,$scope.user.name,$scope.user.password,$scope.user.op)
        .then(function (data) {
          console.log(data.result.result);
          if( data.status ==1 ){
            $state.go('login');
          }
        })
    }
  }
}])
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
  var method = function(ul){
    if($scope.n == -10){
      ul.appendChild(ul.children[0]);
      $scope.n = 10;
    }
    ul.style.top = $scope.n-10+"px";
    /*if($scope.n){
      $scope.content.push($scope.n);
      console.log($scope.content);
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
    }else{
      timeout = true;
    }*/
    $scope.n--;
  };
  time();
  function time()
  {
    var ul = document.getElementById("tab-adv");
    if(timeout) return;
    method(ul);
    $scope.timeEnd = $timeout(time,50);
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
        url: "http://192.168.1.112/yike_gentleman/app/index.php?i=1&c=entry&m=yike_ts_plan&do=image_upload",
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
.controller("datePickerCtrl",function($scope){
  $scope.onezoneDatepicker = {
    date: new Date(), // MANDATORY
    mondayFirst: false,
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    startDate:new Date(1989, 1, 26),
    endDate:new Date(2024, 1, 26),
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    callback: function(value){
        // your code
        console.log(new Date(value).getTime());
    }
};
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
  .controller("gasQueryCtrl",function($scope,$ionicLoading){
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
        url: "http://192.168.1.112/yike_gentleman/app/index.php?i=1&c=entry&m=yike_ts_plan&do=image_upload",
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
    btn.onclick = function(){
      document.getElementById("form").submit();
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

    /*修补x5内核的问题*/
    $scope.applyList = [{
      id:1,
      name:"客户改造申请"
    },
      {
        id:2,
        name:"维修"
      },
      {
        id:18,
        name:"采暖用户认定"
      }];
    var fregment = document.createDocumentFragment();
    for(var i=0;i<$scope.applyList.length;i++){
      var label = document.createElement("label");
      label.className = "item item-radio";
      label.innerHTML = '<input type="radio" name="radio-group" ng-model="applied" ng-value="item.id">'+
        '<div class="radio-content">'+
        '<div class="item-content disable-pointer-events">'+$scope.applyList[i]["name"]+'</div>'+
      '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>'+
        '</div>';
      fregment.appendChild(label);
    }
    document.getElementsByClassName("apply_x5_list")[0].appendChild(fregment);
    $scope.applied = 1;
    $scope.appliedShow = false;
    $scope.applyType = function(){
      $scope.appliedShow = !$scope.appliedShow;
    };
    $scope.appliedHide = function(item){
      $scope.appliedShow = !$scope.appliedShow;
      $scope.applied = item.id;
    };
    $scope.containerIsShow = function(){
      $scope.appliedShow = !$scope.appliedShow;
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
  })
  .controller("timeCtrl",["$scope","$timeout",function($scope,$timeout){
      $scope.timeEnd = false;
      $scope.n  = 10;
      var timeGet;
      $scope.beginTime = function(){
        $scope.timeEnd = !$scope.timeEnd;
        $timeout.cancel(timeGet);
        tiemGet = null;
        if(!$scope.timeEnd){
          time();
        }
      }
      function time(){
        if($scope.timeEnd)return;
        method();
        timeGet = $timeout(time,1000);
      }
      function method(){
          if($scope.n){
            console.log($scope.n);
          }else{
            $scope.timeEnd = true;
            $timeout.cancel(timeGet);
            tiemGet = null;
            $scope.n  = 11;
          }
          $scope.n--;
      }

      $scope.beginAni = function(){
        anim.timeF();
      }
/*动画*//*就是错的*/
    var anim = {
      step:50,
      time:500,
      state:false,
      timeGet:"",
      width:0,
      increment:0,
      ele:"",
      n:0,
      getAction:function(){
        var n = this.time/this.step;
        /*this.increment = */
        this.width = document.getElementById("wid");
        console.log(this.width);
        if(n){

        }else{
          this.state = true;
        }
        n--;
      },
      timeF:function(){
        var me = this;
        if(this.state)return;
        /*this.n = this.time/this.step;*/
        /*this.increment = */
        me.n = this.time/this.step;
        me.ele = document.getElementById("wid");
        me.width = parseFloat(getComputedStyle(this.ele).width.split("p")[0]);
        console.log(me.n);
        if(me.n){
          me.ele += 98/me.n+"%";
        }else{
          me.state = true;
        }
        me.n--;
        me.tiemGet=setTimeout(me.timeF,me.n);
      }
    }

  }]);
