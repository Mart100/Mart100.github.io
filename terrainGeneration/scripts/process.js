function tick() {
  moving()
  
  if(settings.timeEnabled) {
    time += settings.timeSpeed
    if(time > 86400) time = 0
    debugPanel.add('Time', Math.floor(time/3600)+' Hours')
  } else debugPanel.remove('Time')

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