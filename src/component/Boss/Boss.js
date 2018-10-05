import React from 'react';
import axios from 'axios';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux.js';
import UserCard from '../UserCard/UserCard.js';

@connect(
	state=>state.chatuser,
	{getUserList}
	)
class Boss extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data: []
		}
	}

	componentDidMount(){
		this.props.getUserList('genius');
	}

	render(){
		return(
			<UserCard userList={this.props.userList}></UserCard>
			)
		}
}

export default Boss;