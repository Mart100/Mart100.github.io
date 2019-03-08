function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw raindrops
  for(let i=0;i<raindrops.length;i++) {
    ctx.save()
    let raindrop = raindrops[i]
    ctx.fillStyle = `rgba(0, 0, 255, ${raindrop.opacity/2})`
    let rot = radToGrad(settings.wind.speed*-2)
    if(settings.wind.direction == 'left') rot *= -1
    if(settings.wind.enabled) ctx.rotate(rot)
    ctx.fillRect(raindrop.x, raindrop.y, raindrop.size, raindrop.size*3)
    ctx.restore()
  }

}

function radToGrad(rad) {
  return rad*Math.PI/180
}