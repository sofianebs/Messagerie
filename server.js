const config = require('./config')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile('/home/sofiane/Desktop/NodeRendu/CoursWebSockets/index.html')
})

app.get('/main.css', function (req, res) {
    res.sendFile(__dirname + '/main.css')
})

app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + '/client.js')
})

let users = {}

io.on('connection', (socket) => {

    let me = false;
    console.log("user connected")

    for (let i in users) {
        socket.emit('newusr', users[i])
    }

    socket.on('login', (user) => {
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
// Send To me => socket.emit()

http.listen(config.server.port, config.server.host, function () {
    console.log('Server listen on http://' + config.server.host + ':' + config.server.port);
})