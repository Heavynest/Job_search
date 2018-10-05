import axios from 'axios';
import getRedirectPath from '../util.js';
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";
const LOGOUT = "LOGOUT";
const AUTH_SUCCESS = "AUTH_SUCCESS";

const initialState = {
	RedirectTo:'',
	msg: "",
	user:"",
	pwd:"",
	type:""
};

// create the reducers
export function user(state = initialState, action){
	switch(action.type){
		case ERROR_MSG:
		     return {...action.payload};
		case AUTH_SUCCESS:
		     return {...action.payload, RedirectTo: getRedirectPath(action.payload)};
		case LOGOUT:
		     return {...initialState, RedirectTo: '/login'}
		case LOAD_DATA:
		     return {...action.payload};
		default:
		     return state;
	}
}

function AuthSuccess(data){
	const {pwd, ...obj} = data; // everytying except pwd 
	return {type: AUTH_SUCCESS, payload: obj};
}

function ErrorMsg(msg){
	return {type: ERROR_MSG, payload: {msg: msg}};
}

export function loadData(data){
	return {type: LOAD_DATA, payload: data};
}

export function LogoutSubmit(){
	return {type: LOGOUT}
}

// call this method, 
export function Logging({username, pwd}){
	if(!username || !pwd){
		return ErrorMsg('please enter username and password');
	}
	return dispatch=>{
		axios.post('/user/login', {username,pwd})
		.then(res=>{
			if(res.status == 200 && res.data.code == 0){ // res.data.code 
				console.log(res.data.data);
				dispatch(AuthSuccess(res.data.data));
			}else{
				dispatch(ErrorMsg(res.data.msg));
			}
		})
	}

}


export function update(data){
	return dispatch=>{
		axios.post('/user/update', data)
		.then(res=>{
			if(res.status == 200 && res.data.code == 1){
				dispatch(AuthSuccess(data))
			}else{
				dispatch(ErrorMsg(res.data.msg));
			}
		})
	}
}

export function register({user, pwd, repeated, type}){
	console.log({user, pwd, repeated, type});
	if(!user || !pwd|| !type){
		return ErrorMsg('please enter username and password');
	}else if(pwd !== repeated){
		return ErrorMsg('Please enter the same password');
	}
	return dispatch=>{
		axios.post('/user/register', {user,pwd, type})
		.then(res=>{
			if(res.status == 200 && res.data.code == 0){ // res.data.code 
				dispatch(AuthSuccess({user, pwd, type}));
			}else{
				dispatch(ErrorMsg(res.data.msg));
			}
		})
	}

}

