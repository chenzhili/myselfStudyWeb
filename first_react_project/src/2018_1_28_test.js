import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// function Fun(props){
//     return (
//         <h1>{props.name}</h1>
//     );
// }
/*class Fun extends React.Component{
    render(){
        return (
            <h1>{this.props.name}</h1>
        );
    }
}
Fun.propTypes = {
    name:PropTypes.number.isRequired
}
Fun.defaultProps = {
    name:3
}
let a = "aa";
ReactDOM.render(
    <Fun name={a}/>,
    document.getElementById("root")
);*/

// 对于 ref 的用处
//  为 DOM 元素添加 ref
/*
class ChildInput extends React.Component{
    constructor(){
        super();
        this.handleFocus = this.handleFocus.bind(this);
    }
    componentDidMount(){
        console.log(this.el);
    }
    // handleFocus = ()=>{
    //     this.el.focus();
    // }
    handleFocus(){
        this.el.focus();
    }
    render(){
        return (
            <div>
                <input type="text" ref={el=>this.el=el}/>
                <button onClick={this.handleFocus}>让上面获取焦点</button>
            </div>
        );
    }
}
ReactDOM.render(
<ChildInput/>,
document.getElementById("root"));
*/
// 为 类组件 添加 ref
// ******这种方法仅对 class 声明的 CustomTextInput 有效,但是，你可以在函数式组件内部使用 ref，只要它指向一个 DOM 元素或者 class 组件
class Child extends React.Component {
    handleFocus = () => {
        this.el.focus();
    }
    render() {
        return (
            <input ref={el => this.el = el} type="text" />
        );
    }
}
function ChildFun(prps){
    return (
        <input type="text"/>
    );
}
class Parent extends React.Component {
    componentDidMount() {
        console.log(this.resFun);
        this.res.handleFocus();
    }
    render() {
        return (
            <div>
                <Child ref={res => this.res = res} />
            {/* <ChildFun ref={res =>this.resFun = res} /> */}
            </div>
        );
    }
}
// ReactDOM.render(
//     <Parent />,
//     document.getElementById("root")
// );

// 对父组件 暴露 DOM 节点
class ChildDOM extends React.Component{
    render(){
        return(
            <input ref={this.props.dom}/>
        );
    }
}
class ParetnDOM extends React.Component{
    componentDidMount(){
        console.log(this.childEle); 
        // this.childEle.value = "a";
        this.childEle.focus();
    }
    render(){
        return (
            <ChildDOM dom={el=>{this.childEle=el;}}/>
        );
    }
}
/* ReactDOM.render(
    <ParetnDOM/>,
    document.getElementById("root")
); */
class Form extends React.Component{
    constructor(){
        super();
        this.state = {
            username:"",
            checkbox:false,
            select:1
        }
    }
    handleChange = (name,a,e)=>{
        
        this.setState({
            [name] :name=="checkbox"?e.target.checked:e.target.value 
        });
        console.log(this.state[name]);
        console.log(a);
    }
    render(){
        return (
            <form>
                <label htmlFor="username">
                    <input name="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this,"username","a")} id="username"/>
                </label>
                <br/>
                <label htmlFor="checkbox">
                    是或者否
                    <input name="checkbox"  checked={this.state.checkbox} onChange={this.handleChange.bind(this,"checkbox","b")}type="checkbox" id="checkbox"/>
                </label>
                <br/>
                <label htmlFor="select">
                    <select value={this.state.select} onChange={this.handleChange.bind(this,"select","c")} name="select">
                        <option value="1">女</option>
                        <option value="0">男</option>
                    </select>
                </label>
                <br/>
                <button>提交</button>
            </form>
        );
    }
}
/* ReactDOM.render(
    <Form/>,
    document.getElementById("root")
); */
class FormControl extends React.Component{
    constructor(){
        super();
        this.state = {
            value:"aaa"
        }
    }
    handle = (e)=>{
        
       this.setState({
           value:e.target.value
       });
        console.log(e.target.value);
    }
    render(){
        return(
            <input type="text" value={this.state.value} onChange={this.handle}/>
        );
    }
}
/* ReactDOM.render(
    <FormControl/>,
    document.getElementById("root")
); */
class FormUncontrol extends React.Component{
    handle = ()=>{
        console.log(this.el.checked);
    }
    render(){
        return(
            <input type="checkbox" onChange={this.handle} defaultChecked="true" ref={el=>this.el=el}/>
        )
    }
}
ReactDOM.render(
    <FormUncontrol/>,
    document.getElementById("root")
);