function tick() {
  moving()
  
}

function moving() {
  // if typing. Return
  if(inConsole()) return


  if(keys[87] || keys[38]) camera.pos.y -= 100/camera.zoom // north
  if(keys[68] || keys[39]) camera.pos.x += 100/camera.zoom // east
  if(keys[83] || keys[40]) camera.pos.y += 100/camera.zoom // south
  if(keys[65] || keys[37]) camera.pos.x -= 100/camera.zoom // west
  debugPanel.add('posX', camera.pos.x)
  debugPanel.add('posY', camera.pos.y)
}