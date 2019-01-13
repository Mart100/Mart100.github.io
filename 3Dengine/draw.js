let lastFrame = 0

function frame() {
	window.requestAnimationFrame(frame)


	debugPanel.add('FPS', Math.round(1000/(performance.now()-lastFrame)))
	lastFrame = performance.now()

	// store every pixel that has been drawn to counter seeing trough walls
	let pixelsDrawn = []

	// clear screen
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)


	// loop trough objects
	for(objectNum in World.objects) {
		//console.log('--------------------------------------------------')
		let object3D = World.objects[objectNum]
		// loop trough faces
		for(faceNum in object3D.faces) {
			//console.log('--------------------------------------------------')
			let wholeFaceBehindCamera = true
			resetCtx()
			ctx.beginPath()
			// give colors
			let specialFaceColor = 8
			if(object3D.settings.color == undefined) {
				ctx.strokeStyle = '#22737c'
				ctx.fillStyle = '#22737c'

			} else {
				ctx.strokeStyle = object3D.settings.color
				ctx.fillStyle = object3D.settings.color
			}


			let face = object3D.faces[faceNum]

			// loop trough corners
			for(cornerNum in face) {
				let corner = face[cornerNum]

				// Translate 3D position to 2D
				final2D = p3D_to_p2D(corner)

				// if corner behind camera.
				if(final2D.z < 0) {
					final2D.x *= -1e5
					final2D.y *= -1e5
				} else {
					wholeFaceBehindCamera = false
				}

				// draw corner
				ctx.lineWidth = (5000-final2D.z)/1000
				if(object3D.axis != undefined) ctx.lineWidth = 5
				if(cornerNum == 0) ctx.moveTo(final2D.x, final2D.y)
				else ctx.lineTo(final2D.x, final2D.y)
			}

			//console.log('----------------------------------------------------DRAWFACE-----------------------------------------------------')
			ctx.closePath()
			if(wholeFaceBehindCamera) continue

			// if settings.fill == false. Only stroke. Else Fill
			if(!object3D.settings.fill) ctx.stroke()
			else ctx.fill()
		}
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
	let final2D = {x: 0, y: 0}
	let VTTC = new Vector(corner.x, corner.y, corner.z) // VectorTranslatedToCamera


	// position relative to camera
	VTTC.edit('x', World.camera.pos.x - VTTC.x*2)
	VTTC.edit('y', World.camera.pos.y - VTTC.y*2)
	VTTC.edit('z', World.camera.pos.z - VTTC.z*2)

	// rotate Relative to camera
	VTTC.rotate('z', World.camera.rot.z)
	VTTC.rotate('y', World.camera.rot.y)
	VTTC.rotate('x', World.camera.rot.x)

	

	// view
	if(settings.view == 'perspective') {
		let PerspectiveNum = 200
		let pr = PerspectiveNum / VTTC.z
		final2D = {x: (pr*VTTC.x), y: (pr*VTTC.y), z: VTTC.z}
	} else if(settings.view == 'orthographic') {
		final2D = {x: VTTC.x, y: VTTC.y, z: VTTC.z}
	}
	
	return final2D
}