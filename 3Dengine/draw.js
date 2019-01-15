let lastFrame = 0

function frame() {
	window.requestAnimationFrame(frame)


	debugPanel.add('FPS', Math.round(1000/(performance.now()-lastFrame)))
	lastFrame = performance.now()
	frameCount++

	// drawList
	let drawList = []
	// clear screen
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)

	// put all objects in order
	World.objects.sort((a, b) => {

		let A = a.getPos()
		A.minus(World.camera.pos)
		A.rotate('all', World.camera.rot)

		let B = b.getPos()
		B.minus(World.camera.pos)
		B.rotate('all', World.camera.rot)

		return B.getMagnitude() - A.getMagnitude()

	})


	// loop trough objects
	for(objectNum in World.objects) {

		let object = World.objects[objectNum]

		for(faceNum in object.faces) {

			let drawFace = {corners: []}
			let wholeFaceBehindCamera = true

			if(object.settings.color == undefined) drawFace.color = '#000000' 
			else drawFace.color = object.settings.color 


			let face = object.faces[faceNum]

			// loop trough corners
			for(cornerNum in face) {
				let corner = face[cornerNum]

				// Translate 3D position to 2D
				final2D = p3D_to_p2D(corner)

				// if corner not on screen
				if(Math.abs(final2D.x) > canvas.width/2 || Math.abs(final2D.y) > canvas.height/2) {}
				else wholeFaceBehindCamera = false

				drawFace.corners.push(final2D)

			}

			if(wholeFaceBehindCamera) continue
			drawList.push(drawFace)
		}
	}


	/*// put every face in order
	drawList.sort((a, b) => {
		let A = 0
		for(i of a.corners) A += i.z
		A = A/a.corners.length

		let B = 0
		for(i of b.corners) B += i.z
		B = B/b.corners.length

		debugPanel.add('k', A+'[]'+B)
		return B-A
	})*/

	// draw everything from drawList (all Faces)
	for(objectNum in drawList) {

		let face = drawList[objectNum]

		resetCtx()
		ctx.beginPath()

		ctx.strokeStyle = face.color
		ctx.fillStyle = face.color

		// loop trough corners
		for(cornerNum in face.corners) {
			let corner = face.corners[cornerNum]

			// draw corner
			ctx.lineWidth = face.lineWidth
			if(cornerNum == 0) ctx.moveTo(corner.x, corner.y)
			else ctx.lineTo(corner.x, corner.y)
		}

		ctx.closePath()


		if(face.fill == false) ctx.stroke()
		else ctx.fill()

		ctx.strokeStyle = '#000000'
		if(settings.strokeBlack) ctx.stroke()
	}
}

function DegToRad(degree) {
	return degree*Math.PI/180
}
function resetCtx() {
	ctx.setLineDash([])
	ctx.lineCap = 'butt'
	ctx.globalAlpha = 1
	ctx.strokeStyle = 'black'
	ctx.fillStyle = 'black'
	ctx.lineWidth = 5
}

function p3D_to_p2D(corner) {
	let final2D = new Vector()
	let VTTC = new Vector(corner.x, corner.y, corner.z) // VectorTranslatedToCamera


	// position relative to camera
	VTTC.edit('x', World.camera.pos.x - VTTC.x)
	VTTC.edit('y', World.camera.pos.y - VTTC.y)
	VTTC.edit('z', World.camera.pos.z - VTTC.z)

	// rotate Relative to camera
	VTTC.rotate('z', World.camera.rot.z)
	VTTC.rotate('y', World.camera.rot.y)
	VTTC.rotate('x', World.camera.rot.x)

	// view
	if(settings.view == 'perspective') {
		let d = 400
		let r = d / VTTC.y
		if(r < 0) r = 1e9
		final2D = new Vector(r * VTTC.x, r * VTTC.z, VTTC.z)
	} else if(settings.view == 'orthographic') {
		final2D = new Vector(VTTC.x, VTTC.y, VTTC.z)
	}
	return final2D
}