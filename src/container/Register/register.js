import React from 'react';
import Logo from '../../component/Logo/logo.js'; 
import {List,InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'; 
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {register} from '../../redux/user.redux.js';
import Form from '../../component/Form/form.js';

@connect(
	state=>state.user,
	{register}
	)
@Form
class Register extends React.Component{
	constructor(props){
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount(){
		this.props.handleChange('type', 'genius');
	}

	handleRegister(){
		this.props.register(this.state);
	}

	render(){
		const RadioItem = Radio.RadioItem;
		return(
			<div>
			<Logo></Logo>
			{this.props.RedirectTo ? <Redirect to={this.props.RedirectTo} />: null }
			<List>
			<InputItem onChange={(v)=>this.props.handleChange('user', v)}>Username</InputItem>
			<InputItem type="password" onChange={(v)=>this.props.handleChange('pwd', v)}>password</InputItem>
			<InputItem type="password" onChange={(v)=>this.props.handleChange('repeated', v)}>New Password</InputItem>
			<RadioItem checked={this.props.state.type  == "genius"} onClick={(v)=>this.props.handleChange('type', "genius")}>Genius</RadioItem>
			<RadioItem checked={this.props.state.type == "boss"} onClick={(v)=>this.props.handleChange('type', "boss")}>Boss</RadioItem>
			<Button type='primary' onClick={this.handleRegister}>Register</Button>
			</List>
			</div>
			)
	}
}

export default Register;