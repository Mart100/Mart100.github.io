let cw
let ch

function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)

  // some variables
  cw = canvas.width
  ch = canvas.height

  if(inMenu && Math.random() > 0.99) return
  
	// clear screen
	ctx.clearRect(0, 0, cw, ch)

  drawMiddleLine()

  // draw ball
  ctx.fillStyle = ''
  ctx.beginPath()
  ctx.fillStyle = '#000000'
  ctx.arc(getBallPos().x, ch/2, 30, 0, 2*Math.PI)
  ctx.fill()

  // black borders gradient
  let bbg = ctx.createRadialGradient(cw/2, ch/2, 1, cw/2, ch/2, 400)
  bbg.addColorStop(0,"rgba(0,0,0,0)")
  bbg.addColorStop(1,"rgba(0,0,0,1)")

  // Fill with gradient
  ctx.fillStyle = bbg
  ctx.fillRect(0,0,cw,ch)

  // draw particles
  for(let p of particles) p.draw()

  // draw pathSegment
  drawPath()
}

function drawMiddleLine() {

  // draw middle line gradient 1
  let mlg1 = ctx.createLinearGradient(cw/2-15, 0, cw/2, 0)
  mlg1.addColorStop(0, 'rgba(0, 0, 0, 0)')
  mlg1.addColorStop(1, 'rgba(255, 255, 255, 1)')

  ctx.fillStyle = mlg1
  ctx.fillRect(cw/2-15, 0, 15, ch)

  // draw middle line gradient 2
  let mlg2 = ctx.createLinearGradient(cw/2+15, 0, cw/2, 0)
  mlg2.addColorStop(0, 'rgba(0, 0, 0, 0)')
  mlg2.addColorStop(1, 'rgba(255, 255, 255, 1)')

  ctx.fillStyle = mlg2
  ctx.fillRect(cw/2+15, 0, -15, ch)


  // draw middle line
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 15
  ctx.beginPath()
  ctx.moveTo(cw/2+0.5, 0)
  ctx.lineTo(cw/2+0.5, ch)
  ctx.stroke()
  
}

function drawPath() {
  // prepare
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 15

  // loop trough path
  for(let pos in path) {
    let wall = path[pos]

    let side
    if(wall.side == 'right') side = 100
    if(wall.side == 'left') side = -100
    // draw
    ctx.beginPath()
    ctx.moveTo(cw/2, ch/2+(pos-length))
    ctx.lineTo(cw/2+side, ch/2+(pos-length))
    ctx.stroke()
  }
}