document.getElementById('startPong').addEventListener('click', function() {
    var canvas = document.getElementById('pongCanvas');
    var ctx = canvas.getContext('2d');

    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var paddleSpeed = 5;
    var rightPressed = false;
    var leftPressed = false;
    var ballColor = "#0095DD";

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ballColor;
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();

        if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        } else if(y + dy > canvas.height - ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                var delta = x - (paddleX + paddleWidth / 2);
                dx = delta * 0.1; // Verandert de horizontale snelheid op basis van het contactpunt
                ballColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                document.location.reload();
            }
        }

        if(rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += paddleSpeed;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= paddleSpeed;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    draw();
});
