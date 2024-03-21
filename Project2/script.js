const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("slider");

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;

const layer1 = new Image();
layer1.src = "img/layer-1.png";
const layer2 = new Image();
layer2.src = "img/layer-2.png";
const layer3 = new Image();
layer3.src = "img/layer-3.png";
const layer4 = new Image();
layer4.src = "img/layer-4.png";
const layer5 = new Image();
layer5.src = "img/layer-5.png";

class Layer {
    constructor(img, base_speed) {
        this.img = img;
        this.speed = base_speed;
        this.base_speed = base_speed;
        this.x = 0;
    }
    drawLayer() {
        if (this.x >= 2400) this.x = 0;
        ctx.drawImage(this.img, this.x%2400, 0, 720, 720, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(this.img, this.x%2400 - 2400, 0, 720, 720, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.x += Math.floor(10*this.speed);
    }
}

let layers = [
    new Layer(layer1, 0.1),
    new Layer(layer2, 0.2),
    new Layer(layer3, 0.3),
    new Layer(layer4, 0.4),
    new Layer(layer5, 0.5)
];

slider.addEventListener("change", (e) => {
    layers.forEach(element => {
        element.speed = element.base_speed * e.target.value;
    });
})

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers.forEach(element => {
        element.drawLayer();
    });
    requestAnimationFrame(animate);
}
animate();