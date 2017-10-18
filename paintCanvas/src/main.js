/**
 * Created by YK on 2017/8/10.
 */
var Paint = (function(){
    function Paint(canvasWidth,canvasHeight,bg,parentDom,img){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.bg = bg;
        this.parentDom = parentDom;
        this.img = img;
        this.eidtDom = '<div class="tools-bg">'+
            '<h1>画笔颜色</h1>'+
            '<div class="bg-details clearfix">'+
            '</div>'+
            '<h1>画笔宽度</h1>'+
            '<div class="width-details clearfix">'+
            '</div>'+
            '<h1>橡皮擦</h1>'+
            '<div class="clearfix white">'+
            '</div>'+
            '</div>'+
            '<div class="btn">确定</div>';
    }
    Paint.prototype.generateCanvasAndEdit = function(){
        var canvas = document.createElement("canvas");
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        var documentFragmentParent = document.createDocumentFragment();
        documentFragmentParent.appendChild(canvas);
        var div = document.createElement("div");
        div.setAttribute("class","tools-content");
        div.innerHTML = this.eidtDom;
        documentFragmentParent.appendChild(div);
        this.parentDom.appendChild(documentFragmentParent);
        /*画笔颜色*/
            /*橡皮擦*/
        var whiteJson = ["w1","w2","w4","w6","w8"];
        var whiteDetails = document.getElementsByClassName("white")[0];
        var whiteStr = "";
        for(var whi=0;whi<whiteJson.length;whi++){
            whiteStr += '<div class="fl width-item"><div class="'+whiteJson[whi]+'"></div></div>'
        }
        whiteDetails.innerHTML = whiteStr;
            /*存储颜色*/
        var bgJson = ["b000","bFCC02E","bF67C01","bE64A19","b8E24AA"];
        var bgDetails = document.getElementsByClassName("bg-details")[0];
        var bgStr = "";
        for(var bi=0;bi<bgJson.length;bi++){
            bgStr += '<div class="fl bg-item '+bgJson[bi]+'"></div>';
        }
        bgDetails.innerHTML = bgStr;
        /*画笔的宽度*/
            /*存储宽度*/
        var wJson = ["w1","w2","w4","w6","w8"];
        var wDetails = document.getElementsByClassName("width-details")[0];
        var wStr = "";
        for(var wi=0;wi<wJson.length;wi++){
            wStr += '<div class="fl width-item"><div class="'+wJson[wi]+'"></div></div>'
        }
        wDetails.innerHTML = wStr;
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.fillStyle = this.bg;
        ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);
        var img1 = new Image();
        img1.src = this.img;
        /*/!*保留this*!/
        var me = this;*/
        img1.onload = function(){
            ctx.drawImage(img1,0,0,img1.width,img1.height,0,0,this.canvasWidth,this.canvasHeight);
        }.bind(this);
        this.action(canvas,ctx);
        changeColor(ctx);
        changeWidth(ctx);
        offPaint(ctx,this.bg);
        keepImage(canvas);
    };
    Paint.prototype.action = function(canvas,ctx){
        canvas.addEventListener("touchstart",function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            ctx.beginPath();
            ctx.moveTo(x,y);
            e.preventDefault();
        });
        canvas.addEventListener("touchmove",function(e){
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            ctx.stroke();
            ctx.lineTo(x,y);
            e.preventDefault();
        });
        canvas.addEventListener("touchend",function(e){
            ctx.closePath();
            e.preventDefault();
        });
    };
    /*画笔颜色的改变*/
    function changeColor(ctx){
        var targetDom = document.getElementsByClassName("bg-details")[0];
        targetDom.addEventListener("click",function(e){
            var targetClass = e.target.className;
            var itemReg = /bg-item/g;
            if(itemReg.test(targetClass)){
                var rgb = targetClass.split(" ")[2].slice(1);
                ctx.strokeStyle = "#"+rgb;
                var wItems = document.querySelectorAll(".width-details .width-item>div");
                for(var bi=0,bl=wItems.length;bi<bl;bi++){
                    wItems[bi].style.backgroundColor = "#"+rgb;
                }
            }
            e.stopPropagation();
        });
    }
    /*画笔的宽度改变*/
    function changeWidth(ctx){
        var targetDom = document.getElementsByClassName("width-details")[0];
        if(targetDom){
            targetDom.addEventListener("click",function(e){
                var targetClass = e.target.className;
                var itemReg = /w[0-9]+/;
                if(itemReg.test(targetClass)){
                    var wid = targetClass.slice(1);
                    ctx.lineWidth = wid;
                }
            });
        }
    }
    /*橡皮擦的用法*/
    function offPaint(ctx,bg){
        var targetDom = document.getElementsByClassName("white")[0];
        if(targetDom){
            targetDom.addEventListener("click",function(e){
                var targetClass = e.target.className;
                var itemReg = /w[0-9]+/;
                if(itemReg.test(targetClass)){
                    var wid = targetClass.slice(1);
                    ctx.lineWidth = wid;
                    ctx.strokeStyle = bg;
                }
                e.stopPropagation();
            })
        }
    }
    /*保存图片*/
    function keepImage(canvas){
        var targetDom = document.getElementsByClassName("btn")[0];
        if(targetDom){
            targetDom.addEventListener("click",function(e){
                var img = new Image();
                img.src = canvas.toDataURL("image/png");
                document.body.appendChild(img);
                e.stopPropagation();
            })
        }
    }
    return Paint;
})();
function paintText(text,background,color){
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 30;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#6364C6";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "normal 16px arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("联系客服",18,20);
    return canvas.toDataURL("image/png");
}
window.onload = function(){
    // var paiting = new Paint(window.innerWidth,window.innerWidth,"#fff",document.getElementById("box"),"img/img/bg-1.jpg");
    // paiting.generateCanvasAndEdit();
    // var imgData=paintText();
    // var type = 'png';

    /*生成base64位的图片*/
    function generateImg(img,w,h){
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.src = img;
        image.onload = function(){
            ctx.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.height);
            var base = canvas.toDataURL("image/png");
            console.log(base);
        }
    }
    generateImg("img/img/down.webp","754","424");

    /*下面是可以下载图片的方法*/
    /**
     * 获取mimeType
     * @param  {String} type the old mime-type
     * @return the new mime-type
     */
    var _fixType = function(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    };

// 加工image data，替换mime type
    imgData = imgData.replace(_fixType(type),'image/octet-stream');
    /**
     * 在本地进行文件保存
     * @param  {String} data     要保存到本地的图片数据
     * @param  {String} filename 文件名
     */
    var saveFile = function(data, filename){
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    };

// 下载后的问题名
    var filename = 'majia' + (new Date()).getTime() + '.' + type;
// download
    saveFile(imgData,filename);
};