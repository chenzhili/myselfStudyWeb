var div = document.querySelectorAll(".div")[0];
console.log(div);
/*获取盒子左上角距离可视区域的距离*/
var boxClineX = div.getBoundingClientRect();
/*console.log(boxClineX);*/
// 距离left 
console.log(boxClineX.left); //是指当前盒子的左上角 对应页面的位置，可能有负数，随着页面的滚动而改变
// 距离top
console.log(boxClineX.top); //是指当前盒子的左上角 对应页面的位置，可能有负数，随着页面的滚动而改变
console.log("offsetTop"+div.offsetTop); //这个是指页面上对应盒子 对应页面的位置，这个是固定的 值

// offsetWidth 和 offsetHeight
console.log(div.offsetWidth); //值盒模型的尺寸 (width+border + padding)
console.log(div.offsetLeft);
console.log(getComputedStyle(div).width);
console.log("scrollHeight"+div.scrollHeight);


/*对于事件发生时，对应的鼠标指针的位置*/
div.onclick = function(e){
	console.log(e.clientY);
	/*鼠标相对于*****浏览器窗口** 是指随着窗口的改变而改变*** 发生滚动的相同的位置值也不同***可视区域的X，Y坐标（窗口坐标）
	，可视区域不包括工具栏和滚动条。*/
	console.log(e.pageY);
	/*使用的是****文档*** 当发生滚动的时候，相对的位置是没变的**坐标而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。*/
	console.log(e.screenY);	
	/*距离显示屏的距离*/
}