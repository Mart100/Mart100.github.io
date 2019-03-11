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
    noise.seed = seed
    for(let x=0;x<this.width;x++) {
      this.data[x] = []
      for(let y=0;y<this.height;y++) {
        this.data[x][y] = {}
        this.setTile(x, y, 'temperature', 20)

        // create wood durability
        noise.seed = seed
        let durability = ((noise.simplex2(x/50, y/50)+1)*700)+140
        noise.seed = seed+0.2 > 1 ? seed-0.2 : seed+0.2
        durability += (noise.simplex2(x/10, y/10))*200
        noise.seed = seed+0.1 > 1 ? seed-0.1 : seed+0.1
        durability += (noise.simplex2(x/2, y/2))*100
        if(durability < 290) durability = 290

        //durability = randomRange(100, 1000)


        this.setTile(x, y, 'startDurability', durability)
        this.setTile(x, y, 'durability', durability)
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
    return this.data[x][y]
  }
  setTile(x, y, what, to) {
    let tile = this.data[x][y]
    tile[what] = to
    if(what == 'durability') {
      if(settings.show == 'wood') {
        let a = (to/tile.startDurability)*255
        this.setImgData(x, y, [90, 31, 23, a])
      }
      if(settings.show == 'durability') {
        let a = (to/2000)*255
        this.setImgData(x, y, [90, 31, 23, a])
      }
    }
    if(what == 'temperature' && settings.show == 'temperature') {
      let r = to/1000 * 255
      let b = 255 - (to/1000 * 255)
      this.setImgData(x, y, [r, 0, b, 255])
    }
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
  plusImgData(x, y, color) {
    let idx = (y*this.width*4) + (x*4)
    let newColor = []
    newColor[0] = (this.imgData.data[idx] + color[0])/2
    newColor[1] = (this.imgData.data[idx+1] + color[1])/2
    newColor[2] = (this.imgData.data[idx+2] + color[2])/2
    newColor[3] = (this.imgData.data[idx+3] + color[3])/2

    // set new colors
    this.imgData.data[idx] = newColor[0]
    this.imgData.data[idx+1] = newColor[1]
    this.imgData.data[idx+2] = newColor[2]
    this.imgData.data[idx+3] = newColor[3]
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