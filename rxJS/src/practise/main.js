var input = document.getElementById("input");
var obserable = Rx.Observable.fromEvent(input,"keyup");
obserable.subscribe(x=>{
	console.log(x);
});