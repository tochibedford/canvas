let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

const colors = [
    '#00bdff',
    '#4d39ce',
    '#088eff'
]

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
window.addEventListener('mousemove', event=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

function randomIntFromRange(min, max){
    return Math.floor(min+Math.random()*(max-min))
}

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI*2;
    this.velocity = 0.05;
    this.rotationRadius = {x:randomIntFromRange(50, 120),y:randomIntFromRange(50, 120)};
    this.lastMouse = {x:x, y:y};

    this.getOriginalRadius = function(){
        return originalRadius;
    }

    this.draw = ()=>{
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = ()=>{
        this.radians += this.velocity;
        // drag
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.rotationRadius.x;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.rotationRadius.y;
        
        this.draw();
    }
}

let particles;
function init(){
    particles = [];
    for (let i = 0; i<30; i++){
        let radius = randomIntFromRange(3,8)
        let color = colors[randomIntFromRange(0,colors.length)]
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, color))
    }
}

var grd = ctx.createLinearGradient(canvas.width/2,0,canvas.width/2, canvas.height)
grd.addColorStop(0, "#74EBD541");
// grd.addColorStop(0.5, "#6284ff11");
grd.addColorStop(1, "#9FACE641");

function animate(){
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.globalAlpha = 0.2;
    particles.forEach(particle=>{
        particle.update();
    });
}
init()
animate();