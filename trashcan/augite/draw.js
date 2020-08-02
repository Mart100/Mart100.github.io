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

  // draw walls
  ctx.fillRect(0, 0, canvas.width, walls[0])
  ctx.fillRect(canvas.width-walls[1], 0, walls[1], canvas.height)
  ctx.fillRect(0, canvas.height-walls[2], canvas.width, walls[2])
  ctx.fillRect(0, 0, walls[3], canvas.height)
}
