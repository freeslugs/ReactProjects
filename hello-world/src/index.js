import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

function Greeting(props){
	return <h1> Hello, {props.name} </h1>;
}

const element = <Greeting name = "Wesley" />;
ReactDOM.render(
	element,
	document.getElementById('root')
	);