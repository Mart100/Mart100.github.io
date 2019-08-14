function frame() {

  window.requestAnimationFrame(frame)

	ctx.clearRect(0, 0, canvas.width, canvas.height)

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
}