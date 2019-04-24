function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
}
