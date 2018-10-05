import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

// GET message list 
const MSG_LIST = 'MSG_LIST';

// recieve message
const RECV_MSG = 'RECV_MSG';

// read the message
const MSG_READ = 'MSG_READ';

const initialState={
	chatmsg: [],
	unread: 0
}

export function chat(state=initialState, action){
	switch(action.type){
		case MSG_LIST:
		    return {...state, chatmsg: action.payload, unread: action.payload.filiter(v=>!v.read).length}
		case RECV_MSG:
		    return {...state, chatmsg: [...state.chatmsg,action.payload], unread: state.unread+1}
		case MSG_READ:
		default:
		  return state;
	}
}

export function sendMsg({from, to, msg}){
	return dispatch=>{
		socket.emit('sendmsg', {from: from, to: to, msg: msg});
	}
}

function msgRecv(msg){
	return {type: RECV_MSG, payload: msg};
}

function msglist(msgs){
	return {type: MSG_LIST, payload: msgs};
}

export function recvMsg(){
	return dispatch=>{
		socket.on('recivmsg', function(data){
			dispatch(msgRecv(data));
		})
	}

}

export function getMsgList(){
	return dispatch=>{
		axios.get('/user/getmsglist')
		.then(res=>{
			console.log('hi');
			if(res.status ==200 && res.data.code == 0){
				dispatch(msglist(res.data.data));
			}
		})
	}
}