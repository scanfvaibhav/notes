const express = require('express');
const socketIO = require('socket.io');

const routes = require('./routes');
const Chat = require('./models/chat');

const PORT = process.env.PORT || 5000;

const server = express()
  .use('/',routes).use(express.urlencoded({ extended: true })).use(express.json()).use(express.static('client/build'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);
// require db connection
require('./models');

// configure body parser for AJAX requests

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('User Disconnected');
    });

    socket.on('example_message', async function(msg){
      console.log('message: ' + msg);
      const newChat = new Chat({
        text: msg.newMsg.text,
		from: msg.from,
		to: msg.to,
        readReceipt: false,
        date: Date.now()
	});
	
	let myRoom =  "room-"+msg.from+"-"+msg.to;
	let guestRoom = "room-"+msg.to+"-"+msg.from;
	let room="";
    if(io.nsps['/'].adapter.rooms[guestRoom] && io.nsps['/'].adapter.rooms[guestRoom].length > 0) {
		room = guestRoom;
	}else{
		room = myRoom;
	}
	socket.join(room);
           

   //Send this event to everyone in the room.
   
        await newChat.save();
		const chats = await Chat.find({$or:[{from: msg.to,to:msg.from},{from: msg.from,to:msg.to}]});
        io.sockets.in(room).emit('newMessage', chats);
    });
   
  });
  


