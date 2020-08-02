function tick() {
	movingTick()

	for(let p of world.particles) p.tick()

	if(mouse.down) {
		if(world.player.hand == 'watering_can') world.player.use()
	}
}


function movingTick() {
	let speed = (settings.playerSpeed/150)*(world.deltaTick/10)

	let movement = new Vector()

	if(keys[87] || keys[38]) { // north
		movement.plus(new Vector(0, -speed))
	}
	if(keys[68] || keys[39]) { // east
		movement.plus(new Vector(speed, 0))
	}
	if(keys[83] || keys[40]) { // south
		movement.plus(new Vector(0, speed))
	}
	if(keys[65] || keys[37]) { // west
		movement.plus(new Vector(-speed, 0))
	}

	// moved
	if(movement.getMagnitude() > 0) {

		world.player.pos.plus(movement)
		infoPanel.add('Movement', movement)
		infoPanel.add('position', world.player.pos)

		if(movement.y > 0) world.player.facing = 'south'
		if(movement.y < 0) world.player.facing = 'north'
		if(movement.x > 0) world.player.facing = 'east'
		if(movement.x < 0) world.player.facing = 'west'


	} else {

	}
}