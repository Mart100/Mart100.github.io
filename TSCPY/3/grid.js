class Grid {
  constructor() {
    this.camera = {
      zoom: 10,
      pos: {x: 0, y: 0}
    }

    this.data = []

    this.seeds = []
    for(let i=0;i<10;i++) this.seeds[i] = Math.floor(Math.random()*100000)

    this.createImgData()

  }
  loadScreen() {
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
  zoom(zoom) {

    this.camera.zoom /= 1 + zoom
    
    if(this.camera.zoom <= 5) this.camera.zoom = 5
    if(this.camera.zoom >= 150) this.camera.zoom = 150

    this.canvas1.width = window.innerWidth/this.camera.zoom
    this.canvas1.height = window.innerHeight/this.camera.zoom

    let middle = {
      x: this.canvas1.width/2,
      y: this.canvas1.height/2
    }

    this.imgData = this.ctx1.createImageData(this.canvas1.width, this.canvas1.height)

    this.fillScreenSpots()
  }
  fillScreenSpots() {
    let imgData = this.imgData.data
    let imgDataLength = imgData.length
    let swidth = this.canvas1.width
    let sheight = this.canvas1.height
    for(var i=0; i<imgDataLength; i+=4) {

      let screenX = Math.floor((i/4)%swidth)
      let screenY = Math.floor(i/((swidth)*4))

      let x = Math.floor(screenX + this.camera.pos.x)
      let y = Math.floor(screenY + this.camera.pos.y)

      let r = imgData[i]
      let g = imgData[i+1]
      let b = imgData[i+2]
      let a = imgData[i+3]

      if(this.data[x] && this.data[x][y]) this.setImgDataIdx(i, this.data[x][y].color)
      else this.createTile(x, y)
    }
  }
  getTile(x, y) {
    if(!this.data[x]) return false
    return this.data[x][y]
  }
  setTileProperty(x, y, what, to) {
    if(!this.data[x]) return false
    if(!this.data[x][y]) return false
    this.data[x][y][what] = to
    this.renderTile(this.data[x][y])
    return this.data[x][y]
  }
  setTileType(tile, type) {
    if(tile.x == undefined || tile.y == undefined) return
    this.setTileProperty(tile.x, tile.y, 'type', type)
    return this.data[tile.x][tile.y]
  }
  checkTileNeighbors4(tile) {
    let arr = []
    let posArr = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    let x = tile.x
    let y = tile.y
    for(let i=0;i<4;i++) {
      let b = posArr[i]
      if(this.data[b[0]+x] && this.data[b[0]+x][b[1]+y]) arr[i] = this.data[b[0]+x][b[1]+y]
      else arr[i] = {x: x, y: y}
    }
    return arr
  }
  checkTileNeighbors8(tile) {
    let arr = []
    let posArr = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]]
    let x = tile.x
    let y = tile.y
    for(let i=0;i<8;i++) {
      let b = posArr[i]
      if(this.data[b[0]+x] && this.data[b[0]+x][b[1]+y]) arr[i] = this.data[b[0]+x][b[1]+y]
      else arr[i] = {x: x, y: y}
    }
    return arr
  }
  renderTile(tile) {
    let screenX = Math.floor(tile.x - Math.floor(this.camera.pos.x))
    let screenY = Math.floor(tile.y - Math.floor(this.camera.pos.y))

    if(screenX > this.canvas1.width || screenX < 0) return
    if(screenY > this.canvas1.height || screenY < 0) return

    let type = tile.type

    if(type == 'white') tile.color = [255, 255, 255, 255]
    if(type == 'red') tile.color = [255, 220, 220, 255]
    if(type == 'blue') tile.color = [220, 220, 255, 255]
    if(type == 'black') tile.color = [0, 0, 0, 0]

    this.setImgData(screenX, screenY, tile.color)
  }
  createTile(x, y) {
    let tile = {
      color: [255, 255, 255, 255],
      x: x,
      y: y,
      type: 'white'
    }

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
  gridToWindowPos(x, y) {
    let pos = {x:0, y:0}
    pos.x = Math.floor((x-Math.floor(this.camera.pos.x))/(this.canvas1.width)*window.innerWidth)
    pos.y = Math.floor((y-Math.floor(this.camera.pos.y))/(this.canvas1.height)*window.innerHeight)
    return pos
  }
  windowToGridPos(x, y) {
    let pos = {x:0, y:0}
    pos.x = Math.floor(x/window.innerWidth*this.canvas1.width + Math.floor(this.camera.pos.x))
    pos.y = Math.floor(y/window.innerHeight*this.canvas1.height + Math.floor(this.camera.pos.y))
    return pos
  }
  draw() {
    let start = performance.now()
    this.ctx1.putImageData(this.imgData, 0, 0)
    ctx.drawImage(this.canvas1, 0, 0, canvas.width, canvas.height)
    ctx.mozImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false
  }
}