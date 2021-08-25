const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth -50;
canvas.height = window.innerHeight - 50;

let spawnRate = 2000;
let segDim = 25;
let speed = 2;
let speedY = speed;
let speedX = 0;
let growthRate = 50;
let snake = Array(0); 
let edibles = Array(0);

class hitBox{
    constructor (x, y, dim) {
        this.x = x;
        this.y = y;
        this.dim = dim;
    }
    
}

class edible {
    constructor (x, y, dim) {
        this.x = x;
        this.y = y;
        this.dim = dim;
    }
    represent() {
        c.fillStyle = 'blue';
        c.fillRect(this.x, this.y, this.dim, this.dim);
    }
    colide(x, y, dim) {
        let r = false;
        if(this.x < x + dim &&
            this.x + this.dim > x &&
            this.y < y + dim &&
            this.y + this.dim > y) {
                r = true;
        }
        return r;
    }
}

class snakePiece {
    constructor (x, y, dim) {
        this.x = x;
        this.y = y;
        this.dim = dim;
        this.speedY = speedY;
        this.speedX = speedX;
    }

    represent() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.dim, this.dim);
    }
    
    update() {
        this.speedX = speedX;
        this.speedY = speedY;
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        this.represent();
        
    }
    follow(x, y){
        this.x = x+(speedX);
        this.y = y+(speedY);
    }
    colide(x, y, dim) {
        let r = false;
        if(this.x < x + dim &&
            this.x + this.dim > x &&
            this.y < y + dim &&
            this.y + this.dim > y) {
                r = true;
        }
        return r;
    }

    
}

snake.push(new snakePiece(4, 4, segDim));

enlargeTheSnake(4,4, 80);


let i = 1;
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.6)';//the fade happens here
    c.fillRect(0, 0, canvas.width, canvas.height);
   if(i < snake.length){
       snake[i].follow(snake[i-1].x,snake[i-1].y);
       i++;
   } else {
       i = 1;
   }
   for(let j = 1;j < snake.length; j++) {

       snake[j].represent();
   }
   for(let k = 49;k < snake.length; k++) {
    if(snake[k].colide(snake[0].x+speedX*2,snake[0].y+speedY*2, 10)) {//problema kad priekis visada liecia uodega
        //end game
        console.log("contacting");
    }
   }
    edibles.forEach((edible, i) => {
        edible.represent();
        if(edible.colide(snake[0].x,snake[0].y, snake[0].dim)) {
            enlargeTheSnake(snake[snake.length-1].x,snake[snake.length-1].y, growthRate);
            edibles.splice(i, 1);
        }
    }) 

    snake[0].update();

}

function enlargeTheSnake(x, y, howMuch){
    for(let k = 0;k < howMuch;k++){
        snake.push(new snakePiece(x+speedY, y+speedX, segDim));
    }
    
}

animate();
spawnEdibles();
document.addEventListener('keydown', move);
function move(e) {
    switch (e.keyCode) {
        case 37:
            speedX = -speed;
            speedY = 0;
            console.log("paspaudziau left");
            break;
        case 38:
            speedY = -speed;
            speedX = 0;
            console.log("paspaudziau up");
            break;
        case 39:
            speedX = speed;
            speedY = 0;
            console.log("paspaudziau right");
            break;
        case 40:
            speedY = speed;
            speedX = 0;
            console.log("paspaudziau down");
            break;
    }
};

function spawnEdibles(){
    setInterval(() => {
    
        const x = Math.random() * canvas.width;
        const y =  Math.random() * canvas.height;

        edibles.push(new edible(x, y, 10));

    }, spawnRate)
}


