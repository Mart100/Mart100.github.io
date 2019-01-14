function tick() {
  if(settings.gravity != 0 && !settings.fly) {
    // if not on ground apply gravity
    if(World.player.pos.y > 0) World.player.pos.y -= settings.gravity
  }
  // Move camera
  
  // if firstPerson Set camera to player
  if(World.camera.mode == 'firstPerson') {
    World.camera.rot = World.player.rot.clone()
    World.camera.pos = World.player.pos.clone()
    World.camera.pos.y += World.player.height
  }

  // Loop trough objects
  for(let i in World.objects) {
    let object = World.objects[i]
    let objectS = object.settings

    // if object has follow property. Follow
    if(objectS.follow != undefined) {
      let follow = objectS.follow

      // otf = Object To Follow. so the target
      let otf = objectByID(follow.id)
      if(follow.id == 'player') otf = World.player

      object.setPos(otf.pos) // set position to target

      if(follow.rot != undefined) { // if rotation is specified
        let rot = new Vector()

        if(follow.rot.x) rot.edit('x', otf.rot.x)
        if(follow.rot.y) rot.edit('y', otf.rot.y)
        if(follow.rot.z) rot.edit('z', otf.rot.z)


        object.setRot(rot) // set Rotation to target
      }

    }
  }
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