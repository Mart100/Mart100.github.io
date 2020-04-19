class Room {
	constructor(pos, type) {


		this.pos = pos
		this.door = undefined
		this.size = new Vector(20, 10)
		this.positions = []
		this.type = type
		world.grid.rooms.push(this)

		this.loopPositions((x, y) => {
			if(!world.grid.roomTiles[x]) world.grid.roomTiles[x] = []
			world.grid.roomTiles[x][y] = this
			this.positions.push(new Vector(x, y))
		})

		this.createTiles()
	}
	async createTiles() {
		this.loopPositions((x, y) => {
			if(!world.grid.data[x]) world.grid.data[x] = []
			world.grid.data[x][y] = createTile(x, y)
		})
		await sleep(100)
		this.loopPositions((x, y) => {
			world.grid.data[x][y] = createTile(x, y)
		})
	}
	createRoomTile(tile) {
		tile.ground = 'mossystoneFlowers'
		if(tile.x <= this.pos.x-this.size.x/2+1) tile.ground = 'empty'
		if(tile.x >= this.pos.x+this.size.x/2-1) tile.ground = 'empty'
		if(tile.y <= this.pos.y-this.size.y/2+1) tile.ground = 'empty'
		if(tile.y >= this.pos.y+this.size.y/2-1) tile.ground = 'empty'

		return tile
	}
	loopPositions(func) {
		for(let x=this.pos.x-this.size.x/2;x<this.pos.x+this.size.x/2;x++) {
			for(let y=this.pos.y-this.size.y/2;y<this.pos.y+this.size.y/2;y++) {
				func(x, y)
			}
		}
	}
}