import React from 'react';
import logoImg from './LinkedIn.png';
import './logo.css';
class Logo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="logo-container">
			<img src={logoImg} height="100" width="100" alt="logo" />
			</div>
			)
	}
}

export default Logo; 