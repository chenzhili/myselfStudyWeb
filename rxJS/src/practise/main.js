var input = document.getElementById("input");
var source = Rx.Observable.fromEvent(input,"keyup");
/*var subject = new Rx.Subject();
var refCounted = source.multicast(subject).refCount();*/
source
	.debounceTime(500)
	.subscribe(x=>{
	if(x.keyCode != 67 && x.keyCode != 17){
        if(x.target.value){
            console.log(x.target.value);
		}
	}
});