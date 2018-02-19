// make connection
var socket = io.connect('http://localhost:4000');
// query DOM:
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

// Emit Event

btn.addEventListener('click', function(e){
  socket.emit('chat', {
    'message': message.value,
    'handle': handle.value
    });
  });

message.addEventListener('keypress', function(e){
  socket.emit('typing', handle.value);
})

// Listen For Events

socket.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
