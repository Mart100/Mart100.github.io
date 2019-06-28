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

			drawFace.object = object

			let face = object.faces[faceNum]

			if(face.image) drawFace.image = face.image

			// loop trough corners
			for(cornerNum in face.corners) {
				let corner = face.corners[cornerNum]

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

	// draw everything from drawList (all Faces)
	for(objectNum in drawList) {

		let face = drawList[objectNum]
		if(face.image) {
			let firstC = face.corners[0]
			let lastC = face.corners[face.corners.length-2]
			//ctx.drawImage(face.image, firstC.x, firstC.y, lastC.x-firstC.x, lastC.y-firstC.y)
			let vectorBetween = face.object.getPos().minus(World.player.pos)
			let dontDraw = false
			let distanceBetween = vectorBetween.getMagnitude()
			if(Math.abs(face.corners[1].x - face.corners[0].x) < 50) dontDraw = true
			let step = (distanceBetween)/100
			if(step < 20) step = 20
			if(step > 100) step = 100
			if(!dontDraw) render3Dimage(face.image, face.corners, step)
		}

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

		if(face.image) continue
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

// render image to quad using current settings
function render3Dimage(img, corners, step=10) {
	
	var p1, p2, p3, p4, y1c, y2c, y1n, y2n,
			w = img.width - 1,         // -1 to give room for the "next" points
			h = img.height - 1;

	for(y = 0; y < h; y += step) {
		for(x = 0; x < w; x += step) {
			y1c = lerp(corners[0], corners[3],  y / h);
			y2c = lerp(corners[1], corners[2],  y / h);
			y1n = lerp(corners[0], corners[3], (y + step) / h);
			y2n = lerp(corners[1], corners[2], (y + step) / h);

			// corners of the new sub-divided cell p1 (ul) -> p2 (ur) -> p3 (br) -> p4 (bl)
			p1 = lerp(y1c, y2c,  x / w);
			p2 = lerp(y1c, y2c, (x + step) / w);
			p3 = lerp(y1n, y2n, (x + step) / w);
			p4 = lerp(y1n, y2n,  x / w);

			ctx.drawImage(img, x, y, step, step,  p1.x, p1.y, // get most coverage for w/h:
					Math.ceil(Math.max(step, Math.abs(p2.x - p1.x), Math.abs(p4.x - p3.x))) + 1,
					Math.ceil(Math.max(step, Math.abs(p1.y - p4.y), Math.abs(p2.y - p3.y))) + 1)
		}
	}
}

function lerp(p1, p2, t) {
	return {
		x: p1.x + (p2.x - p1.x) * t, 
		y: p1.y + (p2.y - p1.y) * t}
}