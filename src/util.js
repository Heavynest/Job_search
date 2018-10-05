

export default function getRedirectPath({type, avatar}){
	//based on the user type, redirect to the boss or genius 
	console.log({type,avatar});
	let url = (type === 'boss') ? '/boss': '/genius';
	if(!avatar){
		url += '/info';
	}
	return url;
}