let w;
let h;
let rez=20;
let food;
let snake;
let started=false;
let firstPlay=true;
let muted=false;
let score;
let lose;
function preload() {
    score=loadSound('sounds/score.mp3');
    lose=loadSound('sounds/lose.mp3');
}
function setup() {
    let canvas=createCanvas(800, 800);
    canvas.parent('game');
    document.getElementById('score').innerHTML=1;
    document.getElementById('display').innerHTML='';
    frameRate(10);
    w=floor(width/rez);
    h=floor(height/rez);
    snake=new Snake();
    randomizeFood();
}
function draw() {
    background(60, 60, 100);
    if(snake.eat(food)) {
        if(!muted) score.play();
        document.getElementById('score').innerHTML++;
        randomizeFood();
    } else if(snake.gameOver()) {
        if(!muted) lose.play();
        document.getElementById('display').innerHTML='Game Over!';
        if(firstPlay) {
            document.getElementById('display').innerHTML+='<br><span style="font-size: 50%;">(Press R/Space to restart!)</span>';
            firstPlay=false;
        }
        noLoop();
    }
    snake.update();
    fill(255, 0, 0);
    rect(food.x, food.y, rez, rez);
}
function randomizeFood() {
    while(true) {
        let toBreak=true;
        food=createVector(floor(random(w)), floor(random(h))).mult(rez);
        for(let i=0;i<snake.body.length;i++) {
            if(food.equals(snake.body[i])) {
                toBreak=false;
                break;
            }
        }
        if(toBreak) break;
    }
}
function keyPressed() {
    switch(keyCode) {
        case LEFT_ARROW:
        case 65:
            if(snake.xdir!=1) snake.setDir(-1, 0);
            break;
        case UP_ARROW:
        case 87:
            if(snake.ydir!=1) snake.setDir(0, -1);
            break;
        case RIGHT_ARROW:
        case 68:
            if(snake.xdir!=-1) snake.setDir(1, 0);
            break;
        case DOWN_ARROW:
        case 83:
            if(snake.ydir!=-1) snake.setDir(0, 1);
            break;
        case 32:
        case 82:
            setup();
            loop();
						break;
				case 77:
						muted=!muted;
    }
}