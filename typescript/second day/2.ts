let arr1:Array<number> = [1,2,3];
class Student{
	className:String;
	constructor(public first,public second,public last){
		this.className = first+","+second+','+last;
	}
}
var student =new Student("t","o","m");
interface Name{
	first: String,
	last: String
}
function ff(name:Name){
	console.log(name.first,name.last);
}
ff(student);

enum Color {red=2,green=3,black=7};
let color: Color = Color.red;
console.log(color);
let anything:any;
anything=false;
let aa:String;
let bb:string;
aa="";
bb="a";
let arr:any[]=[1,2,true];
arr[1]="tom";
console.log(arr);
function infiniteLoop(): never {
    while (true) {
    }
}
function foo() {
    // okay to capture 'a'
    return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a;