let canvas, ctx
let particles = []

$(() => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  createParticles()

  frame()
  setInterval(() => { tick() }, 10)
})

function createParticles() {
  for(let i=0;i<350;i++) {
    let p = new Particle()
    
    p.position.x = Math.random()*canvas.width
    p.position.y = Math.random()*canvas.height
    p.position.z = Math.random()*1000

    p.velocity.x = (Math.random()-0.5)*5
    p.velocity.y = (Math.random()-0.5)*5
    p.velocity.z = (Math.random()-0.5)*5

    particles.push(p)
  }
}

class Particle {
  constructor() {
    this.position = new Vector(0, 0, 0)
    this.velocity = new Vector(0, 0, 0)
  }
}

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}