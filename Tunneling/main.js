let canvas, ctx
let zPos = 1
let tunnelWidth = 2
let tunnelLength = 200
let speed = 5
let tunnel = []

$(() => {
	canvas = $('#canvas')[0]
	ctx = canvas.getContext('2d')

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	noise.seed(Math.random())

	frame()
	
	setInterval(() => {
		tick()
	})

})

function tick() {
	zPos += 1
	//if(zPos >= 1000) zPos = 0
}

function frame() {

	let ch = canvas.height
	let cw = canvas.width

	// rerun frame
	window.requestAnimationFrame(frame)
	
	// clear screen
	clearScreen()

	ctx.beginPath()

	ctx.fillStyle = 'rgb(255,255,255)'
	//ctx.fillRect(0, 0, canvas.width, canvas.height)

	// draw cirlces
	for(let i=tunnelLength;i>0;i-=1) {

		let circlePos = zPos+i
		let circle = tunnel[circlePos]

		if(!circle) {
			tunnel[circlePos] = {
				x: noise.perlin2(zPos/(2000/speed), 0)*1000,
				y: noise.perlin2(0, zPos/(2000/speed))*1000,
				color: [
					noise.perlin2(circlePos/100, circlePos/100)*255,
					noise.perlin2(circlePos/100, -circlePos/100)*255,
					noise.perlin2(-circlePos/100, circlePos/100)*255,
				],
				z: circlePos
			}
			circle = tunnel[circlePos]
		}

		let size = (1000)/i*tunnelWidth
		let color = [255, 255, 255]
		let xPos = cw/2 + circle.x
		let yPos = ch/2 + circle.y

		//color[0] /= i/2
		//color[1] /= i/2
		//color[2] /= i/2

		if(color[0] > 255) color[0] = 255
		if(color[1] > 255) color[1] = 255
		if(color[2] > 255) color[2] = 255

		
		ctx.strokeStyle = `rgb(${Math.ceil(color[0])},${Math.ceil(color[1])},${Math.ceil(color[2])})`
		ctx.fillStyle = 'rgb(0,0,0)'
		
		
		ctx.moveTo(xPos+size, yPos)
		ctx.arc(xPos, yPos, size, 0, 2*Math.PI)
		
		if(Math.random() > 0.9999) console.log(cw/2, ch/1.5, size)
		
	}

	//ctx.clip()
	ctx.stroke()
	//ctx.fill()
}

function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}