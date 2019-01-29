function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // loop trough grid
  for(let x=0; x<grid.length; x++) {
    for(let y=0; y<grid[x].length; y++) {
      let type = grid[x][y]

      if(type == 'r') ctx.fillStyle = `rgb(${lsdLevel}, 0, 0`
      if(type == 'g') ctx.fillStyle = `rgb(0, ${lsdLevel}, 0`
      if(type == 'b') ctx.fillStyle = `rgb(0, 0, ${lsdLevel}`
      if(type == 'n') ctx.fillStyle = `rgb(${lsdLevel}, ${lsdLevel}, ${lsdLevel}`

      ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
    }
  }
  
}
