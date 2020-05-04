$(() => {
	$(document).on('keydown', (event) => { 
		keys[event.keyCode] = true

	})
	setInterval(() => {

		let speed = 20
		if(keys[87] || keys[38]) renderer.camera.pos.y -= speed
		if(keys[68] || keys[39]) renderer.camera.pos.x += speed
		if(keys[83] || keys[40]) renderer.camera.pos.y += speed
		if(keys[65] || keys[37]) renderer.camera.pos.x -= speed
		
		if(keys[87] || keys[38] || keys[68] || keys[39] || keys[83] || keys[40] || keys[65] || keys[37]) {
			renderer.lastCameraMovement = Date.now()
			renderer.clearCanvas()
			renderer.getRaytracingView(12)
		}

	}, 100)
	$(document).on('keyup', (event) => { keys[event.keyCode] = false })

	$('#canvas').on('click', (event) => {
		mousePos.x = event.clientX-200
		mousePos.y = event.clientY

		
		for(let object of world.objects) {
			let windowSize = new Vec2(window.innerWidth-200, window.innerHeight)
			let mouseCanvas = mousePos.clone().minus(windowSize.divide(2))
			if(object.shape == 'ball') {
				
				if(renderer.view == 'sideview') {
					if(new Vec2(object.pos.x, object.pos.y).minus(mouseCanvas).getMagnitude() < object.size) console.log(object)
				}
				if(renderer.view == 'topdown') {
					if(new Vec2(object.pos.x, object.pos.z).minus(mouseCanvas).getMagnitude() < object.size) console.log(object)
				}
			}

		}
	})
})