const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function heartFunction(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return { x, y };
}

class Particle {
  constructor(x, y) {
    this.baseX = x; // original position (important!)
    this.baseY = y;

    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 2 + 1.5; // small circle = readable

    this.speed = 0.02; // slow motion
    this.alpha = 1;
  }

  draw() {
    let x = this.baseX + Math.cos(this.angle) * this.radius;
    let y = this.baseY + Math.sin(this.angle) * this.radius;

    ctx.fillStyle = `rgba(255, 20, 147, ${this.alpha})`;
    ctx.fillText("I Love You", x, y);
  }

  update() {
    this.angle += this.speed; // circular motion
    this.alpha -= 0.01; // gentle fade
  }
}


let scale = 15;
let growing = true;

function createHeart() {
  if (growing) scale += 0.01;
else scale -= 0.01;

 if (scale > 15.5) growing = false;
 if (scale < 14.5) growing = true;

  for (let i = 0; i < Math.PI * 2; i += 0.12) {
    let pos = heartFunction(i);
    let x = canvas.width / 2 + pos.x * scale;
    let y = canvas.height / 2 - pos.y * scale;

    particles.push(new Particle(x, y));
  }
}
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.update();
    p.draw();

    if (p.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  createHeart();

  requestAnimationFrame(animate);
}

ctx.font = "12px Arial";
ctx.textAlign = "center";

animate();