$(function () {


    let socket = io();
    let ID = Date.now();
    socket.emit('login', { id: ID })
    $('#action_menu_btn').click(function () {
        $('.action_menu').toggle();
    });
    // Prompt pour selection fichier image
    $('#btn').on('click', function () {
        $('#open').trigger('click');

    });
    // append image pour user emmeteur
    function imageIsLoaded(e) {
        var x = 'foo';
        var picture = '<img src="' + e.target.result + '" style="width:200px;height:200px;" class="' + x + 'thImage">'
        $('#messages').append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send"> ' + picture + ' </div><div class="img_cont_msg"> <img src="https://api.adorable.io/avatars/167/' + ID + '" class="rounded-circle user_img_msg"></div></div>');

    }


    $("#input-message").on("input", function () {
        socket.emit('Iswriting', { id: ID });
    });


    $("#open").on("change", function (e) {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
            var file = this.files[0] ;
            var formData = new FormData();
            formData.append('file',file);
            formData.append('id',ID) ;
            
            $.ajax({
                url: '/upload',
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false, 
                success: function(data){
                    console.log(data);
                }
            });
        }


    });

    $('#send').click(function (e) {
        e.preventDefault();
        let text = $('#input-message').val();
        socket.emit('chat message', text, ID);
        $('#input-message').val('');
        $('#messages').append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send"> ' + text + ' </div><div class="img_cont_msg"> <img src="https://api.adorable.io/avatars/167/' + ID + '" class="rounded-circle user_img_msg"></div></div>');

        return false;
    });

    socket.on('newusr', function (user) {
        $('#membre').append('<li id="user-' + user + '"><div class="d-flex bd-highlight"> <div class="img_cont"> <img src="https://api.adorable.io/avatars/167/' + user + '" class="rounded-circle user_img"> <span class="online_icon"></span></div><div class="user_info"><span>' + user + '</span><p id="stat' + user + '"></p></div></div> </li>');
    })


    socket.on('delusr', function (user) {
        $('#user-' + user).remove();
    })

    socket.on('chat message', function (msg, ID) {
        $('#messages').append('<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://api.adorable.io/avatars/167/' + ID + '" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + msg + '<span class="msg_time">9:00 AM, Today</span></div></div>');
    })
    socket.on('Notification', function (msg) {

        $('#stat' + msg.id).append('entrain de ecrire un message ... ');

    })
    socket.on("MonProfile", function (ID) {
        //console.log('im here'+ID) ;
        $('#ME').append('<img src="https://api.adorable.io/avatars/100/' + ID + '" class="rounded-circle user_img"><span class="online_icon"></span>')
    })
    // Diffuser l'image au reste user 
    socket.on("SharePic", function (Path){

    })
});

