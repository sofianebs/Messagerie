	$(document).ready(function(){
$('#action_menu_btn').click(function(){
	$('.action_menu').toggle();
});

$( "#input-message").on( "input",  function() {
  alert();
  });

function myFunction() {
  alert("The value of the input field was changed.");
}
	});
	
$(function () {
    let socket = io();
    socket.emit('login' , {id : Date.now()})

    $('#send').click(function (e) {
        e.preventDefault();
        let text = $('#input-message').val();
        socket.emit('chat message' , text);
        $('#input-message').val('') ;
        $('#messages').append('<div class="d-flex justify-content-end mb-4"> <div class="msg_cotainer_send"> '+text+ '<span class="msg_time_send">9:10 AM, Today</span> </div><div class="img_cont_msg"> <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"></div></div>'); 

        return false;
    });

    socket.on('newusr' , function (user) {
        $('#membre').append('<li id="user-' + user + '">User-' +  '<div class="d-flex bd-highlight"> <div class="img_cont"> <img src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg" class="rounded-circle user_img"> <span class="online_icon"></span></div><div class="user_info"><span>'+user+'</span><p> EN ligne</p></div></div> </li>');
    })

   
   


    socket.on('delusr' , function (user) {
        $('#user-' + user).remove();
    })

    socket.on('chat message' , function (msg) {
        $('#messages').append('<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">'+msg+'<span class="msg_time">9:00 AM, Today</span></div></div>');
    })
});

