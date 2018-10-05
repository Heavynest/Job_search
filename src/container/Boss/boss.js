import React from 'react';
import {NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatorSelector  from '../../component/avatar-selector/avatar-selector.js';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux.js';

@connect(
	state=>state.user,
	{update}
)
class BossINFO extends React.Component{
	constructor(props){
		super(props);
		this.state={
			'title':"",
			'company': "",
			'salary':"",
			'description': ""
		}
		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(key, val){
		this.setState({
			[key]: val
		})
	}

	render(){
		return(
			<div>
			<NavBar mode="dark">Update Profile</NavBar>
			<AvatorSelector selectAvatar={(imagename)=>this.setState({
				'avatar': imagename
			})}></AvatorSelector>
			<InputItem onChange={(v)=>this.handleChange('title', v)}>Title</InputItem>
			<InputItem onChange={(v)=>this.handleChange('company', v)}>Company</InputItem>
			<InputItem onChange={(v)=>this.handleChange('salary', v)}>Salary</InputItem>
			<TextareaItem onChange={(v)=>this.handleChange('description', v)} rows={3} autoHeight title='Description'></TextareaItem>
			<Button type='primary' onClick={()=>this.props.update(this.state)}>Save</Button> 
			</div>
			)
	}

}

export default BossINFO;
