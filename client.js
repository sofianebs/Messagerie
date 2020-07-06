$(function () {
    let socket = io();

    socket.emit('login' , {id : 1})

    $('form').submit(function (e) {
        e.preventDefault();
        let text = $('#input-message').val();
        socket.emit('chat message' , text)
        $('#input-message').val('')
        $('#messages').append('<div class="message-container text-center"><div class="text">'+ text +'</div></div>')
        return false;
    })

    socket.on('newusr' , function (user) {
        $('#membre').append('<div id="user-' + user + '">User' + user + '</div>')
    })

    socket.on('delusr' , function (user) {
        $('#user-' + user).remove();
    })

    socket.on('chat message' , function (msg) {
        $('#messages').append('<div class="message-container text-center"><div class="text">'+ msg +'</div></div>')
    })
});

