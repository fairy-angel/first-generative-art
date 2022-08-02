/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext ('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing= false;

class Root{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() *4-2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 +2;
        this.vs = Math.random() * 2 + 0.05;
        this.angle = Math.random() * 6.2;
    }
update(){
    this.x += this.speedX + Math.sin(this.angle);
    this.y += this.speedY + Math.sin(this.angle);
    this.size += this.vs;
    this.angle += 0.1
    if(this.lightness <70) this.lightness =+ .25;
    if(this.size < this.maxSize){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(140,100%,+ this.lightness + %)';
        ctx.fill();
        ctx.stroke();
        requestAnimationFrame(this.update.bind(this));
        }
    }       
}
class Flower{
    constructor(x, y, size)
}
    window.addEventListener('mousemove',function(e){
        for (let i = 0; i < 3; i++){
        const root = new Root(e.x, e.y);
        root.update();
        }
});
window.addEventListener('mousedown', function(){
    drawing = true;
});

window.addEventListener('mouseup', function(){
    drawing = false;});