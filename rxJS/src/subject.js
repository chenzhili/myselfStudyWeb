/**
 * Created by YK on 2017/6/15.
 */
/*同一个观察对象可以多播给多个观察者进行操作*/
//1、最简单的多播
/*
const subject = new Rx.Subject();
let sup1 = subject.subscribe(x=>{
    console.log(x);
});
let sup2 = subject.subscribe(x=>{
    console.log(x);
});
let n = 1;
subject.next(n++);
subject.next(n++);*/
//2、通过一些操作
/*
* 1、这个多了一步，不是通过订阅后就直接输出执行观察者的操作，通过connect方法来决定何时分享观察的对象
* */
/*const source = Rx.Observable.from([1,2,3]);
const subject2 = new Rx.Subject();
let multicasted = source.multicast(subject2); //multicast返回一个ConnectableObservable，它只是一个具有connect（）方法的Observable。
multicasted.subscribe(x=>{console.log(x);});
multicasted.subscribe(x=>{console.log(x);});
multicasted.connect();//用于分享*/



let observe = Rx.Observable.interval(500);
let sub = new Rx.Subject();
let mul = observe.multicast(sub);
mul.subscribe(x=>{
	console.log(x);
});
/*mul.connect();*/