var socket = io();
var chatUsername = document.querySelector('#chat-username');
var chatMessage = document.querySelector('#chat-message');
var chatForm = document.forms.chatForm;

socket.on('connect', function() {

  if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      socket.emit('postMessage',{
        username: chatUsername.value,
        message: chatMessage.value,
      });
      chatMessage.value='';
      chatMessage.focus();
    }); //chatform event

    socket.on('updateMessages', function(data) {
      showMessage(data);
    }); //updateMessages
  } //chatform
}); //socket

function showMessage(data) {
  var chatDisplay = document.querySelector('.chat-display');
  var newMessage = document.createElement('p');

  if (chatUsername.value == data.username) {
    newMessage.className = 'bg-success chat-text';
  } else {
    newMessage.className = 'bg-info text-warning chat-text';
  }

  newMessage.innerHTML = '<strong>' + data.username + '</strong>: ' + data.message;
  chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
}



// $(function() {
//   $.getJSON('api', updateFeedback);
//
//   chatForm.addEventListener('submit',function(e) {
//     e.preventDefault();
//     $.post('api', {
//       name: $('#chat-username').val(),
//       message: $('#chat-message').val()
//     }, updateFeedback);
//   });
//
//   function updateFeedback(data) {
//    var output = '';
//    $.each(data,function(key, item) {
//      output += '     <div class="feedback-item item-list media-list">';
//      output += '       <div class="feedback-item media">';
//      output += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
//      output += '         <div class="feedback-info media-body">';
//      output += '           <div class="feedback-head">';
//      output += '             <div class="feedback-title">' + item.title + ' <small class="feedback-name label label-info">' + item.name + '</small></div>';
//      output += '           </div>';
//      output += '           <div class="feedback-message">' + item.message + '</div>';
//      output += '         </div>';
//      output += '       </div>';
//      output += '     </div>';
//    });
//    $('.feedback-messages').html(output);
//   }
// });
