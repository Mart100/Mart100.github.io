function tick() {
  if(settings.isPaused) return
  let start = performance.now()
  tileTick()

  displayTileInfo()
  debugPanel.add('tickTime', performance.now()-start)

  for(let i=0;i<particles.length;i++) particleTick(particles[i])
}

function tileTick() {
  let sped = settings.speed
  grid.forEveryTile((x, y, tile) => {

    // decrease durability of wood
    if(tile.temperature > 100 && tile.durability > 0) {
      let newDurability = tile.durability - tile.temperature/sped
      grid.setTile(x, y, 'durability', newDurability)
      tile.temperature += tile.temperature/sped
    }

    if(tile.temperature > 20) {
      // spread heat to neighbors
      if(x != grid.width-1)  grid.setTile(x+1, y, 'temperature', (grid.getTile(x+1, y).temperature + tile.temperature/sped/4))
      if(y != 0)             grid.setTile(x, y-1, 'temperature', (grid.getTile(x, y-1).temperature + tile.temperature/sped/4))
      if(y != grid.height-1) grid.setTile(x, y+1, 'temperature', (grid.getTile(x, y+1).temperature + tile.temperature/sped/4))
      if(x != 0)             grid.setTile(x-1, y, 'temperature', (grid.getTile(x-1, y).temperature + tile.temperature/sped/4))
      tile.temperature -= tile.temperature/sped

      // slowly cool down
      tile.temperature -= tile.temperature/sped/35
    }

    if(tile.temperature > 200 && settings.particles && tile.durability > 0 && Math.random() > 0.96) {
      // Particles
      let particleSett = {
        position: new Vec2(x*settings.detail, y*settings.detail),
        velocity: new Vec2(randomRange(-0.2, 0.2), randomRange(-0.2, 0.2)),
        color: [randomRange(0, 255), 0, 0, 0.5],
        fadeAway: 1000,
        shape: new Vec2(randomRange(5, 10),randomRange(5, 10))
      }
      particles.push(new Particle(particleSett))
    }
  })
}

function particleTick(particle) {
  fadeAway(particle)
  applyVelocity(particle)
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