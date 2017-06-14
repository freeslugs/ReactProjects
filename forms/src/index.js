import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


function Greeting(props){
	return(
	<h1 onSubmit={props.onSubmit}>
		Hello, {props.name}
	</h1>
	);
}
const element = <Greeting name = "_________" />;
class NameForm extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {value: ''};
		
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  handleChange(event) {
	    this.setState({value: event.target.value});
	  }

	  handleSubmit(event) {
	    const element = <Greeting name="{this.state.value}" />;
	    // alert(this.state.value);
	    event.preventDefault();
	  }

	  render() {
	    return (
	    element,
	      <form onSubmit={this.handleSubmit}>
	        <label>
	          Name:
	          <input type="text" value={this.state.value} onChange={this.handleChange} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
	    );
	  }
}



ReactDOM.render(
	<NameForm />,
	document.getElementById('root')
	);