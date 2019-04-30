let tickCount = 0

function tick() {
  // increate tick count
  tickCount++

  // spawn food
  if(tickCount % 50 == 0) {
    foods.push({
      pos: new Vector(randomRange(0, window.innerWidth), randomRange(0, window.innerHeight)),
      amount: 500
    })
  }

  // cellTicks
  for(let cellID in cells) cellTick(cells[cellID])

  // debugPanelInfo
  debugPanelInfo()
}

function cellTick(cell) {


  // collision
  cellToCellCollision(cell)
  wallCollision(cell)

  // decrease saturation
  cell.saturation -= 0.1

  // age
  cell.age += 1

  // pareReady
  cell.pareReady = getPareReady(cell)

  // die
  if(cell.saturation < 0) cell.die()

  // move cell
  cell.pos.plus(cell.moving.setMagnitude(cell.speed * 10))

  // decompose
  if(cell.dead) cell.decomposing -= 0.1

  // remove cell if decomposed
  if(cell.decomposing < 0) cell.remove()

  // get cell state
  if(cell.state == 'none' && !cell.dead) decideState(cell)

  // cell states
  if(cell.state == 'hunting') stateHunting(cell)
  if(cell.state == 'paring') stateParing(cell)
  if(cell.state == 'eating') stateEating(cell)
}

function cellToCellCollision(cell) {
  if(!settings.cellCollision) return
  for(let cellID in cells) {
    if(cellID == cell.id) continue
    let cell1 = cells[cellID]
    let vec = cell.pos.clone().minus(cell1.pos)
    let distance = vec.getMagnitude()
    if(distance < 10) cell.pos.minus(new Vector(1, 1).minus(vec))
  }
}

function wallCollision(cell) {
  if(cell.pos.x < 10) cell.pos.x = 10
  if(cell.pos.x > window.innerWidth-20) cell.pos.x = window.innerWidth-20
  if(cell.pos.y < 10) cell.pos.y = 10
  if(cell.pos.y > window.innerHeight-20) cell.pos.y = window.innerHeight-20
}

function debugPanelInfo() {
  let cellAmount = 0
  cellsFunc((c) => { 
    if(c.dead) return
    cellAmount++
  })
  debugPanel.add('Cells', cellAmount)
  debugPanel.add('TickCount', tickCount)
}