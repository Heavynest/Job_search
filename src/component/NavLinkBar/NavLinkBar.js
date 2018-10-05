import React from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
@withRouter
@connect(
	state=>state.chat
	)
class NavLinkBar extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const navList = this.props.data.filter(v=>!v.hide);
		const {pathname} = this.props.location;
		return(
			<TabBar>
			{navList.map((v)=>(
				<TabBar.Item key={v.path} 
				badge={this.props.unread}
				title={v.text} 
				icon={{uri: require(`./img/${v.icon}.png`)}}
				selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
				selected={pathname == v.path}
				onPress = {()=>{this.props.history.push(v.path)}}
				>
				</TabBar.Item>
				))}
			</TabBar>
			)
	}
}

export default NavLinkBar;