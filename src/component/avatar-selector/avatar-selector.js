import React from 'react';
import {Grid, List} from 'antd-mobile';

class AvatorSelector extends React.Component{
	constructor(props){
		super(props);
		this.state = {icon:"", text:""};

	}
	render(){
		const avatorList = 'avatar1,avatar2,avatar3,avatar4'.split(',').map((v)=>({
			icon:require(`../avatar/${v}.png`),
			text: v
		}))

		const gridHeader = this.state.icon ? (<div>
			<span>You selected</span>
			<img style={{width: 20}} src={this.state.icon} />
			</div>): 
			<div>Please select your avatar</div>; 
		return(
			<div>
			<List renderHeader={()=>gridHeader} >
			<Grid data={avatorList} columnNumber={5} onClick={(elm)=>{
				this.setState(elm);
				this.props.selectAvatar(elm.text);
			}}/>
			</List>
			</div>

			)
	}

}

export default AvatorSelector;
