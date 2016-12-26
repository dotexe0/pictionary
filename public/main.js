$(document).ready(function() {
  pictionary();
});

var pictionary = function() {
  var canvas = $('#canvas');
  var context;

  var draw = function(position) {
    context.beginPath();
    context.arc(position.x, position.y, 6, 0, 2 * Math.PI);
    context.fill();
  };

  context = canvas[0].getContext('2d');
  canvas[0].width = canvas[0].offsetWidth;
  canvas[0].height = canvas[0].offsetHeight;
  canvas.on('mouseover', function(e) {
    var offset = canvas.offset();
    var position = {x: e.pageX - offset.length,
                    y: e.pageY - offset.top };
    draw(position);
  });
};
