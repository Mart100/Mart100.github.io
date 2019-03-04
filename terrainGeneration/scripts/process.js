function tick() {
  moving()
  
}

function moving() {
  // if typing. Return
  if(inConsole()) return
  let moved = false


  if(keys[87] || keys[38]) { // north
    camera.pos.y -= 1/camera.zoom *camera.speed
    moved = true
  }
  if(keys[68] || keys[39]) { // east
    camera.pos.x += 1/camera.zoom *camera.speed
    moved = true
  }
  if(keys[83] || keys[40]) { // south
    camera.pos.y += 1/camera.zoom *camera.speed
    moved = true
  }
  if(keys[65] || keys[37]) { // west
    camera.pos.x -= 1/camera.zoom *camera.speed
    moved = true
  }

  if(!moved) return

  displayTileInfo()
  debugPanel.add('posX', camera.pos.x)
  debugPanel.add('posY', camera.pos.y)
}