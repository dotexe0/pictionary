var socket = io();

$(document).ready(function() {
  var pictionary = function() {
    var canvas = $('canvas');
    var context;
    var drawing = false;
    var guessBox;

    var previousGuesses = function(guess) {
      $('#previous-guesses').text("Previous guess: " + guess);
    }

    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }
        var guess = guessBox.val();
        console.log(guess);
        previousGuesses(guess);
        socket.emit('guess', guess);
        guessBox.val('');
    };

    guessBox = $('#guess input');
    guessBox.on('keydown', onKeyDown);

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;

    canvas.on('mousedown', function(e) {
      drawing = true;
      console.log("mouse is down");
    });

    canvas.on('mouseup', function(e) {
      drawing = false;
      console.log("mouse is UP!");
    });

     canvas.on('mouseover', function(e) {
       if (drawing == true) {
        var offset = canvas.offset();
        var position = {x: e.pageX - offset.left,
                        y: e.pageY - offset.top };
        console.log(position);
        draw(position);
        socket.emit('draw', position);
        }
    });


    socket.on('draw', draw);
    socket.on('guess', previousGuesses);
  };

  pictionary();
});
