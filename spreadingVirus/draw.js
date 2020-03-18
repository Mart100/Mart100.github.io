let frameCount = 0

function frame() {

  frameCount++

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
  if(options.clearScreen == true) clearScreen()
  
  // draw puppets
  for(let puppet of puppets) puppet.draw()
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}