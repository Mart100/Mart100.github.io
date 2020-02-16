let tickCount = 0

function tick() {

  tickCount++

  moving()

  if(tickCount % 10 == 0) {
    showSelectedConnectonInfo()
    infoPanel.add('Connectons', world.connectons.length)
  }
  
}

function showSelectedConnectonInfo() {
  let c = selectedConnecton
  if(!c) return $('#connectoninfo').html('')
  let html = `
  Selected Connecton:<br>
  - posX: ${c.pos.x}<br>
  - posY: ${c.pos.y}<br>
  - age: ${c.age}<br>
  - name: ${c.name}<br>
  - hunger: ${c.hungerAmount}<br>
  - sleep: ${c.sleepAmount}<br>
  - balance: ${c.balance}<br>
  `

  $('#connectoninfo').html(html)
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

  selectedConnecton = undefined

  displayTileInfo()
  infoPanel.add('posX', world.grid.camera.pos.x)
  infoPanel.add('posY', world.grid.camera.pos.y)
}