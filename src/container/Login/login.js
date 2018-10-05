import React from 'react';
import {List,InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'; 
import Logo from '../../component/Logo/logo.js';
import {connect} from 'react-redux';
import {Logging} from '../../redux/user.redux';
import {Redirect} from 'react-router';
import Form from '../../component/Form/form.js';

@connect(
	state=>state.user,
	{Logging}
)
@Form
class Login extends React.Component{
	constructor(props){
		super(props);
		this.direct_register = this.direct_register.bind(this);
		this.direct_register = this.direct_register.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	direct_register(){
		this.props.history.push('/register'); // amazing !!!!
	}

	handleLogin(){
		this.props.Logging(this.props.state);
	}


	render(){
		return(
			<div>
			<Logo></Logo>
			{this.props.RedirectTo ? <Redirect to={this.props.RedirectTo} />: null }
			<WingBlank>
			<List>
			<InputItem onChange ={v=>this.props.handleChange('username',v)}>Username</InputItem>
			<WhiteSpace />
			<InputItem onChange ={v=>this.props.handleChange('pwd', v)}>Password</InputItem>
			</List>
			<Button type='primary' onClick={this.handleLogin}>Login</Button>
			<WhiteSpace />
			<Button type='primary' onClick={this.direct_register}>Register</Button>
			</WingBlank>
			</div>
			)
	}
}

export default Login;