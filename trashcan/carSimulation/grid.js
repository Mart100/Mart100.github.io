class Grid {
  constructor() {
    this.camera = {
      zoom: 5,
      pos: {
        x: 0,
        y: 0
      }
    }
    this.data = []

    this.createImgData()

    this.zoom(0, {x: 0, y: 0})
    this.fillScreenSpots()
  }
  createImgData() {

    this.canvas1 = document.createElement('canvas')
    this.canvas1.width = window.innerWidth
    this.canvas1.height = window.innerHeight
    this.ctx1 = this.canvas1.getContext('2d')
    this.imgData = this.ctx1.createImageData(this.canvas1.width, this.canvas1.height)

  }
  forEveryTile(func) {
    for(let x=0;x<this.width;x++) {
      for(let y=0;y<this.height;y++) {
        let newTile = func(x, y, this.data[x][y])
        if(newTile != undefined) this.data[x][y] = newTile
      }
    }
  }
  move(to) {
    let imgData = this.imgData
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.putImageData(imgData, to.x, to.y)
    this.imgData = ctx.getImageData(0, 0, grid.canvas1.width, grid.canvas1.height)

    this.camera.pos.x += to.x
    this.camera.pos.y += to.y

    let ch = this.canvas1.height
    let cw = this.canvas1.width
    let toX = Math.abs(to.x)
    let toY = Math.abs(to.y)

    grid.fillScreenSpots()
    return
    if(to.x > 0) grid.fillRectEmptySpots(0, 0, toX, ch)
    if(to.x < 0) grid.fillRectEmptySpots(cw-toX, 0, toX, ch)

    if(to.y > 0) grid.fillRectEmptySpots(0, 0, cw, toY)
    if(to.y < 0) grid.fillRectEmptySpots(0, ch-toY, cw, toY)
  }
  zoom(zoom, mouseGridPos) {

    this.camera.zoom /= 1 + zoom
    if(this.camera.zoom <= 2) this.camera.zoom = 2
    if(this.camera.zoom == 2) return

    this.canvas1.width = window.innerWidth/this.camera.zoom
    this.canvas1.height = window.innerHeight/this.camera.zoom

    this.camera.pos.x += mouseGridPos.x
    this.camera.pos.y += mouseGridPos.y

    this.imgData = this.ctx1.createImageData(this.canvas1.width, this.canvas1.height)

    this.fillScreenSpots()
  }
  fillRectEmptySpots(Xstart, Ystart, width, height) {
    let imgData = this.imgData.data
    let swidth = this.canvas1.width
    let sheight = this.canvas1.height

    for(let screenX=Xstart; screenX<Xstart+width; screenX++) {
      for(let screenY=Ystart; screenY<Ystart+height; screenY++) {
        let idx = (screenY*swidth*4) + (screenX*4)
        if(imgData[idx+3] == 0 || imgData[idx+3] == undefined) {
          let x = Math.ceil(screenX - this.camera.pos.x)
          let y = Math.ceil(screenY - this.camera.pos.y)
          if(this.data[x] && this.data[x][y]) this.setImgDataIdx(idx, this.data[x][y].color)
          else {
            this.createTile(x, y)
          }
        }
      }
    }
  }
  fillScreenSpots() {
    let imgData = this.imgData.data
    let imgDataLength = imgData.length
    let swidth = this.canvas1.width
    let sheight = this.canvas1.height
    for(var i=0; i<imgDataLength; i+=4) {

      let screenX = Math.floor((i/4)%swidth)
      let screenY = Math.floor(i/((swidth)*4))

      let x = Math.floor(screenX - this.camera.pos.x)
      let y = Math.floor(screenY - this.camera.pos.y)

      let r = imgData[i]
      let g = imgData[i+1]
      let b = imgData[i+2]
      let a = imgData[i+3]

      if(a == 0 || a == undefined || true) {
        if(this.data[x] && this.data[x][y]) this.setImgDataIdx(i, this.data[x][y].color)
        else this.createTile(x, y)
      }
    }
  }
  getTile(x, y) {
    if(!this.data[x]) return false
    return this.data[x][y]
  }
  renderTile(tile) {
    let screenX = Math.floor(tile.x + this.camera.pos.x)
    let screenY = Math.floor(tile.y + this.camera.pos.y)
    this.setImgData(screenX, screenY, tile.color)
  }
  createTile(x, y) {
    let tile = {
      color: [],
      x: x,
      y: y
    }

    let SV = 1 // Standard Value
    noise.seed(1)
    tile.color[0] = Math.floor((noise.simplex2(x/50, y/50)+SV) * 255/(SV+1))
    noise.seed(2)
    tile.color[1] = Math.floor((noise.simplex2(x/50, y/50)+SV) * 255/(SV+1))
    noise.seed(3)
    tile.color[2] = Math.floor((noise.simplex2(x/50, y/50)+SV) * 255/(SV+1))
    tile.color[3] = 255

    if(!this.data[x]) this.data[x] = []
    this.data[x][y] = tile
    this.renderTile(tile)
  }
  setImgDataIdx(idx, color) {
    this.imgData.data[idx] = color[0]
    this.imgData.data[idx+1] = color[1]
    this.imgData.data[idx+2] = color[2]
    this.imgData.data[idx+3] = color[3]
  }
  setImgData(x, y, color) {
    let idx = (y*this.canvas1.width*4) + (x*4)
    this.imgData.data[idx] = color[0]
    this.imgData.data[idx+1] = color[1]
    this.imgData.data[idx+2] = color[2]
    this.imgData.data[idx+3] = color[3]
  }
  windowToGridPos(x, y) {
    let pos = {x:0, y:0}
    pos.x = Math.floor(x/window.innerWidth*this.canvas1.width - this.camera.pos.x)
    pos.y = Math.floor(y/window.innerHeight*this.canvas1.height - this.camera.pos.y)
    return pos
  }
  draw() {
    let start = performance.now()
    this.ctx1.putImageData(this.imgData, 0, 0)
    ctx.drawImage(this.canvas1, 0, 0, canvas.width, canvas.height)
    ctx.mozImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false
    debugPanel.add('gridFrameTime', performance.now()-start)

  }
}