let mouse = {pos: new Vector()}
let keys = {}

$(() => {
	// keyboard
	$(document).on('keydown', (event) => { 
		keys[event.keyCode] = true

		// P
		if(event.keyCode == 69) {
			toggleInventory()
		}
	})
	$(document).on('keyup', (event) => { keys[event.keyCode] = false })

	// mouse move
	$('#canvas').on('mousemove', (event) => {
		mouse.pos.x = event.clientX
		mouse.pos.y = event.clientY
	})

	$('#canvas').on('click', (event) => {
		let windowSize = new Vector(window.innerWidth/2, window.innerHeight/2)
		attack(world.grid.windowToGridPos(mouse.pos.clone().minus(windowSize).setMagnitude(100).plus(windowSize)))
	})

	// listen for zooming
	$('#canvas').on('DOMMouseScroll mousewheel', (event) => {

		if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
		} else {
		}
	})

})

function movingTick() {
	let speed = (settings.playerSpeed/150)*(world.deltaTick/10)
	let speedEffect = world.player.effects.find(e => e.type == 'speed')
	if(speedEffect) speed += (speedEffect.strength/100)
	let movement = new Vector()

	if(keys[87] || keys[38]) { // north
		movement.plus(new Vector(0, -speed))
		moved = true
	}
	if(keys[68] || keys[39]) { // east
		movement.plus(new Vector(speed, 0))
		moved = true
	}
	if(keys[83] || keys[40]) { // south
		movement.plus(new Vector(0, speed))
		moved = true
	}
	if(keys[65] || keys[37]) { // west
		movement.plus(new Vector(-speed, 0))
		moved = true
	}

	// moved
	if(movement.getMagnitude() > 0) {

		let nextTileX = world.grid.getTile(Math.round(world.player.pos.x+movement.x), Math.round(world.player.pos.y))
		let nextTileY = world.grid.getTile(Math.round(world.player.pos.x), Math.round(world.player.pos.y+movement.y))
		if(movement.x > 0 && nextTileX.ground == 'empty') movement.x = 0
		if(movement.x < 0 && nextTileX.ground == 'empty') movement.x = 0
		if(movement.y > 0 && nextTileY.ground == 'empty') movement.y = 0
		if(movement.y < 0 && nextTileY.ground == 'empty') movement.y = 0


		world.player.pos.plus(movement)
		infoPanel.add('Movement', movement)
		infoPanel.add('position', world.player.pos)

		if(movement.y > 0) world.player.facing = 'down'
		if(movement.y < 0) world.player.facing = 'up'
		if(movement.x > 0) world.player.facing = 'right'
		if(movement.x < 0) world.player.facing = 'left'

		if(!assets.sounds.walking.playing()) {
			let dur = assets.sounds.walking.duration()
			assets.sounds.walking.play()
			assets.sounds.walking.rate(2)
			assets.sounds.walking.volume(0.8)
			let to = Math.random()*dur
			assets.sounds.walking.seek(to)
		}

	} else {
		if(assets.sounds.walking.playing()) assets.sounds.walking.stop()
	}
}