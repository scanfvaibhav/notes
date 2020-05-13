const express = require('express');
const app = express();

const http = require('http').Server(express);
const io = require('socket.io')(http);
const Chat = require('./models/chat');

const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// require db connection
require('./models');

// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add this line
app.use(express.static('client/build'));

app.use(routes);

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
  
// Bootstrap server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
