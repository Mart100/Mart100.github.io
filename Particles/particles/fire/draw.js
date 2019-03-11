function frame() {
  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw particles
  for(let p of particles) {
    ctx.beginPath()
    ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.color[3]})`
    let PaP = p.position // particle position
    ctx.fillRect(PaP.x, PaP.y, p.shape.x, p.shape.y)
  }

  // draw grid
  grid.draw()

}