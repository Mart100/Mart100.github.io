function frame() {

  window.requestAnimationFrame(frame)

	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw particles

  ctx.shadowColor = 'rgb(255,255,255)'
  ctx.fillStyle = 'rgb(255,255,255)'
  ctx.lineCap = 'butt'

  for(let p of particles) {
    let PaP = p.position

    let colorZ = ( PaP.z/1000 )

    if(colorZ > 1) colorZ = 1
    if(colorZ < 0) colorZ = 0


    let rgb = HSVtoRGB(colorZ, 1, 1)

    ctx.fillStyle = `rgb(${rgb.r}, ${rgb.b}, ${rgb.g})`
    
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

      if(distance > 150) continue

      if(distance > 100) p1.velocity = p2.velocity.clone().plus(new Vector().randomize().minus(0.5).multiply(distance/50)).setMagnitude(10)
  
      ctx.lineWidth = (150 - distance)/150

      let betweenZ = (p1.position.z+p2.position.z)/2
      let colorZ = ( betweenZ/1000 )

      if(colorZ > 1) colorZ = 1
      if(colorZ < 0) colorZ = 0

      let rgb = HSVtoRGB(colorZ, 1, 1)

      ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.b}, ${rgb.g})`

      ctx.beginPath()
      ctx.moveTo(p1.position.x, p1.position.y)
      ctx.lineTo(p2.position.x, p2.position.y)
      ctx.stroke()
    }
  }
}
