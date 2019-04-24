function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // loop trough cells
  ctx.lineWidth = 3
  for(let cellID in cells) {
    let cell = cells[cellID]
    
    ctx.beginPath()
    ctx.strokeStyle = '#000000'
    if(cell.dead) ctx.strokeStyle = '#f40404'
    ctx.fillStyle = `rgb(${cell.color[0]}, ${cell.color[1]}, ${cell.color[2]})`
    ctx.arc(cell.pos.x, cell.pos.y, 10, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()

  }

  // draw food
  for(let food of foods) {
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = 'rgb(40, 0, 0)'
    ctx.fillStyle = `rgb(255, 0, 0)`
    ctx.arc(food.pos.x, food.pos.y, 20, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }

}
