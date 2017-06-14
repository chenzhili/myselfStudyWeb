const obser = Rx.Observable.create(function(observer){
    console.dir(observer);
    observer.next(1);
    observer.next(2);
    observer.complete();
    setTimeout( () =>{
        console.log("是否运行:"+4);
        observer.next(4);
        observer.complete();
    },1000);
});
obser.subscribe(x =>{
    console.log(x);
});