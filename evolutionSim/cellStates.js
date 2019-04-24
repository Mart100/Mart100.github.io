function decideState(cell) {
  cell.stateInfo = {}
  if(cell.pareReady > 100) cell.state = 'paring'
  if(cell.saturation < cell.brain.eating) cell.state = 'eating'
}

function getPareReady(cell) {
  let pareReady = 200
  if(cell.age < 1000) pareReady = 0
  return pareReady
}

function stateHunting(cell) {

}

function stateEating(cell) {

  // find target to eat
  let target = cell.stateInfo.target
  if(target == undefined) {
    target = foods.sort((a, b) => b.pos.clone().minus(cell.pos) - a.pos.clone().minus(cell.pos))[0]
    if(target == undefined) return
    cell.stateInfo.target = target
  }

  // move to target
  cell.moving = target.pos.clone().minus(cell.pos).setMagnitude(1)

  let distance = target.pos.clone().minus(cell.pos).getMagnitude()

  // Eat
  if(distance < 20) {
    target.amount -= 1
    if(target.amount < 0 && target != undefined) {
      foods.splice(foods.indexOf(target), 1)
      // reset targets
      cellsFunc((c) => { if(c.state == 'eating') c.stateInfo.target = undefined })
      cell.state = 'none'
    }
    cell.saturation += 1
    if(cell.saturation >= 100) cell.state = 'none'
  }

}

let once = false
function stateParing(cell) {

  // if gender 0. Just wait
  if(cell.gender == 0) return


  // find target to pare with
  let target = cell.stateInfo.target
  if(target == undefined) {
    target = findCell('distance', cell, (a) => { return (a.state == 'paring') && (a.gender == 0) })
    if(target == undefined) return
    cell.stateInfo.target = target
  }

  // move to target
  cell.moving = target.pos.clone().minus(cell.pos).setMagnitude(1)

  let distance = target.pos.clone().minus(cell.pos).getMagnitude()

  // do the thingy
  if(distance < 10) {
    let genetics = crossover(cell, target)
    if(Math.random() > 0.99) genetics = undefined
    new Cell(genetics)
    cell.state = 'none'
    target.state = 'none'
  }


}