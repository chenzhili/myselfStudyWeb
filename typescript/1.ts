function greeter(person:string){
	return person;
}
document.body.innerHTML = greeter("hello world");
interface User {
	name: string;
	age: number;
}
function age(user:User){
	console.log(user);
}
age({age:1,name:"age"});

class Student{
	fullName:string;
	constructor(public first,public middle,public last){
		this.fullName = first+""+middle+last;
	}
}
var stu = new Student("this","is","cat");
console.log(stu);
let name:string = "tom";
var sentence = `this.a guys and ${name}`;
console.log(sentence);
var arr:number[] = ["a",1,2];