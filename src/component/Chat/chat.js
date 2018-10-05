import React from 'react';
import {List, InputItem, NavBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux.js';

@connect(
	state=>state,
	{getMsgList, sendMsg, recvMsg}
	)
class Chat extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			'text': '',
			'msg': []
		}
	}

	componentDidMount(){

	}

	handleSubmit(){
		const from = this.props.user._id;
		const to = this.props.match.params.user
		const msg = this.state.text;
		this.props.sendMsg({from, to, msg});
		this.setState({'text': ""});
	}

	render(){
		console.log(this.props.chat.chatmsg);
		const user = this.props.match.params.user;
		const Item = List.Item;
		return(
			<div id='chat-page'>
			<NavBar mode='dark'>
			{user}
			</NavBar>
			{this.props.chat.chatmsg.map(v=>{
				return v.from == user?(
				<List key={v._id}>
				<Item>{v.content}</Item>
				</List>
				): (
				<List key={v._id}>
				<Item className='chat-me' extra={'avatar'}>{v.content}</Item>
				</List>
				)
			})}
			<div>
			<List className="stick-footer">
			<InputItem placeholder='please enter' value={this.state.text} onChange={v=>{this.setState({text: v})}}
			   extra={<span onClick={()=>this.handleSubmit()}>Send Message</span>}></InputItem>
			</List>
			</div>
			</div>)

	}
}

export default Chat;