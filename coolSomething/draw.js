function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)


	drawCore()
	drawCoreLasers()

	for(let carrier of world.carriers) drawCarrier(carrier)
}


function drawCore() {
	ctx.beginPath()
	ctx.strokeStyle = 'rgb(150,150,150)'
	ctx.arc(width/2, height/2, 200, 0, 2 * Math.PI)
	ctx.stroke()

	ctx.beginPath()
	ctx.fillStyle = 'rgb(150,150,150)'
	ctx.strokeStyle = 'rgb(150,150,150)'
	ctx.arc(width/2, height/2, 20, 0, 2 * Math.PI)
	ctx.fill()
	ctx.stroke()
}


function drawCoreLasers() {
	let middle = new Vector(width/2, height/2)

	ctx.save()

	for(let carrier of world.carriers) {
		if(carrier.cargo > 0 && carrier.cargo < carrier.maxCargo) {
			ctx.beginPath()

			ctx.lineWidth = carrier.size/4

			ctx.moveTo(middle.x, middle.y)

			let pos = middle.clone().plus(new Vector(1, 0).rotate(carrier.angle).setMagnitude(carrier.distance))

			ctx.lineTo(pos.x, pos.y)
			ctx.stroke()
		}
	}

	ctx.restore()
}


function drawCarrier(carrier) {

	let size = carrier.size
	let distance = carrier.distance
	let cargo = carrier.cargo
	let maxCargo = carrier.maxCargo

	let middle = new Vector(width/2, height/2)
	let pos = middle.clone().plus(new Vector(1, 0).rotate(carrier.angle).setMagnitude(carrier.distance))

	// carrier
	ctx.save()
	ctx.beginPath()
	ctx.strokeStyle = 'rgb(150,150,150)'
	ctx.translate(middle.x, middle.y)
	ctx.rotate(carrier.angle)

	// cargo
	ctx.rect(distance, -size/4, size, size/2)
	ctx.stroke()
	ctx.beginPath()
	ctx.fillStyle = 'rgb(150,150,150)'
	ctx.rect(distance, -size/4, (cargo/maxCargo)*size, size/2)
	ctx.fill()
	ctx.restore()


	if(carrier.showStats) {

		// draw carrier info
		let attachPos = pos.plus(new Vector(size, -size/4).rotate(carrier.angle))
		let attachPos2 = attachPos.clone().plus(new Vector(20, -20))

		// draw line
		ctx.beginPath()
		ctx.moveTo(attachPos.x, attachPos.y)
		ctx.lineTo(attachPos2.x, attachPos2.y)
		ctx.stroke()

		// draw square
		ctx.beginPath()
		ctx.rect(attachPos2.x, attachPos2.y, 40, 20)
		ctx.stroke()

		// draw positions
		ctx.font = '6px FutureEarth'
		ctx.fillStyle = 'rgb(200, 200, 200)'
		ctx.textBaseline = 'top'
		let showPos = pos.clone().subtract(middle)
		ctx.fillText(`X: ${Math.floor(showPos.x)}`, attachPos2.x+2, attachPos2.y+4)
		ctx.fillText(`Y: ${Math.floor(showPos.y)}`, attachPos2.x+2, attachPos2.y+12)
	}

}