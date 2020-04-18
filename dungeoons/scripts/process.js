function tick() {
  
  movingTick()
  
  world.animationTickTwo = Math.floor(world.tickCount/50)%2

  if(world.tickCount % 10 == 0) {
    for(let item of world.droppedItems) item.checkPickup()
  }

  if(world.tickCount % 50 == 0) calculateLightLevels()
  
  for(let particle of world.particles) particle.tick()

  for(let enemy of world.enemies) {
    enemy.move()
    enemy.tryDamagePlayer()
  }
}
