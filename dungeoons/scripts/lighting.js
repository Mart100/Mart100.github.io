async function calculateLightLevels() {
	let pp = world.player.pos
	let ppr = new Vector()
	ppr.x = Math.round(pp.x)
	ppr.y = Math.round(pp.y)

	let torches = []
	for(let x=ppr.x-10*2;x<ppr.x+11*2;x++) {
		for(let y=ppr.y-5*2;y<ppr.y+6*2;y++) {
			let tile = world.grid.getTile(x, y)
			if(!tile) continue
			tile.light = 0
			if(tile.objectType == 'torch') torches.push(tile)
		}
	}
	for(let torch of torches) {
		//new torchLightRecursion(torch)
		let queue = []
		let doneList = []
		queue.push({tile: torch, l: 10})
		while(queue.length != 0) {
			let queueF = queue.shift()
			let tile = queueF.tile
			if(doneList.includes(tile)) continue
			tile.light += (queueF.l + Math.random())/2
			if(tile.object == 'torch') tile.light = 0
			doneList.push(tile)
			let ns = world.grid.getTileNeighbors(tile)
			let l = queueF.l-1
			if(l != 0) {
				for(let n of ns) {
					if(!n) continue
					if(n.ground == 'empty') continue
					if(doneList.includes(n)) continue
					queue.push({tile: n, l: l})
				}
			}
		}
	}
	/*
	for(let x=ppr.x-10;x<ppr.x+11;x++) {
		for(let y=ppr.y-5;y<ppr.y+6;y++) {
			let tile = world.grid.getTile(x, y)
			let lightlevel = 0
			if(tile.ground != 'empty')
			for(let torch of torches) {
				let dist = new Vector(tile.x, tile.y).minus(new Vector(torch.x, torch.y)).getMagnitude()
				if(dist > 5) continue
				lightlevel += 5-dist
			}
			tile.light = Math.round(lightlevel*10)/10
		}
	}*/
}


/*
class torchLightRecursion {
	constructor(torch) {
		this.torch = torch
		this.doneList = []
		this.lightup()
	}
	lightup() {
		this.doneList = []
		this.torchLightRecursion(this.torch, 10)
	}
	torchLightRecursion(tile, t) {
		let tpos = new Vector(tile.x, tile.y)
		tile.light = t
		this.doneList.push(tile)
		let ns = world.grid.getTileNeighbors(tile)
		t -= 1
		if(t == 0) return
		for(let n of ns) {
			if(!n) continue
			if(n.ground == 'empty') continue
			if(this.doneList.includes(n)) continue
			this.torchLightRecursion(n, t)
		}
	}
}
*/