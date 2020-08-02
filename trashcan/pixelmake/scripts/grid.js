class Grid {
	constructor() {
		this.camera = {
			zoom: 6,
			pos: {
				x: 0,
				y: 0
			}
		}
		this.data = []

		this.layers = []

		this.createLayers()

		this.canvas = document.createElement('canvas')
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.ctx = this.canvas.getContext('2d')

	}
	loadScreen() {
		this.zoom(0, {x: 0, y: 0})
		this.fillScreenSpots()
	}
	createLayer(name, z) {

		let canvas = document.createElement('canvas')
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		let ctx = canvas.getContext('2d')
		let imgData = ctx.createImageData(this.canvas1.width, this.canvas1.height)

		let layer = { name, canvas, ctx, imgData, z}

		this.layers.push(layer)

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

		this.camera.pos.x -= to.x
		this.camera.pos.y -= to.y

		this.camera.pos.x = Math.floor(this.camera.pos.x*100)/100
		this.camera.pos.y = Math.floor(this.camera.pos.y*100)/100

		infoPanel.add('posX', this.camera.pos.x)
		infoPanel.add('posY', this.camera.pos.y)

		this.fillScreenSpots()
	}
	zoom(zoom, mouseGridPos) {

		this.camera.zoom /= 1 + zoom
		if(this.camera.zoom <= 5) this.camera.zoom = 5
		if(this.camera.zoom == 5) return
		if(this.camera.zoom >= 150) this.camera.zoom = 150
		if(this.camera.zoom == 150) return

		this.canvas1.width = window.innerWidth/this.camera.zoom
		this.canvas1.height = window.innerHeight/this.camera.zoom

		if(zoom < 0) {
			this.camera.pos.x += (mouseGridPos.x-this.camera.pos.x)/10
			this.camera.pos.y += (mouseGridPos.y-this.camera.pos.y)/10
		} else {
			this.camera.pos.x -= (mouseGridPos.x-this.camera.pos.x)/10
			this.camera.pos.y -= (mouseGridPos.y-this.camera.pos.y)/10
		}

		if(selectedConnecton) {
			this.camera.pos.x = selectedConnecton.pos.x-world.grid.canvas1.width/2,
			this.camera.pos.y = selectedConnecton.pos.y-world.grid.canvas1.height/2
		}

		infoPanel.add('posX', this.camera.pos.x)
		infoPanel.add('posY', this.camera.pos.y)

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
	renderTile(tile) {
		let screenX = Math.floor(tile.x - Math.floor(this.camera.pos.x))
		let screenY = Math.floor(tile.y - Math.floor(this.camera.pos.y))

		if(screenX > this.canvas1.width || screenX < 0) return
		if(screenY > this.canvas1.height || screenY < 0) return

		let types = tile.types
		let dominantType = types[types.length-1]

		let roomTypes = ['house', 'work', 'gym', 'restaurant']
		let roomTypeColors = {
			'house': [10, 0, 0],
			'work': [0, 10, 0],
			'gym': [0, 0, 10],
			'restaurant': [10, 10, 0]
		}

		// get color
		if(dominantType == 'hall') tile.color = [20, 20, 20, 255]
		if(dominantType == 'room') tile.color = [30, 30, 30, 255]
		if(dominantType == 'wall') tile.color = [10, 10, 10, 255]

		for(let roomType of roomTypes) {
			if(tile.roomType == roomType) {
				tile.color[0] += roomTypeColors[roomType][0]
				tile.color[1] += roomTypeColors[roomType][1]
				tile.color[2] += roomTypeColors[roomType][2]
			}
		}

		if(tile.searchAlgoTrace) tile.color[2] += tile.searchAlgoTrace

		this.setImgData(screenX, screenY, tile.color)
	}
	createTile(x, y) {
		let tile = {
			color: [],
			types: [],
			x: x,
			y: y
		}
		
		let tilePos = {x: x, y: y}
		let neighbors = this.checkTileNeighbors8(tile)
		let roomTypes = ['house', 'work', 'gym', 'restaurant']
		let types = []

		// wall / hall
		let size0 = 1.700
		let wip0 = 0.098
		noise.seed(this.seeds[0])
		let noise0 = noise.perlin2(x/size0, y/size0)
		if(noise0 < wip0) types.push('hall')
		else types.push('wall')

		// room
		let size1 = 7
		let wip1 = 0.34
		noise.seed(this.seeds[0])
		let noise1 = noise.perlin2(x/size1, y/size1)
		if(noise1 > wip1) {
			types.push('room')
			if(noise1-wip1 < 0.1) types.push('wall')
		}
		

		tile.types = types
		
		let dominantType = types[types.length-1]

		if(dominantType == 'room') {
			for(let i=0;i<neighbors.length;i++) {
				if(neighbors[i].roomType) {
					let nPos = { x: neighbors[i].x, y: neighbors[i].y }
					tile.roomType = neighbors[i].roomType
					let room = world.findRoomByTile(nPos)
					room.addPos(tilePos)
				}
			}
			if(!tile.roomType) {
				let newRoomType = roomTypes[Math.floor(Math.random()*roomTypes.length)]
				tile.roomType = newRoomType
				new Room(tilePos, newRoomType)
			}
		}



		if(!this.data[x]) this.data[x] = []
		this.data[x][y] = tile
		this.renderTile(tile)
	}
	checkTileNeighbors8(tile) {
		let arr = []
		let posArr = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]]
		let x = tile.x
		let y = tile.y
		for(let i=0;i<8;i++) {
			let b = posArr[i]
			if(this.data[b[0]+x] && this.data[b[0]+x][b[1]+y]) arr[i] = this.data[b[0]+x][b[1]+y]
			else arr[i] = {}
		}
		return arr
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
		for(let layer of this.layers) {
			layer.ctx.putImageData(layer.imgData, 0, 0)
			this.ctx.drawImage(layer.canvas, 0, 0, this.canvas.width, this.canvas.height)
		}

		this.ctx.mozImageSmoothingEnabled = false
		this.ctx.imageSmoothingEnabled = false
	}
}