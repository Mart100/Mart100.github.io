let windowSize = new Vector()

function frame() {

  // rerun frame
  window.requestAnimationFrame(frame)
  
	windowSize.x = window.innerWidth
	windowSize.y = window.innerHeight

	world.grid.draw()

	drawEntities()
	drawParticles()

}

function drawEntities() {

	let ctx = ctxList['entities']
	let canvas = canvasList['entities']

	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// draw entities
	for(let e of world.entities) e.draw()
}

function drawParticles() {
	let canvas = canvasList['particles']
	let ctx = ctxList['particles']

	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	for(let p of world.particles) {
		ctx.beginPath()
		ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.color[3]})` || 'rgb(255, 0, 0)'
		let posx = p.pos.x
		let posy = p.pos.y
		if(p.text) {
			ctx.font = `${p.textSize}px Arial`
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			
			ctx.fillText(`${p.text}`, posx-p.size/2, posy-p.size/2)
		} else if(p.image != undefined) {
			ctx.drawImage(p.image, posx-p.size/2, posy-p.size/2, p.size, p.size)
			if(Math.random() > 0.99) console.log(p.image, posx-p.size/2, posy-p.size/2)
		
		} else {
			ctx.fillRect(posx-p.size/2, posy-p.size/2, p.size, p.size)
		}
		
	}
}