class Grid {
  constructor(width, height) {
    this.width = Math.floor(width)
    this.height = Math.floor(height)
    this.camera = {
      zoom: 1,
      pos: {
        x: 0,
        y: 0
      }
    }
    this.data = []

    this.createImgData()
    this.createGrid()
  }
  createImgData() {

    this.canvas1 = document.createElement('canvas')
    this.canvas1.width = window.innerWidth
    this.canvas1.height = window.innerHeight
    this.ctx1 = this.canvas1.getContext('2d')
    this.imgData = this.ctx1.createImageData(this.canvas1.width, this.canvas1.height)

  }
  createGrid() {
    for(let x=0;x<this.width;x++) {
      this.data[x] = []
      for(let y=0;y<this.height;y++) {
        this.data[x][y] = {}
        this.setTile(x, y, 'idk', 2)
      }
    }
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
    let imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.putImageData(imgData, to.x, to.y)
    this.imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight)

    this.camera.pos.x += to.x
    this.camera.pos.y += to.y
  }
  zoom(zoom) {
    let imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.putImageData(imgData, 0, 0)
    ctx.drawImage(canvas, 0, 0, window.innerWidth, window.innerHeight)
    ctx.scale(zoom, zoom)
    this.imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight)

    this.camera.zoom += zoom
  }
  getTile(x, y) {
    return this.data[x][y]
  }
  setTile(x, y, what, to) {
    let tile = this.data[x][y]
    tile[what] = to
    this.setImgData(x, y, [Math.random()*255, Math.random()*255, Math.random()*255, 255])
  }
  completeImgDataCalc() {
    this.forEveryTile((x, y, tile) => {
      for(let prop in tile) {
        this.setTile(x, y, prop, tile[prop])
      }
    })
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
    pos.x = Math.floor(x/canvas.width*this.width)
    pos.y = Math.floor(y/canvas.height*this.height)
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