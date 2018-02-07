/* let arr= new Array(3).fill(4);
console.log(arr);
for(let i of arr){
	console.log(i);
}; */

var arr = [2,4,1,4,12,23,5312,321,15532,2,5];
console.log(arr.sort((a,b)=>b-a));
for(var i=0;i<arr.length;i++){
	for(var y=i+1;y<arr.length;y++){
		if(arr[i]<arr[y]){
			[arr[i],arr[y]]=[arr[y],arr[i]];
		}
	}
}
console.log(arr);
let a = Symbol("a");
let b = Symbol.for("a");
let c = Symbol.for("a");
console.log(a === b);
console.log(b === c);