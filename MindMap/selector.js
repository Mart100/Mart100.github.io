function select(x, y) {

  selected = findAtMouse(x, y)
}

function findAtMouse(x, y) {
  let found = 'none'
  let mousePos = new Vector(x, y)

  // check if text
  for(let t of map.texts) {

    ctx.font = `${t.size}px Arial`
    let textWidth = ctx.measureText(t.text).width

    let posX = t.position.x - map.offset.x
    let posY = t.position.y - map.offset.y

    if(x < posX-(textWidth/2)) continue
    if(x > posX+(textWidth/2)) continue
    if(y < posY-(t.size/2)) continue
    if(y > posY+(t.size/2)) continue

    found = `text-${t.id}`

  }

  // check if line
  for(let l of map.lines) {

    let middleOfLine = l.pos1.clone().minus(l.pos2.clone()).divide(2).plus(l.pos2.clone())

    let lineVec = l.pos2.clone().minus(l.pos1)

    let lineLength = lineVec.getMagnitude()

    let lineAngle = lineVec.getAngle()

    // rotate mouse around line
    let mouseMapPos = new Vector(map.offset.x + mousePos.x, map.offset.y + mousePos.y)

    let mousePosRel = mouseMapPos.clone().minus(l.pos1)

    lineVec.rotate(Math.PI - lineAngle)
    mousePosRel.rotate(-lineAngle)

    lineVec.rotate(Math.PI)

    let mousePosRot = mousePosRel.clone().plus(l.pos1)
    let lineRot = lineVec.clone().plus(l.pos1)

    if(Math.random() > 0.99) console.log(mouseMapPos)
    if(Math.random() > 0.99) console.log(l.pos1, l.pos2)

    if(mousePosRot.x < l.pos1.x) continue
    if(mousePosRot.x > lineRot.x) continue
    if(mousePosRot.y < lineRot.y-10) continue
    if(mousePosRot.y > lineRot.y+10) continue

    found = `line-${l.id}`



  }

  return found
}