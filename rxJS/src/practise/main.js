/*对于canvas中的用法*/
var canvas = document.createElement("canvas");
canvas.width = 100;
canvas.height = 100;
var img = new Image();
img.crossOrigin = "anonymous";
img.src = "http://137.59.23.98:12000/img/login/01.png";
var ctx = canvas.getContext("2d");
ctx.drawImage(img,0,0);
var data = canvas.toDataURL();
console.log(data);

function saveImageToPhone(url, success, error) {
    var canvas, context, imageDataUrl, imageData;
    var img = new Image();
    img.crossOrigin = "anonymous";
    try {
        img.src = url;
    }
    catch (e) {
        error(e.message);
    }
    img.onload = function () {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        try {
            imageDataUrl = canvas.toDataURL();
            console.log(imageDataUrl);
            imageData = canvas.toDataURL().replace(/data:image\/png;base64,/, '');
            cordova.exec(
                success,
                error,
                'Canvas2ImagePlugin',
                'saveImageDataToLibrary',
                [imageData]
            );
        }
        catch (e) {
            error(e.message);
        }
    };
    try {
        img.src = url;
    }
    catch (e) {
        error(e.message);
    }
}
var htmlContent;
window.onload = function(){
	init();
    var input = document.getElementById("input");
    var source = Rx.Observable.fromEvent(input,"keyup");
	/*var subject = new Rx.Subject();
    var refCounted = source.multicast(subject).refCount();*/
    source
        .debounceTime(500)
        .subscribe(x=>{
            if(x.keyCode != 67 && x.keyCode != 17){
                let jsonContent = document.getElementById("content");
                let current = "";
                if(x.target.value){
                    var regExp = new RegExp(x.target.value);
                    console.log(regExp);
                    for(let item in htmlContent){
                        /*console.log(regExp.test(htmlContent[item]));*/
                    	if(regExp.test(htmlContent[item])){
                            current += `<li>${htmlContent[item]}</li>`;
						}
					}
					console.log(current);
                    jsonContent.innerHTML = current;
                }else{
                    for(var key in htmlContent){
                        current += `<li>${htmlContent[key]}</li>`
                    }
                    jsonContent.innerHTML = current;
				}
            }
        });
};
/*页面初始化*/
function init(){
    var domJson = "";
    var jsonContent = document.getElementById("content");
    var xhr = XHR();
    xhr.open("get","data.json",true);
    xhr.send(null);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            htmlContent = JSON.parse(xhr.responseText);
            for(var key in htmlContent){
                domJson += `<li>${htmlContent[key]}</li>`
            }
            jsonContent.innerHTML = domJson;
        }
    };
}
function XHR() {
		var xhr;
		try {xhr = new XMLHttpRequest();}
		catch(e) {
			var IEXHRVers =["Msxml3.XMLHTTP","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
			for (var i=0,len=IEXHRVers.length;i< len;i++) {
				try {xhr = new ActiveXObject(IEXHRVers[i]);}
				catch(e) {continue;}
			}
		}
		return xhr;
}