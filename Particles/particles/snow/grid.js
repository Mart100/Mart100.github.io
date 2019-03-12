class Grid {
  constructor(width, height) {
    this.width = Math.floor(width)
    this.height = Math.floor(height)
    this.data = []

    // prepare drawing
    this.canvas1 = document.createElement('canvas')
    this.canvas1.width = this.width
    this.canvas1.height = this.height
    this.ctx1 = this.canvas1.getContext('2d')
    this.imgData = this.ctx1.createImageData(this.width, this.height)

    this.createGrid()
  }
  createGrid() {
    for(let x=0;x<this.width;x++) {
      this.data[x] = []
      for(let y=0;y<this.height;y++) {
        this.setTile(x, y, false)
        if(y > this.height-10) this.setTile(x, y, true)
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

  getTile(x, y) {
    if(this.data[x] == undefined) return

    return this.data[x][y]
  }
  setTile(x, y, to) {
    if(this.data[x] == undefined) return
    this.data[x][y] = to
    if(to) this.setImgData(x, y, [255, 255, 255, 255])
    else this.setImgData(x, y, [0, 0, 255, 20])
  }
  completeImgDataCalc() {
    this.forEveryTile((x, y, tile) => {
      for(let prop in tile) {
        this.setTile(x, y, prop, tile[prop])
      }
    })
  }
  setImgData(x, y, color) {
    let idx = (y*this.width*4) + (x*4)
    this.imgData.data[idx] = color[0]
    this.imgData.data[idx+1] = color[1]
    this.imgData.data[idx+2] = color[2]
    this.imgData.data[idx+3] = color[3]
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