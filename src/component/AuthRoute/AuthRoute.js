import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadData} from '../../redux/user.redux.js';
@withRouter
@connect(
	state=>state.user,
	{loadData}
)
class AuthRouter extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		// componentDidMount immediately called when the dom is inserted into the tree
		//get user information, boss or genius 
		const publicList = ['/login', '/register'];
		const pathName = this.props.location.pathname;
		if(publicList.indexOf(pathName) > -1){
			console.log(pathName);
			return null;
		}
		axios.get('/user/info').
		then(res=>{
			if(res.status == 200){
				if(res.data.code == 200){
					this.props.loadData(res.data.data);
				}else{
					this.props.history.push('/login');
				}
			}else{
				// error occurs 
			}
		})
	}

	render(){
		return(
			<div>
			</div>
			)
	}
}

export default AuthRouter;