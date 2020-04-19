function createTile(x, y) {
	let seeds = []
	for(let i=0;i<100;i++) seeds.push(world.seed+i)
	let pos = new Vector(x, y)
	let gd = world.grid.data
	let tile = {
		x: x,
		y: y,
		walls: [],
		light: 0,
		ground: 'mossystone1'
	}

	// calculate walls/empty
	let size0 = 5
	let wip0 = 0.05
	noise.seed(seeds[0])
	let noise0 = noise.perlin2(x/size0, y/size0)
	if(noise0 > wip0) {
		tile.ground = 'empty'
	}

	if(world.grid.roomTiles[x] && world.grid.roomTiles[x][y]) {
		//console.log('yaaas', world.grid.roomTiles[x][y])
		tile.room = world.grid.roomTiles[x][y]
		tile = tile.room.createRoomTile(tile)
		console.log(tile)
	}

	// calculate chest locations
	if(Math.random() > 0.995 && tile.ground != 'empty') {
		tile.object = new Chest(pos)
		tile.objectType = 'chest'
	}

	// bossroom
	if(Math.random() > 0.9999 || (x==-10 && y==-10) ) {
		if(!tile.room) {
			tile.ground = 'mossystoneFlowers'
			new Room(pos.clone(), 'boss1')
		}
	}

	// spawn enemy
	let enemyTypes = ['zombie', 'spider', 'goblin']
	if(Math.random() > 0.98 && tile.ground != 'empty' && !settings.noEnemies) {
		new Enemy(pos, {type: 'zombie'})
	}

	// walls
	let tw = tile.walls
	let tg = tile.ground
	let ge = 'empty'
	let gms = 'mossystone1'
	if(gd[x]&&gd[x][y+1]&&gd[x][y+1].ground!=ge&&tg==ge&&!tw.includes('north')) { tw.push('north'); updateTileNorthWall(tile) }
	if(gd[x]&&gd[x][y-1]&&gd[x][y-1].ground==ge&&tg!=ge&&!gd[x][y-1].walls.includes('north')) { gd[x][y-1].walls.push('north'); updateTileNorthWall(gd[x][y-1]) }

	if(gd[x]&&gd[x][y-1]&&gd[x][y-1].ground!=ge&&tg==ge&&!tw.includes('north')) tw.push('south')
	if(gd[x]&&gd[x][y+1]&&gd[x][y+1].ground==ge&&tg!=ge&&!gd[x][y+1].walls.includes('north')) gd[x][y+1].walls.push('south')

	if(gd[x-1]&&gd[x-1][y]&&gd[x-1][y].ground!=ge&&tg==ge&&!tw.includes('north')) tw.push('west')
	if(gd[x+1]&&gd[x+1][y]&&gd[x+1][y].ground==ge&&tg!=ge&&!gd[x+1][y].walls.includes('north')) gd[x+1][y].walls.push('west')

	if(gd[x+1]&&gd[x+1][y]&&gd[x+1][y].ground!=ge&&tg==ge&&!tw.includes('north')) tw.push('east')
	if(gd[x-1]&&gd[x-1][y]&&gd[x-1][y].ground==ge&&tg!=ge&&!gd[x-1][y].walls.includes('north')) gd[x-1][y].walls.push('east')


	if(gd[x-1]&&gd[x-1][y]&&gd[x-1][y].walls.includes('north')&&tg==ge&&!tw.includes('north')) tw.push('west')
	if(gd[x+1]&&gd[x+1][y]&&gd[x+1][y].walls.includes('north')&&tg==ge&&!tw.includes('north')) tw.push('east')

	//console.log(tile)
	return tile
}

function updateTileNorthWall(tile) {
	let x = tile.x
	let y = tile.y
	let gd = world.grid.data
	let tw = tile.walls
	let tg = tile.ground
	let ge = 'empty'
	let gms = 'mossystone1'
	if(gd[x+1]&&gd[x+1][y]&&gd[x+1][y].ground==ge&&tile.walls.includes('north')&&!gd[x+1][y].walls.includes('north')) gd[x+1][y].walls.push('west')
	if(gd[x-1]&&gd[x-1][y]&&gd[x-1][y].ground==ge&&tile.walls.includes('north')&&!gd[x-1][y].walls.includes('north')) gd[x-1][y].walls.push('east')

	// generate torches
	if(Math.random() > 0.9 && tile.walls.includes('north')) {
		tile.object = 'torch'
		tile.objectType = 'torch'
	}
	
}