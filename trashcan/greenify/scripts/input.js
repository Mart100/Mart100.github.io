let mouse = {pos: new Vector(), down: false}
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

	
	$(document).on('mousedown', (event) => { mouse.down = true })
	$(document).on('mouseup', (event) => { mouse.down = false })

	$(document).on('click', (event) => {
		let windowSize = new Vector(window.innerWidth/2, window.innerHeight/2)
		let pos1 = mouse.pos.clone().minus(windowSize).plus(windowSize)
		if(pos1.getMagnitude > 200) pos1.setMagnitude(200)
		let pos2 = world.camera.windowToCoord(pos1)
		world.player.use(pos2)
	})

	// listen for zooming
	$('#canvas').on('DOMMouseScroll mousewheel', (event) => {

		if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
		} else {
		}
	})

})