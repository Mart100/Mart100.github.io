let canvas 
let ctx
let particles = []

$(() => {
  canvas = $('#canvas')[0]
  ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  createParticles(150)

  frame()
  
  setInterval(() => { tick() }, 10)


  // HUD
  $('#spawn10').on('click', () => {
    createParticles(10)
  })
})

function createParticles(count) {
  for(let i=0;i<count;i++) createParticle()
}

function createParticle() {
  let randomX = Math.random()*canvas.width
  let randomY = Math.random()*canvas.height

  let particle = new Particle(randomX, randomY)

  particles.push(particle)
}

function tick() {
  for(let particle of particles) {
    particle.move()
    particle.bounceWalls()
    particle.bounceParticles()
    particle.gravitation()
  }
}

function frame() {
  window.requestAnimationFrame(frame)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for(let particle of particles) particle.draw()

}

function randomRGB() {
  let randomR = Math.random()*255
  let randomG = Math.random()*255
  let randomB = Math.random()*255
  let rgb = [randomR, randomG, randomB]
  return rgb
}