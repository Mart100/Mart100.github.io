function tick() {
  if(isPaused) return
  
  // call functions
  for(let particle of particles) particleTick(particle)
}

function particleTick(particle) {

  // call functions
  applyGravity(particle)
  applyVelocity(particle)
  applyForces(particle)
  fadeAway(particle)
}

function applyGravity(particle) {
  particle.velocity.x += Psettings.gravity.x
  particle.velocity.y += Psettings.gravity.y
}

function applyVelocity(particle) {
  particle.position.x += particle.velocity.x
  particle.position.y += particle.velocity.y
}
function fadeAway(particle) {
  if(particle.fadeAway) {
    let time = Date.now() - particle.created
    particle.color[3] = particle.startColor[3] - (time/particle.fadeAway)*particle.startColor[3]

    if(particle.color[3] < 0) particle.delete()
  }
}
function applyForces(particle) {
  for(let force of particle.forces) {
    particle.position.x += force.x
    particle.position.y += force.y
  }
}