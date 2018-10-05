const express = require('express');
// get user router 

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const userRouter = require('./user');

const app = express();
// get user ur

const server = require('http').Server(app);

const model = require('./models');

const Chat = model.getModel('chat');

const io = require('socket.io')(server);

io.on('connect', function(socket){
	socket.on('sendmsg', function(data){
		const {from, to, msg} = data;
		const chatid = [from, to].sort().join('_');
		Chat.create({chatid: chatid, from: from, to: to, content: msg}, function(err, doc){
			io.emit('recivmsg', Object.assign({}, doc._doc));
		})
		//console.log(data);
		//io.emit('recivmsg', data);
	})
})

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/user', userRouter);
/*
app.get('/',function(req, res){
	res.send('<h1>Hello World</h1>')
});
app.get('/data', function(req, res){
	User.findOne({},function(err,doc){
		return res.json(doc);
	})
	//res.json({name:'Jinghan Li', IT:'software engineer Uber'})
});*/
server.listen(9093, function(){
	console.log("Node app start at 3000")
});