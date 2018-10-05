

export function getRedirectPath({type, avatar}){
	//based on the user type, redirect to the boss or genius 
	// if you have choose the avatar then go to the boss and genius list, otherwise fo to info
	console.log({type, avatar}); 
	let url = (type==='boss')?'/boss':'/genius'
	if(!avatar){
		url += '/info';
	}
	return url;
}