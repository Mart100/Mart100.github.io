function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // loop trough grid
  for(let x=0; x<grid.length; x++) {
    for(let y=0; y<grid[x].length; y++) {
      let type = grid[x][y]

      if(type == 'r') ctx.fillStyle = 'red'
      if(type == 'g') ctx.fillStyle = 'green'
      if(type == 'b') ctx.fillStyle = 'blue'
      if(type == 'n') continue

      ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
    }
  }
  
}
