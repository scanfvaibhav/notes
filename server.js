const express = require('express');
const socketIO = require('socket.io');

const routes = require('./routes');
const Chat = require('./models/chat');

const PORT = process.env.PORT || 5000;
const INDEX = '/index.html';

const server = express()
  .use(routes)
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
        user: msg.from,
        readReceipt: false,
        date: Date.now()
    });
    if(io.nsps['/'].adapter.rooms["room-"+msg.from] && io.nsps['/'].adapter.rooms["room-"+msg.from].length > 1) roomno++;
            socket.join("room-"+msg.from);

   //Send this event to everyone in the room.
   
        await newChat.save();
        const chats = await Chat.find({});
        io.sockets.in("room-"+msg.to).emit('newMessage', chats);
    });
   
  });
  


