// user.js is handling the information related to user
const express = require('express');
const Router = express.Router();
const model = require('./models');
const utils = require('utility');
const User = model.getModel('user'); // created database and load user database model 
const Chat = model.getModel('chat');

Router.get('/list', function(req,res){
	const type = req.query.type
	User.find({type}, function(err, doc){
		res.json({code: 0, data: doc})
	})
})


Router.post('/register', function(req,res){
	const {user, pwd, type} = req.body;
	User.findOne({user:user},function(err,doc){
		if(doc){
			return res.json({code:1, msg: "The username has already existed"});
		}
		User.create({user,pwd: utils.md5(pwd), type},function(e,d){
			if(e){
				return res.json({code:1, msg:"something wrong in inserting"});
			}
			res.cookie('userid', d._id);
			return res.json({code: 0});
		})
	})
})

Router.get('/getmsglist', function(req, res){
	console.log("hi");
	const user = req.cookies.userid;
	//{'$or': [{from: user, to: user}] }
	Chat.find({}, function(err,doc){
		if(!doc){
			return res.json({code: 0, data: doc});
		}

	})
})

Router.post('/update', function(req,res){
	const {userid}  = req.cookies;
	console.log(userid);
	if(!userid){
		return res.json({code: 1});
	}
	const body = req.body;   // important
	User.findByIdAndUpdate(userid, body,function(err,doc){
		const data = Object.assign({},{
			user: doc.user,
			type: doc.type
		}, body)
		return res.json({code: 0, data});
	})
})

Router.post('/login', function(req,res){
	const {username, pwd} = req.body;
	User.findOne({"user": username, "pwd": utils.md5(pwd)},function(err,doc){ // perfectly matching 
		if(doc){
			res.cookie('userid', doc._id); // set a cookie to restore the data in the login 
			return res.json({code:0, data: doc}); // return the data using docs as its variable, doc is returned by query 
		}
		return res.json({code:1, msg: "The user does not exists"});
	})
})

Router.get('/info', function(req,res){
	const {userid} = req.cookies;
	if(!userid){
		return res.json({code: 1});
	}
	User.findOne({_id:userid},function(err,doc){
		if(err){
			return res.json({code:1, msg: "something wrong with backend"});
		}
		return res.json({code: 200, data: doc});
	})
})

module.exports = Router;