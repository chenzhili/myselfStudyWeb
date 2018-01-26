import React from 'react';
import ReactDOM from 'react-dom';

//组合
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Parent />
      }
      right={
        <div>ccc</div>
      } />
  );
}

class Parent extends React.Component{
	render(){
		// console.log(this.props.children);
		// console.log(React.Children);
		return (
			<p>{React.Children.map(this.props.children,(child)=>{
				return(
					<span>{child}</span>
					)
			})}</p>
			)
		}
}	
class Test extends React.Component{
	constructor(){
		super();
		this.state = {opacity:"1"}
	}
	componentWillMount(){
		setInterval(()=>{
			this.setState({
				opacity:this.state.opacity?0:1
			});
		},1000);
	}
	render(){ 
		return(
			<h1 className="test_opa" style={{opacity:this.state.opacity}}>hello world
				<Parent>
					<span>aaa</span>
					<span>aaa</span>
				</Parent>
				<App/>
			</h1>
			
			
		)
	}
}

ReactDOM.render(<Test />,document.getElementById('root'));    
