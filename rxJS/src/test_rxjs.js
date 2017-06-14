const obser = Rx.Observable.create(function(observer){
    console.dir(observer);
    observer.next(1);
    observer.next(2);

});
obser.subscribe();
console.dir(Rx.Observable);