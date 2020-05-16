class Grid {
	constructor() {
		this.data = []

		this.seeds = []
		for(let i=0;i<10;i++) this.seeds[i] = Math.floor(Math.random()*100000)

		this.createImgData()

	}
	loadScreen() {
		this.fillScreenSpots()
	}
	createImgData() {

		this.canvas = document.getElementById('ground')
		this.ctx = this.canvas.getContext('2d')
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight

		this.canvas1 = document.createElement('canvas')
		this.canvas1.width = window.innerWidth/10
		this.canvas1.height = window.innerHeight/10
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

		to.x = Math.round(to.x)
		to.y = Math.round(to.y)

		let imgData = this.imgData
		this.imgData = ctx.getImageData(0, 0, this.canvas1.width, this.canvas1.height)

		world.camera.pos.x -= to.x
		world.camera.pos.y -= to.y

		world.camera.pos.x = Math.floor(world.camera.pos.x*100)/100
		world.camera.pos.y = Math.floor(world.camera.pos.y*100)/100

		infoPanel.add('posX', world.camera.pos.x)
		infoPanel.add('posY', world.camera.pos.y)

		this.fillScreen()
	}
	fillScreen() {
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
		if(!this.data[x]) this.createTile(x, y)
		if(!this.data[x][y]) this.createTile(x, y)
		this.data[x][y][what] = to
		this.renderTile(this.data[x][y])
		return this.data[x][y]
	}
	renderTile(tile) {
		let screenX = Math.floor(tile.x - Math.floor(world.camera.pos.x))
		let screenY = Math.floor(tile.y - Math.floor(world.camera.pos.y))

		if(screenX > this.canvas1.width || screenX < 0) return
		if(screenY > this.canvas1.height || screenY < 0) return

		let color = [50, 200, 50, 255]

		color[3] = tile.grassIntensity*tile.naturity*255
		//color[0] = color[1]/2
		//color[2] = color[1]/2
		//if(Math.random() > 0.9) console.log(screenX, screenY, color)
		this.setImgData(screenX, screenY, color)
	}
	createTile(x, y) {
		let tile = {
			color: [],
			grassIntensity: 0,
			naturity: 0,
			x: x,
			y: y
		}
		
		let tilePos = {x: x, y: y}

		// grass
		let size0 = 1.700
		noise.seed(this.seeds[0])
		let noise0 = noise.perlin2(x/size0, y/size0)
		tile.grassIntensity = 0.8 + (noise0/5)

		if(!this.data[x]) this.data[x] = []
		this.data[x][y] = tile
		this.renderTile(tile)
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
	worldToGrid(pos) {
		let newPos = new Vector()
		newPos.x = Math.floor(pos.x/10)
		newPos.y = Math.floor(pos.y/10)
		return newPos
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

		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.ctx1.putImageData(this.imgData, 0, 0)
		this.ctx.drawImage(this.canvas1, 0, 0, this.canvas.width, this.canvas.height)
		this.ctx.mozImageSmoothingEnabled = false
		this.ctx.imageSmoothingEnabled = false
	}
}