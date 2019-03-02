function tick() {
  moving()
  
}

function moving() {
  if(keys[87] || keys[38]) camera.pos.y-- // north
  if(keys[68] || keys[39]) camera.pos.x++ // east
  if(keys[83] || keys[40]) camera.pos.y++ // south
  if(keys[65] || keys[37]) camera.pos.x-- // west
}