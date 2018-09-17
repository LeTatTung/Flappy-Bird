var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//khoi tao may cai anh
// con chim
var bird = new Image();
//anh nen
var bg = new Image();
//nen dat
var fg = new Image();
// ong tren
var pipeNorth = new Image();
// ong duoi
var pipeSouth = new Image();

// load image
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//audio files
var fly = new Audio();
var scoreAudio = new Audio();
//load audio
fly.src = "sounds/fly.mp3";
scoreAudio.src = "sounds/score.mp3";

// khoi tao bien dieu khiien vi tri
var gap = 85;
var constant;
// chieu dai cua chim (truc hoanh)
var bX = 10;
// chieu cao cua chim khi bay (truc tung)
var bY = 150;

var gravity = 1.5;

//bien luu diem
var score = 0;

// on key down
document.addEventListener("keydown", moveUp);

function moveUp(){
  bY = -25; // bay len di chim oi
  fly.play();
}

// sap xep vi tri cac ong
var pipes = [];
pipes[0] = {x: cvs.width, y: 0};

// ve thoi nao
function draw(){
  ctx.drawImage(bg, 0, 0);
  for (var i = 0; i < pipes.length; i++){
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant);

    pipes[i].x--;
    if (pipes[i].x == 125){
      pipes.push({
        x: cvs.width,
        y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
      });
    }
    // phat hien va cham
    if( bX + bird.width >= pipes[i].x && bX <= pipes[i].x + pipeNorth.width &&
        (bY <= pipes[i].y + pipeNorth.height || bY+bird.height >= pipes[i].y+constant)
        || bY + bird.height >=  cvs.height - fg.height){
        location.reload(); // reload lai trang
    }
    if(pipes[i].x == 5){
      score++;
      scoreAudio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  bY += gravity;

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : "+score,10,cvs.height-20);

  requestAnimationFrame(draw);
}

draw();
