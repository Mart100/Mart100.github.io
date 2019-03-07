let previousImgData = []
let averageFrameTime = 0

function frame() {

  // rerun frame
   window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

  // add to fps
  fps++

  // start timer
  let frameTimeStart = performance.now()

  // DRAW
    
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

  let skips = []
  let ySkips = {}
  let skipCol = []


  let plus = 1
  plus = Math.ceil(10/cz)

  let c1 = document.createElement("canvas")
  var ctx1 = c1.getContext("2d")

  let swidth = canvas.width/settings.detail
  let sheight = canvas.height/settings.detail
  c1.width = swidth
  c1.height = sheight
  let imgData = ctx1.createImageData(swidth, sheight)
  //imgData.data = previousImgData
  let imgDataLength = imgData.data.length
  for(var i=0; i<imgDataLength; i+=4) {

    if(skips > 0) {
      skips--
      imgData.data[i] = skipCol[0]
      imgData.data[i+1] = skipCol[1]
      imgData.data[i+2] = skipCol[2]
      imgData.data[i+3] = 255
      continue
    }

    let x = Math.floor((i/4)%swidth)
    let y = Math.floor(i/((swidth)*4))

    if(ySkips[x] != undefined && ySkips[x].s > 0) {
      let k = ySkips[x]
      k.s--
      imgData.data[i] = k.c[0]
      imgData.data[i+1] = k.c[1]
      imgData.data[i+2] = k.c[2]
      imgData.data[i+3] = 255
      continue
    }

    let tx = Math.round(x/camera.zoom + camera.pos.x)
    let ty = Math.round(y/camera.zoom + camera.pos.y)

    // if tile is undefined. Load tile
    if(world[tx] == undefined || world[tx][ty] == undefined) {
      if(loadedTiles < loadTilesPerSec) {
        loadedTiles++
        loadTile(tx, ty)
        continue
      }
    }

    let tile = world[tx][ty]

    if(tile == undefined) continue

    imgData.data[i] = tile.color[0]
    imgData.data[i+1] = tile.color[1]
    imgData.data[i+2] = tile.color[2]
    imgData.data[i+3] = 255

    // calc skips
    if(settings.drawSkips.enabled) {
      let dif = Math.floor(tile.diff*camera.zoom/settings.drawSkips.strength)
      if(dif != 0) {
        skips = dif
        let col = tile.color
        if(settings.drawSkips.view) col = [0,0,0]
        ySkips[x] = {s: dif, c: col}
        if(skips > swidth-x) skips = swidth-x
        skipCol = col
      }
    }

    // if zoomed in enough. Draw props in tiles
    if(camera.zoom > 0.1) {
      let rawTX = Math.abs(Math.round((x/camera.zoom + camera.pos.x)*16)-8) % 16
      let rawTY = Math.abs(Math.round((y/camera.zoom + camera.pos.y)*16)-8) % 16
      let idx = rawTY*16*4 + rawTX*4
      let image = undefined

      if(tile.noiseLayers.tree) image = images.tree
      if(tile.noiseLayers.cactus) image = images.cactus

      // put prop pixel in canvas imgData
      if(image != undefined && image.bitmap.data[idx+3] != 0) {
        imgData.data[i] = image.bitmap.data[idx]
        imgData.data[i+1] = image.bitmap.data[idx+1]
        imgData.data[i+2] = image.bitmap.data[idx+2]
        imgData.data[i+3] = image.bitmap.data[idx+3]
        skips = 0
        skips[x] = undefined
      }

    }
  }

  ctx1.putImageData(imgData, 0, 0)

  previousImgData = imgData

  if(settings.pixelated) {
    ctx.mozImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false
  } else {
    ctx.mozImageSmoothingEnabled = true
    ctx.imageSmoothingEnabled = true
  }

  ctx.drawImage(c1, 0, 0, canvas.width, canvas.height)

  averageFrameTime += (performance.now()-frameTimeStart)/20
  averageFrameTime *= 0.8
  debugPanel.add('AverageFrameTime', averageFrameTime)
}


function getTileColor() {

}