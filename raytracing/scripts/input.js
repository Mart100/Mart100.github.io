$(() => {
	$(document).on('keydown', (event) => { 
		keys[event.keyCode] = true

	})
	setInterval(() => {

		let speed = renderer.camera.speed

		// move camera -- WASD
		if(keys[87]) renderer.camera.pos.plus(new Vector(0,0,speed).rotate('x', Math.PI/2).rotate('all', renderer.camera.rot))
		if(keys[68]) renderer.camera.pos.plus(new Vector(0,0,speed).rotate('y', Math.PI/2).rotate('all', renderer.camera.rot))
		if(keys[83]) renderer.camera.pos.plus(new Vector(0,0,speed).rotate('x', -Math.PI/2).rotate('all', renderer.camera.rot))
		if(keys[65]) renderer.camera.pos.plus(new Vector(0,0,speed).rotate('y', -Math.PI/2).rotate('all', renderer.camera.rot))

		// zoom camera -- QE
		if(keys[81]) renderer.camera.pos.plus(new Vector(0,0,speed).rotate('x', Math.PI*2).rotate('all', renderer.camera.rot))
		if(keys[69]) renderer.camera.pos.plus(new Vector(0,0,-speed).rotate('all', renderer.camera.rot))

		
		// rotating camera -- arrow keys
		if(keys[38]) renderer.camera.rot.x -= speed/1000
		if(keys[39]) renderer.camera.rot.y -= speed/1000
		if(keys[40]) renderer.camera.rot.x += speed/1000
		if(keys[37]) renderer.camera.rot.y += speed/1000
		
		if(keys[87] || keys[38] || keys[68] || keys[39] || keys[83] || keys[40] || keys[65] || keys[37] || keys[81] || keys[69]) {
			renderer.lastCameraMovement = Date.now()
			renderer.clearCanvas()
			renderer.getRaytracingView(16)
		}

	}, 250)

	$('#canvas').on('DOMMouseScroll mousewheel', (event) => {

		let speed = renderer.camera.speed
		
    // zoom out
    if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
      renderer.camera.pos.plus(new Vector(0,0,speed).rotate('all', renderer.camera.rot).rotate('x', Math.PI*2))
    } else { // zoom in
      renderer.camera.pos.plus(new Vector(0,0,-speed).rotate('all', renderer.camera.rot))
		}
		
		renderer.lastCameraMovement = Date.now()
		renderer.clearCanvas()
		renderer.getRaytracingView(12)
	})
	
	$(document).on('keyup', (event) => { keys[event.keyCode] = false })

	$('#canvas').on('click', (event) => {
		mousePos.x = event.clientX-200
		mousePos.y = event.clientY

		let windowSize = new Vec2(window.innerWidth-200, window.innerHeight)
		let mouseCanvas = mousePos.clone().minus(windowSize.divide(2))

		if(renderer.view == 'raytracing') {
			let fov_rad = dgr_to_rad(renderer.camera.fov)
			let rayPos = renderer.camera.pos.clone() //.plus(new Vector(mouseCanvas.x, mouseCanvas.y, 0))
			let angleA = (((mousePos.x/renderer.canvas.width)*fov_rad)-(fov_rad/2))/(renderer.canvas.height/renderer.canvas.width)
			let angleB = ((mousePos.y/renderer.canvas.height)*fov_rad)-(fov_rad/2)
			let rayVec = new Vector(Math.sin(angleA), Math.sin(angleB), -1).rotate('all', renderer.camera.rot)
			let ray = new Ray(rayPos, rayVec)
			let intersect = ray.getFirstIntersect()
			if(!intersect) return console.log('Nope')
			let obj = intersect.object
			
			let drawIntersectPillar = false

			if(drawIntersectPillar) {
				let objIntersectVec = obj.pos.clone().subtract(intersect.intersectPos).setMagnitude(2)
				for(let i=0;i<10;i++) {
					let newBall = new Object()
					newBall.size = 2
					newBall.pos = intersect.intersectPos.clone().subtract(objIntersectVec.clone().multiply(i))
					newBall.color = [255, 0, 0]
					newBall.light = 0.1
					newBall.load()
				}
			}


			renderer.clearCanvas()
			renderer.getRaytracingView(4)
			console.log(obj)
		} else {
			for(let object of world.objects) {
				if(object.shape == 'ball') {
				
					if(renderer.view == 'sideview') {
						if(new Vec2(object.pos.x, object.pos.y).minus(mouseCanvas).getMagnitude() < object.size) console.log(object)
					}
					if(renderer.view == 'topdown') {
						if(new Vec2(object.pos.x, object.pos.z).minus(mouseCanvas).getMagnitude() < object.size) console.log(object)
					}
				}
			}
		}
	})
})