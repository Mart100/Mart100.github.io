function frame() {
  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // call functions
  drawButtons()
  drawParticles()

}

function drawParticles() {
  for(let p of particles) p.draw()
}

function drawButtons() {
  let i = 0
  let buttonsNotTouched = 0
  for(let buttonName in buttons) {

    // some vars
    let button = buttons[buttonName]
    let radius = 10
    let width = button.width
    let height = button.height
    let text = button.text
    let x = button.x
    let y = button.y

    if(!button.visible) continue

    // if mouse over button
    if(mouse.pos.x > x && mouse.pos.x < x+width && mouse.pos.y > y && mouse.pos.y < y+height) {
      width += 10
      height += 10
      x -= 5
      y -= 5
      setMouseCursor('pointer')
    } else {
      buttonsNotTouched++
    }

    // draw rounded rectangle
    ctx.fillStyle = button.color
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()

    // draw text
    ctx.font = `${button.fontSize}px Arial`
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle' 
    ctx.fillText(text, x+width/2, y+height/2)


    i++
  }
  if(buttonsNotTouched == i) setMouseCursor('default')
}
