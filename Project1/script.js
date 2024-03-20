const canvas1 = document.getElementById("canvas1");
const ctx = canvas1.getContext("2d");
const select = document.getElementById("animation");
select.onchange = updateFrame;

const CANVAS_WIDTH = canvas1.width = 500;
const CANVAS_HEIGHT = canvas1.height = 500;
console.log(CANVAS_WIDTH)
const spriteWidth = 575;
const spriteHeight = 523;

const dogImg = new Image();
dogImg.src = "img/shadow_dog.png";

animations = [6,6,6,8,10,5,6,6,11,3];
let frameX = 0;
let frameY = 0;

let FPS = 10;
let interval = 1000/FPS;

function animate(currentTime) {
    frameX = Math.floor(currentTime/interval) % animations[frameY];
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(dogImg, spriteWidth*frameX, spriteHeight*frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);    
    requestAnimationFrame(animate);
}
animate();
function updateFrame() {
    frameY = select.value;
}