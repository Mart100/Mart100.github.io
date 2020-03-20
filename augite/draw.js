function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // draw player
  ctx.fillStyle = 'rgb(255, 255, 255)'
  ctx.beginPath()
  ctx.arc(player.pos.x, player.pos.y, player.size, 0, 2 * Math.PI)
  ctx.fill()
}
