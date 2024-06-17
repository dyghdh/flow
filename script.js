const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const rippleRadius = 150;
const maxRippleRadius = 300;
const rippleSpeed = 3;
const ripples = [];

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = rippleRadius;
        this.alpha = 1.0;
    }

    draw() {
        if (this.radius > maxRippleRadius) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${this.alpha})`;
        ctx.stroke();
        ctx.closePath();

        this.radius += rippleSpeed;
        this.alpha -= 0.02;
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < ripples.length; i++) {
        ripples[i].draw();
        if (ripples[i].alpha <= 0) {
            ripples.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripples.push(new Ripple(x, y));
});

animate();

window.addEventListener('resize', function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});
