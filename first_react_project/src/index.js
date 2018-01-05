import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {
    render(){
        return (
            <button className="square" onClick={()=>{this.props.Click()}}>
                {this.props.value}
            </button>
        )
    }
}*/
/*上面的简单写法*/
/*function Square(props){  //这里的参数是 props
    return (
        <button className="square" onClick={props.Click}> {/!*!//这种写法就传不了值进来*!/}
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
        /!*const status = `Next player: ${this.state.xIsNext?"X":"O"}`;*!/
        // const status = "Next player: "+(this.state.xIsNext?"X":"O");

        return (
            <div>
                {/!*<div className="status">{2}</div>*!/}
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

class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            squares:new Array(9).fill(null),
            xIsNext:true,
        }

    }
    handleClick(i){
        const squares = this.state.squares.slice(); /!*浅拷贝*!/
        squares[i] =this.state.xIsNext? 'X':'O';
        this.setState({squares: squares,xIsNext:!this.state.xIsNext});
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
                    <ol>{/!* TODO *!/}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);*/

function tick() {
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

setInterval(tick, 1000);
