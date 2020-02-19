let tickCount = 0

function tick() {

  tickCount++

  moving()
  
}

function moving() {
  let moved = false

  let speed = 10/world.grid.camera.zoom

  if(keys[87] || keys[38]) { // north
    world.grid.move({x:0,y:speed})
    moved = true
  }
  if(keys[68] || keys[39]) { // east
    world.grid.move({x:-speed,y:0})
    moved = true
  }
  if(keys[83] || keys[40]) { // south
    world.grid.move({x:0,y:-speed})
    moved = true
  }
  if(keys[65] || keys[37]) { // west
    world.grid.move({x:speed,y:0})
    moved = true
  }

  if(!moved) return

  infoPanel.add('posX', world.grid.camera.pos.x)
  infoPanel.add('posY', world.grid.camera.pos.y)
}