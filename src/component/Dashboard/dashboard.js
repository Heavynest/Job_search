import React from 'react';
import {connect} from 'react-redux'; 
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../NavLinkBar/NavLinkBar.js';
import styles from './dashboard.css';
import Boss from '../Boss/Boss.js';
import Genius from '../Genius/Genius.js';
import User from '../user/user.js';
import {Route, Switch} from 'react-router-dom';
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux.js';

@connect(
	state=>state,
	{getMsgList, recvMsg}
	)
class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.props.getMsgList();
		this.props.recvMsg();
	}

	render(){
		const {pathname} = this.props.location;
		const user = this.props.user;
		const navList =  [
	
		{
			path:'/boss',
			text: 'genius',
			icon: 'boss',
			title: 'genius List',
			component: Boss,
			hide:user.type == 'genius'
		},
		{
			path: '/genius',
			text:'boss',
			icon:'job',
			title:'Boss List',
			component: Genius,
			hide: user.type == 'boss'
		},
		{
			path:'/me',
			text:'me',
			icon: 'user',
			title:'self center',
			component: User
		},
		{
			path:'/msg',
			text:'message',
			icon:'msg',
			title:'message list',
			component: Boss
		}];
		return(
			<div>
			<NavBar mode='dard' className='fixed-header'>{navList.find(v=>v.path == pathname).title}</NavBar>
			<div styles={{margin:45}}>
			<Switch>
			{navList.map(v=>(
				<Route key={v.path} path={v.path} component={v.component}></Route>
				))}
			</Switch>
			<NavLinkBar mode='dard' className='fixed-bottom' data ={navList}></NavLinkBar>
			</div>
			</div>
			)
	}

}

export default Dashboard;
