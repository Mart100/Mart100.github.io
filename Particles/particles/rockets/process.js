function tick() {

  // rockets
  for(let rocketNum in rockets) {
    let rocket = rockets[rocketNum]

    // move rockets up
    rocket.y -= rocket.z

    // create particles
    for(let i=0;i<5;i++) {
      // change settings
      let settings = {}
      settings.velocity = new Vec2(getRandomRange(-rocket.z/4, rocket.z/4), getRandomRange(0, 1))
      settings.color = [getRandomRange(0, 255),0,0,getRandomRange(0, 1)]
      let shapesize = getRandomRange(0, rocket.z*3)
      settings.shape = new Vec2(shapesize, shapesize)
      settings.fadeAway = getRandomRange(500, 1000)
      settings.rocket = rocket.id
      settings.position = new Vec2(rocket.x, rocket.y)

      rocket.particles.push(new Particle(settings))
    }

    // loop trough particles
    for(particle of rocket.particles) {
      // apply velocity to particles
      particle.position.plus(particle.velocity)

      fadeAway(particle)

    }

    // remove rocket if too high
    if(rocket.y < 0) rockets.splice(rocketNum, 1)
  }

  // create new rockets
  if(rockets.length < 20) {
    let rocket = {
      particles: [],
      x: Math.random()*canvas.width,
      y: canvas.height,
      z: getRandomRange(2, 10),
      id: Math.random()*1000000
    }
    rockets.push(rocket)
  }
}

function fadeAway(particle) {
  if(particle.fadeAway) {
    let time = Date.now() - particle.created
    particle.color[3] = particle.startColor[3] - (time/particle.fadeAway)*particle.startColor[3]
    if(particle.color[3] < 0) particle.delete()
  }
}