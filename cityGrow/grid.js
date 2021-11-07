class Grid {
	constructor(width, height) {
		this.width = width
		this.height = height
		this.data = []

		this.createData(width, height)

		this.spawnResources()
	}

	createData(width, height) {
		for(let x=0;x<width;x++) {
			this.data[x] = []
			for(let y=0;y<height;y++) {
				this.data[x][y] = new Tile(new Vector(x, y))
			}
		}
	}

	getTile(pos) {
		if(!this.data[pos.x]) return undefined
		return this.data[pos.x][pos.y]
	}

	isOutOfRange(pos) {
		if(pos.x < 0) return true
		if(pos.x >= this.width) return true
		if(pos.y < 0) return true
		if(pos.y >= this.height) return true

		return false
	}
	
}