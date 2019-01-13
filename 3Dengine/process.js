function tick() {
  if(settings.gravity != 0 && !settings.fly) {
    // if not on ground apply gravity
    if(World.player.pos.y > 0) World.player.pos.y -= settings.gravity
  }
  // Move camera
  
  // if firstPerson Set camera to player
  if(World.camera.mode == 'FirstPerson') {
    World.camera.rot = World.player.rot.clone()
    World.camera.pos = World.player.pos.clone()
    World.camera.pos.y += World.player.height
  }

  // Teleport cube to player position
  World.player.cube.setPos('all', World.player.pos)
}


let animationCount = 0
setInterval(() => {
  animationCount++

  // Walking and sprinting and breathing animation
  if(!settings.fly && World.player.pos.y < 1) {
    if(World.player.movement.walking) {
      World.player.height = 200 - Math.cos((animationCount/20)*World.player.movement.speed)*World.player.movement.speed*10
    } else {
      World.player.height = 200 - Math.cos(animationCount/50)*5
    }
  }
}, 10)