import axios from 'axios';
import {Toast} from 'antd-mobile'; 

const instance = axios.create();
// accepting aync requests
instance.interceptors.request.use(function(config){
	Toast.loading('Loading...', 0);
	return config;
})

instance.interceptors.response.use(function(config){
	setTimeout(()=>{
		Toast.hide()
	}, 2000)
	return config;
})