let pathDraw = []

function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw grid
  world.grid.draw()

  // draw connectons
  for(let connecton of world.connectons) {
    ctx.fillStyle = 'rgb(255, 0, 0)'
    let pos = connecton.pos
    let zoom = world.grid.camera.zoom
    let pixWidth = world.grid.canvas1.width
    let screenPos = world.grid.gridToWindowPos(pos.x+0.5, pos.y+0.5)

    ctx.beginPath()
    ctx.arc(screenPos.x, screenPos.y, zoom/2, 0, 2 * Math.PI)
    ctx.fill()

    // draw path of connecton
    if(connecton.path.length > 0) {
      let path = connecton.path
      ctx.strokeStyle = 'rgb(0, 255, 0)'
      ctx.beginPath()
      for(let i in path) {
        let seg = path[i]
        let screenPos = world.grid.gridToWindowPos(seg.x+0.5, seg.y+0.5)
        if(i == 0) ctx.moveTo(screenPos.x, screenPos.y)
        else ctx.lineTo(screenPos.x, screenPos.y)
      }
      ctx.stroke()
    }
  }

  // draw pathDraw


  //world.grid.fillScreenSpots()
}
