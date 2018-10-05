import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import {LogoutSubmit} from '../../redux/user.redux.js';
import browserCookie from 'browser-cookies';
import {Redirect} from 'react-router-dom';

@connect(
	state=>state.user,
	{LogoutSubmit}
	)
class User extends React.Component{
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(){
		const alert = Modal.alert;
		alert('log out', 'Are you sure to log out???', [
			{'text': 'Cancel', onPress: ()=> console.log('Cancel')},
			{'text': 'Ok', onPress: ()=>{
				this.props.LogoutSubmit()
			}}
			])
	}


	render(){
		const Item = List.Item;
		const Brief = Item.Brief;
		console.log(this.props);
		return(
			this.props.user? (<div>
			<Result 
			img={<img src={require(`../avatar/${this.props.avatar}.png`)} style={{width: 50}} />}
            title={this.props.user}
            message={this.props.type=='boss'?this.props.company: null}
			></Result>
			<List renderHeader={()=>'Introduction'}>
			<Item multipleLine>
			{this.props.title}
			<Brief>Experienced in React</Brief>
			<Brief>Familiar with React</Brief>
			</Item>
			</List>
			<WhiteSpace></WhiteSpace>
			<List>
			    <Item onClick={this.logout}>LOG OUT</Item>
			</List>
			</div>) : <Redirect to={this.props.redirectTo} />
			)
	}
}

export default User