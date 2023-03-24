let gameState = 'start';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common =
    document.querySelector('.paddle').getBoundingClientRect();

let dx = Math.floor(Math.random() * 3) + 2;
let dy = Math.floor(Math.random() * 3) + 2;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        gameState =  'play' ;

        if (gameState == 'play') {
            message.innerHTML = '';
                dx = 2;
                dy = 2;
                dxd = 1;
                dyd = 1;
                moveBall(dx, dy, dxd, dyd);
        }
    }

    if (gameState == 'play') {

        //   paddle user
        if (e.key == 'ArrowLeft') {
            if(board_coord.left >= paddle_2_coord.left){
                return;
            }
            paddle_2.style.left = (paddle_2_coord.left - 20) + 'px';
            paddle_2_coord = paddle_2.getBoundingClientRect();
        }
        if (e.key == 'ArrowRight') {
            if(board_coord.right <= paddle_2_coord.right){
                return;
            }
            paddle_2.style.left = (paddle_2_coord.left + 20) + 'px';

            paddle_2_coord = paddle_2.getBoundingClientRect();
        }
    }
});

function moveBall(dx, dy, dxd, dyd) {
    if (ball_coord.left <= board_coord.left || ball_coord.right >= board_coord.right) {
        dxd = -1 * dxd;
    }
    else if (ball_coord.top <= paddle_1_coord.bottom ) {
        dyd = 1;
    } else if (ball_coord.bottom >= paddle_2_coord.top && ball_coord.left >= paddle_2_coord.left && ball_coord.right <= paddle_2_coord.right) {
        dyd = -1;

    } 
    if (ball_coord.top <= board_coord.top || ball_coord.bottom >= board_coord.bottom) {
        alert("press left and right arrow key to move the paddle");
        gameState = 'start';
        ball_coord = initial_ball_coord;
        ball.style = initial_ball.style;
        message.innerHTML = 'Press Enter to Play Pong';
        return;
    }
    ball.style.top = (ball_coord.top + dy * dyd) + 'px';
    ball.style.left = (ball_coord.left + dx * dxd) + 'px';
    paddle_1.style.left = ((ball_coord.right + ball_coord.left - 200)/2 ) + 'px';
    ball_coord = ball.getBoundingClientRect();
    
    requestAnimationFrame(() => {
        moveBall(dx, dy, dxd, dyd);
    });
}
