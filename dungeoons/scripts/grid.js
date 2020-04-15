class Grid {
	constructor(world) {
		this.camera = {
			zoom: 6,
			pos: {
				x: 0,
				y: 0
			}
		}
		this.data = []
		this.world = world
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
	createTile(x, y) {
		let tile = createTile(x, y)

		if(!this.data[x]) this.data[x] = []
		this.data[x][y] = tile

	}
	gridToWindowPos(p) {
		let pos = new Vector(0, 0)
		let windowSize = new Vector(window.innerWidth/2, window.innerHeight/2)
		pos.x = ((p.x-this.world.player.pos.x)*this.world.rendering.zoom)+windowSize.x
		pos.y = ((p.y-this.world.player.pos.y)*this.world.rendering.zoom)+windowSize.y
		return pos
	}
	windowToGridPos(p) {
		let pos = new Vector(0, 0)
		let windowSize = new Vector(window.innerWidth/2, window.innerHeight/2)
		pos.x = (p.x-windowSize.x)/this.world.rendering.zoom + this.world.player.pos.x
		pos.y = (p.y-windowSize.y)/this.world.rendering.zoom + this.world.player.pos.y
		return pos
	}
	getTileNeighbors(pos, create=false) {
		let arr = []
		let gData = this.data
		let posArr = [[-1, 0], [0, -1], [1, 0], [0, 1]]
		let x = pos.x
		let y = pos.y
		for(let i=0;i<4;i++) {
			let b = posArr[i]
			let bx = b[0]+x
			let by = b[1]+y
			if(gData[bx] && gData[bx][by]) arr[i] = gData[bx][by]
			else {
				if(create) {
					this.createTile(bx, by)
					arr[i] = this.data[bx][by]
				}
			}
		}
		return arr
	}
}