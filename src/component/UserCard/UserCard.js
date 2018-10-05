import React from 'react';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component{
	constructor(props){
		super(props);
		this.handleChat = this.handleChat.bind(this);
	}

	handleChat(user){
		this.props.history.push('/chat/' + user);
	}

	render(){
		const Header = Card.Header;
		const Body = Card.Body;
		return(
			<WingBlank>
			<WhiteSpace/>
			{this.props.userList.map(v=>(
				v.avatar?(
				<Card onClick={()=>this.handleChat(v._id)}>
				<Header title={v.user}
				 thumb={require(`../avatar/${v.avatar}.png`)}
				 extra={<span>{v.title}</span>}
				 >
				</Header>
				</Card>
				): null
				))}
			</WingBlank>
			)	
	}
}

export default UserCard;
