function frame() {
  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw grid
  grid.draw()

  let pstart = performance.now()
  
  // draw particles
  for(let p of particles) p.draw()

  debugPanel.add('ParticleFrameTime', performance.now()-pstart)

}