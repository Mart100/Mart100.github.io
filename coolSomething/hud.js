let hud_canvas, hud_ctx
let dockingAmountGraph = []


$(() => {
  hud_canvas = document.getElementById('hud-canvas')
  hud_ctx = hud_canvas.getContext('2d')

  hud_canvas.width = width
	hud_canvas.height = height
	

	drawHUD()

	// update dockingAmountGraph
	setInterval(() => {
		let dockingCarriers = world.carriers.filter(c => c.cargo > 0 && c.cargo < c.maxCargo)
		let count = dockingCarriers.length

		dockingAmountGraph.push(count)
		if(dockingAmountGraph.length > 15) dockingAmountGraph.shift()
	}, 200)
})

function drawHUD() {

	let ctx = hud_ctx

	// rerun frame
	window.requestAnimationFrame(drawHUD)

	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)


	// current docking
  ctx.font = '15px FutureEarth'
  ctx.fillStyle = 'rgb(200, 200, 200)'
	ctx.textBaseline = 'top'
	let text = "Docked:"
	let textWidth = ctx.measureText(text).width
	ctx.fillText(text, width-textWidth-10, 50)
	
	let dockingCarriers = world.carriers.filter(c => c.cargo > 0 && c.cargo < c.maxCargo)
	dockingCarriers.sort((a, b) => a.id-b.id)

	ctx.font = '10px FutureEarth'

	for(let i in dockingCarriers) {
		let carrier = dockingCarriers[i]

		let percentage = `${Math.round((carrier.cargo/carrier.maxCargo)*100)}`
		if(percentage.length == 1) percentage = `0${percentage}`
		let textPercentage = `${percentage}%`
		let textWidthCarrier = ctx.measureText(textPercentage).width
		ctx.fillText(textPercentage, width-textWidthCarrier-10, 69 + i*12)	

		let textCarrierID = `#${carrier.id}:`
		let textWidthCarrierID = ctx.measureText(textCarrierID).width
		ctx.fillText(textCarrierID, width-textWidthCarrierID-80, 69 + i*12)	
	}


	// docking amount graph

	ctx.fillStyle = 'rgb(200, 200, 200)'

	for(let i in dockingAmountGraph) {
		let count = dockingAmountGraph[i]
		ctx.beginPath()
		ctx.rect((width-(dockingAmountGraph.length*10))+10*i, 300-(count*10), 10, count*10)
		ctx.fill()
	}
}
