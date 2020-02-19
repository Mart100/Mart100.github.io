let pathDraw = []

function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw grid
  world.grid.draw()

  //world.grid.fillScreenSpots()
}
