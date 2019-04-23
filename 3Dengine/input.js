function inputHandler() {
  // keys
  $(document).keyup(function(event) { input.keys[event.keyCode] = false })
  $(document).keydown(function(event) { input.keys[event.keyCode] = true })

  // when mouse move
  document.addEventListener("mousemove", (event) => {
    input.mouse.movement = {x: event.movementX, y: event.movementY, latest: 0}
    debugPanel.add('mouseMov', {x: event.movementX, y: event.movementY})
  })

  // on mouse lock and unlock
  if("onpointerlockchange" in document) {
    document.addEventListener('pointerlockchange', lockChange, false)
  } else if("onmozpointerlockchange" in document) {
    document.addEventListener('mozpointerlockchange', lockChange, false)
  }

  function lockChange() {
    if(document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) input.mouse.locked = true
    else input.mouse.locked = false
  }



  // loop
  setInterval(() => {
    let player = World.player

    player.movement.walking = false
    // keys
    // moving
    if(input.keys[87]) { // W
      let rot = player.rot.y + Math.PI/2
      let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
      vec.multiply(player.movement.speed)
      player.pos.plus(vec)
      player.movement.walking = true
    }
    if(input.keys[83]) { // S
      let rot = player.rot.y - Math.PI/2
      let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
      vec.multiply(player.movement.speed)
      player.pos.plus(vec)
      player.movement.walking = true
    }
    if(input.keys[65]) { // A
      let rot = player.rot.y
      let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
      vec.multiply(player.movement.speed)
      player.pos.plus(vec)
      player.movement.walking = true
    }
    if(input.keys[68]) { // D
      let rot = World.camera.rot.y - Math.PI
      let vec = new Vector(Math.cos(rot), 0, Math.sin(rot))
      vec.multiply(player.movement.speed)
      player.pos.plus(vec)
      player.movement.walking = true
    }
    if(input.keys[16]) { // SHIFT
      if(settings.fly) player.pos.y -= 2
      // else if fly disabled. Sprint
      else player.movement.speed = 3

    }
    if(!input.keys[16]) { // SHIFT OFF
      // stop sprint
      player.movement.speed = 1

    }
    if(input.keys[32]) { // SPACE
      // only if player is not in fly. Not jumping. and on ground
      if(!settings.fly && player.movement.jumping == 0 && player.pos.y < 1) {
        player.movement.jumping = 50
        player.movement.jumpingInterval = setInterval(() => {
          player.pos.y += 8
          player.movement.jumping--
          if(player.movement.jumping == 0) clearInterval(player.movement.jumpingInterval)
        }, 10)
      }
      // if player is flying. Just go up
      if(settings.fly) player.pos.y += 2 
    }
    
    let mouseMov = input.mouse.movement

    // if mouse moved in last 10ms and mouse is locked: rotate player 
    if(mouseMov.latest < 10 && input.mouse.locked) {
      player.rot.y = ((mouseMov.x)/1000)+player.rot.y

      // x rotation
      if(mouseMov.y > 0 && player.rot.x > 0 ||
        mouseMov.y < 0 && player.rot.x < Math.PI) {
        player.rot.x = ((mouseMov.y)/-1000)+player.rot.x
      }
    }

    // update latest mouse movement
    mouseMov.latest++

  }, 1)

}