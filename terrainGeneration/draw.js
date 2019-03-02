function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw funtions
  draw.background()
}

const draw = {
  background() {
    // some vars
    let cz = camera.zoom
    let ch = canvas.height
    let cw = canvas.width
    let cpx = camera.pos.x
    let cpy = camera.pos.y
    let r = 0
    let b = 30
    let loadedTiles = 0

    let xStart = Math.round(cpx - cw/cz)
    let xEnd = Math.round(cpx + cw/cz)
    let yStart = Math.round(cpy - ch/cz)
    let yEnd = Math.round(cpy + ch/cz)

    let plus = 1
    plus = Math.ceil(15/cz)

    console.log('plus: ',plus)

    for (let x = xStart; x <= xEnd; x += plus) {
      for (let y = yStart; y <= yEnd; y += plus) {
        if(world[x] == undefined || world[x][y] == undefined) {
          if(loadedTiles < loadTilesPerSec) {
            loadedTiles++
            loadTile(x, y)
          }
          continue
        }
        let strength = world[x][y].strength

        if(strength > 100) ctx.fillStyle = `rgb(20, 150, 20)`
        if(strength < 100) ctx.fillStyle = `rgb(20, 20, 150)`
        //ctx.fillStyle = `rgb(${color}, ${color}, ${color})`
        let pos = {}
        pos.x = cw/2 + (x-cpx)*cz
        pos.y = ch/2 + (y-cpy)*cz
        ctx.fillRect(pos.x, pos.y, cz*plus+1, cz*plus+1)
      }
    }
  }
}
