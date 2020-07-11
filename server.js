const config = require('./config')
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
var multer = require('multer') 

var upload = multer({dest : 'uploads/'}) ;
app.get('/', function (req, res) {
    res.sendFile('/home/sofiane/Desktop/NodeRendu/CoursWebSockets/index.html')
})

app.get('/main.css', function (req, res) {
    res.sendFile(__dirname + '/main.css')
})

app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + '/client.js')
})

// GET Photo from AJax Post and diffuse au reste USers
app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file ;
    return res.status(200).send({'path':file.path,'id':req.id});
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

        users[me] = me;
        io.emit('newusr', me)
        socket.emit('MonProfile', me)

    })

    socket.on('disconnect', () => {
        delete users[me]
        socket.broadcast.emit('delusr', me)
        console.log("diconnect")
    })
    socket.on('chat message', (msg, ID) => {
        socket.broadcast.emit('chat message', msg, ID)
    })
    socket.on('Iswriting', (user) => {
        socket.broadcast.emit('Notification', user)

    })
});

// Send To All => io.emit()
// Send To All sauf emetteur => socket.broadcast.emit()
// Send To me => socket.emit()

http.listen(config.server.port, config.server.host, function () {
    console.log('Server listen on http://' + config.server.host + ':' + config.server.port);
})