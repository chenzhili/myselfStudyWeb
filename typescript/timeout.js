var state = false;
    var n = 10;
    var timeEnd;
    document.getElementById("aa").onclick = function(){
      console.log("开始");
      clearTimeout(timeEnd);
      state = !state;
      timeEnd = null;
      if(!state){
          n=10;
          time();
      }
    };
    function method(){
        if(n){
            console.log(n);
        }else{
            state = true;
            n = 11;
        }
        n--;
    }
    function time(){
        if(state)return;
        method();
        timeEnd=setTimeout(time,1000);
    }
    window.onload = function(){
        time();
    }