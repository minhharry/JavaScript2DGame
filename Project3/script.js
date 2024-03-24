/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 1000;
CANVAS_HEIGHT = canvas.height = 500;

class Enemy {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.distX = 0;
        this.distY = 0;
    }
    setDist(x, y) {
        this.distX = x;
        this.distY = y;
    }
    sign(x) {
        if (x>0) return 1;
        return -1;
    }
    move() {
        let dx = this.sign(this.distX-this.x)*this.speed;
        let dy = this.sign(this.distY-this.y)*this.speed;
        this.x += dx;
        this.y += dy;
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x - this.width/2 + 5, this.y - this.height/2 + 5, this.width - 10, this.height -10);
    }
    randomPos() {
        this.setDist(this.x + Math.floor(200*Math.random()-100), this.y + Math.floor(200*Math.random()-100));
    }
}
let enemies = [];
for (let i = 1; i<=10; i++) {
    enemies.push(new Enemy(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 50, 50, 1))
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
document.onmousemove = (evt) =>  {
    var pos = getMousePos(canvas, evt);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let enemy of enemies) {
        enemy.setDist(pos.x, pos.y)
    }
}

document.onmousedown = (e) => {
    for (let enemy of enemies) {
        enemy.randomPos();
    }
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let enemy of enemies) {
        enemy.move();
    }
    requestAnimationFrame(animate);
}
animate();