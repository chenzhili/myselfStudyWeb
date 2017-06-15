/*典型的单播方式，就是每个观察者都会得到一个新的观察者序列（观察者对象）*/
const obser = Rx.Observable.create(function(observer){ /*这种只是创建了一个观察者对象，并且改变其中的值，真正的执行需要通过订阅*/
    console.dir(observer);
    let n = 1;
    observer.next(n++);
    observer.next(n++);
    /*observer.complete("完成了");*/
    document.querySelector("#aa").innerHTML = "2";
    setTimeout( () =>{
        console.log("是否运行:"+4);
        observer.next(4);
        /*observer.complete();*/
    },5000);
});
let state = 1;
let subscription1 = obser.subscribe(x =>{
    console.log(x);
    if(x == 2){
        state = 0;
    }
});
if(null){
    subscription1.unsubscribe();
}
document.getElementById("btn").onclick = function(){
    console.log("点击事件发生了");
    let subscription2 = obser.subscribe({  /*里面这个属于是观察者对象，就是俗称的消费者，一般只需要第一个参数就可以了，捕获错误可以通过其他方法*/
        next:(x)=>{
            console.log(x);
        },
        err:(err)=>{console.log(err);},
        complete:()=>{console.log("完成没报错");}/*这个函数不返回任何的参数*/
    });
    /*另一种写法*/
    /*obser.subscribe(
        (x)=>{},//next
        (err)=>{},//err
        ()=>{}//complete
    );*/

    /*释放资源 ，通过unsubscribe*/
    subscription2.add(subscription1);

};
/*把其他的观察者对象添加到另一个里面，可以一起直接全部释放资源*/
let inObser1 = Rx.Observable.interval(400);
let I1 = inObser1.subscribe((x)=>{
    console.log(x);
});
let inObser2 = Rx.Observable.interval(500);
let I2 = inObser2.subscribe((x)=>{
    console.log(x);
});
I1.add(I2);
setTimeout(()=>{
    I1.unsubscribe();
},2000);
