function frame() {

  // rerun frame
  setTimeout(() => { window.requestAnimationFrame(frame) }, 5)
  
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

    let swidth = canvas.width/settings.detail
    let sheight = canvas.height/settings.detail
    c1.width = swidth
    c1.height = sheight
    let imgData = ctx1.createImageData(swidth, sheight)


    for (var i=0; i<imgData.data.length; i+=4) {
      let x = Math.floor((i/4)%swidth)
      let y = Math.floor(i/((swidth)*4)) 

      let tx = Math.round(x/camera.zoom + camera.pos.x)
      let ty = Math.round(y/camera.zoom + camera.pos.y)

      // if tile is undefined. Load tile
      if(world[tx] == undefined || world[tx][ty] == undefined) {
        if(loadedTiles < loadTilesPerSec) {
          loadedTiles++
          loadTile(tx, ty)
        }
      }


      let tile = world[tx][ty]
      let rgb = []

      if(tile.biome == 'ocean') rgb = [10, 10, 200]
      else if(tile.biome == 'forest') rgb = [10, 50, 10]
      else if(tile.biome == 'grassland') rgb = [10, 120, 10]

      imgData.data[i] = rgb[0]
      imgData.data[i+1] = rgb[1]
      imgData.data[i+2] = rgb[2]
      imgData.data[i+3] = 255
    }
    ctx1.putImageData(imgData, 0, 0)

    if(settings.pixelated) {
      ctx.mozImageSmoothingEnabled = false
      ctx.imageSmoothingEnabled = false
    } else {
      ctx.mozImageSmoothingEnabled = true
      ctx.imageSmoothingEnabled = true
    }

    ctx.drawImage(c1, 0, 0, canvas.width, canvas.height)
  }
}