function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // add to fps
  fps++

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
    plus = Math.ceil(10/cz)

    let c1 = document.createElement("canvas")
    var ctx1 = c1.getContext("2d");

    let imgData = ctx1.createImageData(canvas.width/5, canvas.height/5)


    for (var i=0; i<imgData.data.length; i+=4) {
      let x = Math.floor((i/4)%canvas.width/5)
      let y = Math.floor(i/((canvas.width/5)*4))

      let tx = Math.round(x*(1/camera.zoom) + camera.pos.x)
      let ty = Math.round(y*(1/camera.zoom) + camera.pos.y)

      // if tile is undefined. Load tile
      if(world[tx] == undefined || world[tx][ty] == undefined) {
        if(loadedTiles < loadTilesPerSec) {
          loadedTiles++
          loadTile(x, y)
        }
        continue
      }


      let tile = world[tx][ty]
      let rgb = []

      if(tile.biome == 'ocean') rgb = [10, 10, 200]
      else if(tile.biome == 'forest') rgb = [10, 100, 10]

      imgData.data[i] = rgb[0]
      imgData.data[i+1] = rgb[1]
      imgData.data[i+2] = rgb[2]
      imgData.data[i+3] = 255
    }
    ctx1.putImageData(imgData, 0, 0)

    ctx.drawImage(c1, 0, 0, canvas.width, canvas.height)
  }
}




/*
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
    plus = Math.ceil(10/cz)

    for (let x = xStart; x <= xEnd; x += plus) {
      for (let y = yStart; y <= yEnd; y += plus) {
        if(world[x] == undefined || world[x][y] == undefined) {
          if(loadedTiles < loadTilesPerSec) {
            loadedTiles++
            loadTile(x, y)
          }
          continue
        }
        let tile = world[x][y]

        if(tile.biome == 'ocean') ctx.fillStyle = `rgb(10, 10, 200)`
        else if(tile.biome == 'forest') ctx.fillStyle = `rgb(10, 100, 10)`


        let pos = {}
        pos.x = cw/2 + (x-cpx)*cz
        pos.y = ch/2 + (y-cpy)*cz
        ctx.fillRect(pos.x, pos.y, cz*plus+1, cz*plus+1)
      }
    }

*/