const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3001);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('status', { status: 'Online' });
  socket.on('clientMessage', (data) => {
    console.log('>>> Server: ', data);
    io.emit('incomingMessage', data)
  });

  socket.on('disconnect', () => {
    console.log('>>> Server: User Disconnected')
  })
});

