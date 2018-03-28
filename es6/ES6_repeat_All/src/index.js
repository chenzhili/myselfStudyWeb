/* let arr= new Array(3).fill(4);
console.log(arr);
for(let i of arr){
	console.log(i);
}; */
// 去重和 symbol的用法
/* var arr = [2,4,1,4,12,23,5312,321,15532,2,5];
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
console.log(b === c); */


//简单实现 react.js 的 设计思想
class Componet{
	setState(state={}){
		const odEl = this.el;
		// this.state = state;
		console.log(this.state.num);
		this._renderDOM();
		console.log(odEl);
		console.log(this.el);
		if (this.onStateChange) this.onStateChange(odEl, this.el)
	}
	_createDOm(stringDom){
		const div = document.createElement("div");
		div.className = "item";
		div.innerHTML = stringDom;
		return div;
	}
	_renderDOM(){
		this.el = this._createDOm(this.render());
		console.log(this.el);
		if(this.clickAdd){
			this.el.addEventListener("click",this.clickAdd.bind(this),false);
		}
		return this.el;
	}
}
class Title extends Componet{
	static Mount(DOM,selector){
		selector.appendChild(DOM);
	}
	constructor(props){
		super();
		this.props = props;
		this.state = {
			num:1
		}
	}
	onStateChange(oldEl, newEl){
		document.getElementById("root").insertBefore(newEl, oldEl)
		document.getElementById("root").removeChild(oldEl)
    }
	clickAdd(){
		console.log(this.state);
		this.state.num++;
		this.setState();
	}
	render(){
		return `<div>${this.props.name} ${this.state.num}</div>`
	}
}
const test = new Title({name:"赞"});
Title.Mount(test._renderDOM(),document.getElementById("root"));
