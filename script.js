const canvas = document.querySelector("#starfield");
const ctx = canvas.getContext("2d");
const typingText = document.querySelector("#typing-text");

const phrases = [
  "載入個人訊號中",
  "Learning in public",
  "Building ideas into interfaces",
  "Ready for the next project"
];

let particles = [];
let width = 0;
let height = 0;
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(110, Math.floor((width * height) / 11500));
  particles = Array.from({ length: count }, () => createParticle());
}

function createParticle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    radius: Math.random() * 1.7 + 0.7,
    hue: Math.random() > 0.55 ? "51, 240, 255" : "141, 255, 111"
  };
}

function moveParticle(particle) {
  particle.x += particle.vx;
  particle.y += particle.vy;

  if (particle.x < -20) particle.x = width + 20;
  if (particle.x > width + 20) particle.x = -20;
  if (particle.y < -20) particle.y = height + 20;
  if (particle.y > height + 20) particle.y = -20;
}

function drawConnections() {
  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const first = particles[i];
      const second = particles[j];
      const dx = first.x - second.x;
      const dy = first.y - second.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 130) {
        const alpha = 1 - distance / 130;
        ctx.strokeStyle = `rgba(51, 240, 255, ${alpha * 0.18})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.stroke();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle) => {
    moveParticle(particle);
    ctx.fillStyle = `rgba(${particle.hue}, 0.82)`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  drawConnections();
  requestAnimationFrame(draw);
}

function typeLoop() {
  const phrase = phrases[phraseIndex];
  const nextText = phrase.slice(0, letterIndex);
  typingText.textContent = `${nextText}${letterIndex % 2 === 0 ? "_" : ""}`;

  if (!isDeleting && letterIndex < phrase.length) {
    letterIndex += 1;
  } else if (isDeleting && letterIndex > 0) {
    letterIndex -= 1;
  } else if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeLoop, 1100);
    return;
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeLoop, isDeleting ? 48 : 86);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
draw();
typeLoop();
