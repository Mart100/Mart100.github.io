function tick() {
  if(world.tickCount % 10 == 0) {
    for(let item of world.droppedItems) item.checkPickup()
  }
  if(world.tickCount % 50 == 0) calculateLightLevels()
  for(let enemy of world.enemies) {
    enemy.move()
    enemy.tryDamagePlayer()
  }
}
