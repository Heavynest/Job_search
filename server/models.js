const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
	console.log("connection is on")
});

//modeles is a list of model, database schema 
const models = {
	user:{
		'user': {type:String, require: true},
		'pwd': {type:String, require: true},
		'type':{type:String, require: true},
		'avatar': {type: String},
		'description': {type: String},
		'title':{type:String},
		'company':{type: String},
		'money':{type: String}
	},
	chat:{
		'chatid': {type: String, require: true},
		'from': {type:String,require: true},
		'to': {type:String, require: true},
		'read': {type:Boolean, default: false},
		'content':{type:String, require:true, default:''},
		'create_time': {type:Number, default: new Date().getTime()}

	}
}

// create this 
for (let m in models){
	console.log(m);
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name){
		return mongoose.model(name);
	}
}

console.log("hello, I am done with creating the models");