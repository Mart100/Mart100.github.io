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
  for(let i=0;i<250;i++) {
    let p = new Particle()
    
    p.position.x = Math.random()*canvas.width
    p.position.y = Math.random()*canvas.height

    p.velocity.x = (Math.random()-0.5)
    p.velocity.y = (Math.random()-0.5)

    particles.push(p)
  }
}