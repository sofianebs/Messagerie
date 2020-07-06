const config = require('./config')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile('/Users/anton/Desktop/Webscoket/index.html')
})

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/style.css')
})

app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + '/client.js')
})

let users = {}

io.on('connection', (socket) => {

    let me = false;
    console.log("user connected")

    socket.on('login', (user) => {
        console.log(user)
       me = user.id;
       console.log(me)
       users[me] = me;
       io.emit('newusr', me)
    })

    socket.on('disconnect', () => {
        delete users[me]
        socket.broadcast.emit('delusr', me)
        console.log("diconnect")
    })
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message' , msg)
    })
});

// Send To All => io.emit()
// Send To All sauf emetteur => socket.broadcast.emit()

http.listen(config.server.port, config.server.host, function () {
    console.log('Server listen on http://' + config.server.host + ':' + config.server.port);
})