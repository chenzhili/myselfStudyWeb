import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./2018_1_26_test.js"

/*class Square extends React.Component {
    render(){
        return (
            <button className="square" onClick={()=>{this.props.Click()}}>
                {this.props.value}
            </button>
        )
    }
}*/
// 上面的简单写法
function Square(props){  //这里的参数是 props
    return (
        <button className="square" onClick={props.Click}> {/*!//这种写法就传不了值进来*/} 
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            Click={()=>{this.props.click(i)}}
        />;
    }

    render() {
        /*const status = `Next player: ${this.state.xIsNext?"X":"O"}`;*/
        // const status = "Next player: "+(this.state.xIsNext?"X":"O");

        return (
            <div>
                {/*<div className="status">{2}</div>*/}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function NumList(props){
    let tempList = props.list;
    let tempJsxList = tempList.map((n)=>{
            return (
                <li key={n.toString()}>
                    {n}
                </li>
            )
    });
    return (
        <ul>
            {tempJsxList}
        </ul>
    )
}

class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            squares:new Array(9).fill(null),
            xIsNext:true,
        };
        this.num = 1;
        this.tryClick = this.tryClick.bind(this);
    }
    /*生命周期*/
    //当组件输出到 DOM 后
    componentDidMount() {
        let me = this;
        (function ex(){
            if(me.num==10)return;
            (()=>{
                console.log(me.num);
                me.num++;
            })();
            me.timeStart = setTimeout(ex,1000);
        })();
        /*this.timeStart = setInterval(()=>{
            console.log(this.num++);
        },1000)*/
    }
    componentWillUnmount(){
        // clearInterval(this.timeStart);
        clearTimeout(this.timeStart);
    }

    handleClick(i){
        const squares = this.state.squares.slice(); /*浅拷贝*/
        squares[i] =this.state.xIsNext? 'X':'O';
        this.setState({squares: squares,xIsNext:!this.state.xIsNext});
    }

    tryClick(i,e,ev){
        console.log(i);
        console.log(e);
        console.log(ev);
        console.log("this: "+this);
    }
    render() {
        const status = "Next player: "+(this.state.xIsNext?"X":"O");
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.squares} click={(i)=>{this.handleClick(i)}} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                {/*<div onClick={this.tryClick.bind(this,1,2)}>try event happening</div>*/}
                <div onClick={(e)=>this.tryClick(e,1,2)}>try event happening</div>

                <NumList list={[1,2,3,4]}/>
            </div>
        );
    }
}

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:""
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.value);
    };
    handleChange = (e)=>{
        console.log(1);
        this.setState({value:e.target.value})
    };
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    };
}

// ========================================

/*ReactDOM.render(
    <Form />,
    document.getElementById('root')
);*/

/*function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);*/
 