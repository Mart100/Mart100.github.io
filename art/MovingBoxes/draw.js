function frame() {

  window.requestAnimationFrame(frame)

	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw boxes

  ctx.shadowColor = 'rgb(255,255,255)'
  ctx.fillStyle = 'rgb(255,255,255)'
  ctx.lineCap = 'butt'

  // sort boxes on z
  boxes.sort((a, b) => a.z-b.z)

  for(let b of boxes) {
    let BaP = b.position

    ctx.fillStyle = `rgba(${b.color[0]}, ${b.color[1]}, ${b.color[2]}, ${b.opacity})`
    
    ctx.beginPath()

    let pos = new Vec2(BaP.x, BaP.y).minus(b.size.clone().divide(2))
    ctx.rect(pos.x, pos.y, b.size.x, b.size.y)
    ctx.fill()
  }

}
