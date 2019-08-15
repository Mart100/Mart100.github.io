function frame() {

  window.requestAnimationFrame(frame)

	ctx.clearRect(0, 0, canvas.width, canvas.height)


  /*// check if line
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

    ctx.beginPath()
    ctx.arc(mousePosRel.x + l.pos1.x, mousePosRel.y  + l.pos1.y, 10, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(l.pos1.x, l.pos1.y)
    ctx.lineTo(l.pos1.x + lineVec.x, l.pos1.y + lineVec.y)
    ctx.stroke()

  }*/

  // draw texts
  for(let t of map.texts) {

    ctx.font = `${t.size}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    let posX = t.position.x - map.offset.x
    let posY = t.position.y - map.offset.y

    ctx.fillText(t.text, posX, posY)
  }

  // draw lines
  ctx.lineWidth = 2
  for(let l of map.lines) {

    ctx.beginPath()
    let pos1X = l.pos1.x - map.offset.x
    let pos1Y = l.pos1.y - map.offset.y
    let pos2X = l.pos2.x - map.offset.x
    let pos2Y = l.pos2.y - map.offset.y

    ctx.moveTo(pos1X, pos1Y)
    ctx.lineTo(pos2X, pos2Y)
    ctx.stroke()
  }



  // draw selected
  let selectedType = selected.split('-')[0]
  let selectedID = selected.split('-')[1]

  if(selectedType == 'text') {

    let t = map.texts.find((t) => t.id == selectedID)


    ctx.font = `${t.size}px Arial`

    let textWidth = ctx.measureText(t.text).width

    ctx.lineWidth = 1

    let posX = t.position.x - map.offset.x
    let posY = t.position.y - map.offset.y
    
    let underLineY = Math.floor(posY+(t.size/2))
    ctx.beginPath()
    ctx.moveTo(posX-(textWidth/2), underLineY)
    ctx.lineTo(posX+(textWidth/2), underLineY)
    ctx.stroke()

    ctx.lineWidth = 3
    let ms = new Date().getMilliseconds()

    let appear = (ms>500)

    if(appear) {
      let cursorX = Math.floor(posX+(textWidth/2) + 3)
      ctx.beginPath()
      ctx.moveTo(cursorX, posY-(t.size/2))
      ctx.lineTo(cursorX, posY+(t.size/2))
      ctx.stroke()
    }
  }
  
  if(selectedType == 'line') {

    let l = map.lines.find((l) => l.id == selectedID)


    ctx.beginPath()
    ctx.arc(l.pos1.x, l.pos1.y, 5, 0, 2*Math.PI)
    ctx.stroke()


    ctx.beginPath()
    ctx.arc(l.pos2.x, l.pos2.y, 5, 0, 2*Math.PI)
    ctx.stroke()

  }
}