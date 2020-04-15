class Pathfinder {
	constructor() {
		this.foundEnd = true
		this.exploredTiles = []
		this.exploredTilesVal = []
		this.iterations = 0
	}
	async findPath(from, to) {
		//console.log('FindPath: ', from, to)
		this.foundEnd = false
		this.exploredTiles = []
		this.exploredTilesVal = []
		this.target = to
		this.iterations = 0
		this.pathFindStart = Date.now()
		let path = await this.checkNeighborsRecursion(from, 0)
		let reversedPath = path.reverse()
		console.log(`Found Path between`, from, 'and', to, `. within ${Date.now()-this.pathFindStart} ms. Path length: ${path.length}. Tiles: ${this.exploredTiles.length}`)
		this.foundEnd = true
		return reversedPath
	}
	checkNeighborsRecursion(tilePos, iter) {
		return new Promise((resolve, reject) => {
			if(this.foundEnd) return resolve(false)
			this.iterations = iter
			if(this.exploredTiles.length > 200) return resolve(false)
			if(!world.grid.data[tilePos.x]) world.grid.data[tilePos.x] = []
			let tile = world.grid.data[tilePos.x][tilePos.y]
			if(!tile) {
				world.grid.createTile(tilePos.x, tilePos.y)
				tile = world.grid.data[tilePos.x][tilePos.y]
			}
			//console.log(tile)
			this.exploredTiles.push(`${tile.x}=${tile.y}`)
	
			this.exploredTilesVal[`${tile.x}=${tile.y}`] = iter
			
			// if wanted destination. Retrace
			if(tile.x == this.target.x && tile.y == this.target.y) {
				this.foundEnd = true
				return resolve([{x: tile.x, y: tile.y}])
			}
			let neighbors = this.getTileNeighbors(tilePos, true)
			neighbors.sort((a, b) => {
				let distA = new Vector(a.x, a.y).minus(this.target).getMagnitude()
				let distB = new Vector(b.x, b.y).minus(this.target).getMagnitude()
				//console.log(a, distA, b, distB)
				return distA-distB
			})
			//console.log(neighbors)
			
			//await sleep(1)
			for(let i=0;i<neighbors.length;i++) {
				let n = neighbors[i]
				if(!n) continue
				let nPos = new Vector(n.x, n.y)
				if(this.exploredTiles.includes(`${nPos.x}=${nPos.y}`)) continue
				if(n.ground == 'empty') continue
				this.checkNeighborsRecursion(nPos, iter+1).then((response) => {
					if(response) {
						let leastIterVal = 1e9
						let leastIterPos = nPos
						for(let j=0;j<neighbors.length;j++) {
							let n1 = neighbors[i]
							let iterValN = this.exploredTilesVal[`${n1.x}=${n1.y}`]
							if(iterValN < leastIterVal) {
								leastIterVal = iterValN
								leastIterPos = {x: n1.x, y: n1.y}
							}
						}
						response.push(leastIterPos)
						return resolve(response)
					}
				})
			}
		})
	}
	getTileNeighbors(pos, create=false) {
		let arr = []
		let gData = world.grid.data
		let posArr = [[-1, 0], [0, -1], [1, 0], [0, 1]]
		let x = pos.x
		let y = pos.y
		for(let i=0;i<4;i++) {
			let b = posArr[i]
			let bx = b[0]+x
			let by = b[1]+y
			if(gData[bx] && gData[bx][by]) arr[i] = gData[bx][by]
			else {
				if(create) world.grid.createTile(bx, by)
				arr[i] = world.grid.data[bx][by]
			}
		}
		return arr
	}
}