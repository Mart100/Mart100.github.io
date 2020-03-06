function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // draw puppets
  for(let puppet of puppets) puppet.draw()
}
