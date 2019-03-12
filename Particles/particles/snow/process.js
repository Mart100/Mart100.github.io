function tick() {
  let start = performance.now()
  if(settings.isPaused) return

  if(particles.length < settings.amount) {
    let t = (settings.amount-particles.length)/100
    debugPanel.add('t', t)

    for(let i=0;i<t;i++) spawnParticle()
  }

  for(let i=0;i<particles.length;i++) particleTick(particles[i])

  debugPanel.add('TickTime', performance.now()-start)
}
function spawnParticle() {
  let z = randomRange(2, 8)
  let Psettings = {
    position: new Vec2(randomRange(0, canvas.width), -10),
    color: [255, 255, 255, 1],
    size: z,
    z: z,
    swing: {
      now: 1,
      amount: randomRange(0, 2),
      speed: randomRange(0, 0.2)
    },
    forces: {
      'gravity': new Vec2(0, z),
      'swing': new Vec2(1, 0)
    }
  }
  particles.push(new Particle(Psettings))
}

function particleTick(particle) {
  fadeAway(particle)
  applyVelocity(particle)
  applyForces(particle)
  onGround(particle)

  if(particle.position.y > canvas.width) particle.delete()

}
function onGround(particle) {
  if(particle.fadeAway != 0) return

  let particleX = Math.floor(particle.position.x)
  let particleY = Math.floor(particle.position.y)

  let snowGridTile = grid.getTile(particleX, particleY)
  if(!snowGridTile) return
  if(particle.position.y < canvas.height-100) return

  particle.created = Date.now()
  particle.fadeAway = 500
  particle.forces = {}


  // add circle of snow
  let radius = 5
  let middle = new Vec2(particleX, particleY)
  for(let x=middle.x-radius;x<middle.x+radius;x++) addSnow(x)

}

function getDistanceBetween(a, b) {
  let dx = x - m1;
  let dy = y - m2;
  let distance = dx * dx + dy * dy;
}
function addSnow(x) {
  let notFound = true
  let y = grid.height
  while(notFound) {
    y--
    if(y < 0) notFound = false
    if(!grid.getTile(x, y)) {
      // check if low neighbors
      if(grid.getTile(x+5, y+1) == false) addSnow(x+5)
      else if(grid.getTile(x-5, y+1) == false) addSnow(x-5)
      else grid.setTile(x, y, true)
      notFound = false
    }
  }
}

function fadeAway(particle) {
  if(particle.fadeAway) {
    let time = Date.now() - particle.created
    particle.color[3] = particle.startColor[3] - (time/particle.fadeAway)*particle.startColor[3]
    if(particle.color[3] < 0) particle.delete()
  }
}

function applyVelocity(particle) {
  particle.position.x += particle.velocity.x
  particle.position.y += particle.velocity.y
}

function applyForces(particle) {
  for(let forceName in particle.forces) {
    let force = particle.forces[forceName]
    if(forceName == 'swing') {
      force.x = Math.sin(particle.settings.swing.now)*particle.settings.swing.amount
      particle.settings.swing.now += particle.settings.swing.speed
    }
    particle.position.x += force.x*settings.speed
    particle.position.y += force.y*settings.speed

  }
}