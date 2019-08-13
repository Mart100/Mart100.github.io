function frame() {

  window.requestAnimationFrame(frame)

	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw particles

  ctx.shadowColor = 'rgb(255,255,255)'
  ctx.fillStyle = 'rgb(255,255,255)'
  ctx.lineCap = 'butt'

  for(let p of particles) {
    let PaP = p.position
    
    ctx.beginPath()
    ctx.arc(PaP.x, PaP.y, 2, 0, 2*Math.PI)
    ctx.fill()
  }

  // draw lines between particles

  ctx.strokeStyle = 'rgb(255,255,255)'
  ctx.lineCap = 'round'

  for(let p1 of particles) {
    for(let p2 of particles) {

      if(p1.position.x == p2.position.x && p1.position.y == p2.position.y) continue

      let distance = p1.position.clone().minus(p2.position.clone()).getMagnitude()

      if(distance > 100) continue
  
      ctx.lineWidth = (100 - distance)/100

      ctx.beginPath()
      ctx.moveTo(p1.position.x, p1.position.y)
      ctx.lineTo(p2.position.x, p2.position.y)
      ctx.stroke()
    }
  }
}
