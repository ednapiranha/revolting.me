(function () {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var drawing = false;
  var prevY = 0;
  var prevX = 0;
  var currX = 0;
  var currY = 0;
  var flag = false;
  var clientX;
  var clientY;
  var currColor = 'rgba(54, 200, 128, 0.9)';
  var currComposition = 'screen';
  var color = '#5677e8';
  var brushWidth = 10;
  ctx.lineWidth = 10;

  function draw(cX, cY, pX, pY) {
    ctx.lineCap = 'square';
    ctx.globalCompositeOperation = currComposition;
    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(cX, cY);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushWidth;
    ctx.stroke();
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.15)';
    ctx.stroke();
    ctx.shadowBlur = 17;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
    ctx.stroke();
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(54, 255, 189, 0.5)';
    ctx.stroke();
    ctx.shadowBlur = 25;
    ctx.shadowColor = currColor;
    ctx.stroke();
    ctx.shadowBlur = 30;
    ctx.shadowColor = currColor;
    ctx.stroke();
    ctx.closePath();
  }

  function setDraw() {
    ctx = canvas.getContext('2d');

    function setMove(type, e) {
      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      switch (type) {
        case 'over':
          prevX = currX;
          prevY = currY;
          currX = clientX;
          currY = clientY;
          flag = true;
          drawing = true;

          if (drawing) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            drawing = false;
          }
          break;
        case 'out':
          flag = false;
          break;
        case 'move':
          if (flag) {
            prevX = currX;
            prevY = currY;
            currX = clientX;
            currY = clientY;
            draw(currX, currY, prevX, prevY);
          }
          break;
      }
    }

    canvas.addEventListener('mouseout', (e) => {
      setMove('out', e);
    }, false);

    canvas.addEventListener('mousemove', (e) => {
      setMove('move', e);
    }, false);

    canvas.addEventListener('mouseover', (e) => {
      setMove('over', e);
    }, false);

    canvas.addEventListener('touchend', (e) => {
      setMove('out', e);
    }, false);

    canvas.addEventListener('touchmove', (e) => {
      setMove('move', e);
    }, false);

    canvas.addEventListener('touchstart', (e) => {
      setMove('over', e);
    }, false);
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);

  setDraw();

  window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
})()