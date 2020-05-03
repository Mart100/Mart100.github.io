let canvas, ctx, imgData
let size = {x:0, y:0}
let bg = [5.5, 2.2, 13.6]
let keys = {}
let player = {
	x: 0,
	y: 0,
	size: 13
}
let enemies = []

$(() => {
	canvas = $('#canvas')[0]
	ctx = canvas.getContext('2d')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	imgData = ctx.createImageData(canvas.width, canvas.height)
	size.x = Math.ceil(canvas.width/3)
	size.y = Math.ceil(canvas.height/3)
	player.x = size.x/2
	player.y = size.y/2
	start()

	$(document).on('keydown', (event) => { 
		keys[event.keyCode] = true


	})
	$(document).on('keyup', (event) => { keys[event.keyCode] = false })

	setInterval(() => {



		for(let enemy of enemies) {

			if(enemy.x > size.x) enemy.velocity.x *= -1
			if(enemy.x < 0) enemy.velocity.x *= -1
			if(enemy.y > size.y) enemy.velocity.y *= -1
			if(enemy.y < 0) enemy.velocity.y *= -1

			enemy.x += enemy.velocity.x
			enemy.y += enemy.velocity.y

			drawRect(enemy.x-5, enemy.y-5, 10, 10, bg)
			drawBall(enemy.x, enemy.y, 5, [255, 100, 100, 255])

			if(getDistPoints([enemy.x, enemy.y], [player.x, player.y]) < (5/2+player.size/2)) {
				let idx = enemies.indexOf(enemy)
				enemies.splice(idx, 1)
				createEnemy()
			}
		}


		let playerSpeed = 3
		let moved = false
	
		if(keys[87] || keys[38]) { // north
			player.y -= playerSpeed
			moved = true
		}
		if(keys[68] || keys[39]) { // east
			player.x += playerSpeed
			moved = true
		}
		if(keys[83] || keys[40]) { // south
			player.y += playerSpeed
			moved = true
		}
		if(keys[65] || keys[37]) { // west
			player.x -= playerSpeed
			moved = true
		}

		drawRect(player.x-player.size/2-5, player.y-player.size/2-5, player.size+10, player.size+10, bg)
		drawBall(player.x, player.y, player.size, [255, 255, 255, 255])

		updateCanvas()

	}, 35)

})

function createEnemy() {
	let enemy = {
		x: Math.floor(Math.random()*size.x),
		y: Math.floor(Math.random()*size.y),
		velocity: {
			x: Math.random()*4-2,
			y: Math.random()*4-2
		}
	}
	enemies.push(enemy)
}
function start() {

	for(let i=0;i<40;i++) createEnemy()

	//bg = randomColor()
	//bg[0] /= 10
	//bg[1] /= 10
	//bg[2] /= 10
	setBackground(bg)

	drawBall(player.x, player.y, 13, [255, 255, 255, 255])
	updateCanvas()


}

function setBackground(color) {
	drawRect(0, 0, size.x, size.y, color)
}

function getDistPoints(q, p) {
	let a = q[0] - p[0]
	let b = q[1] - p[1]

	let c = Math.sqrt( a*a + b*b )

	return c

}

function drawBall(xPos, yPos, range, color) {
	let midR = range/2
	for(let x=xPos-midR;x<xPos+midR;x++) {
		for(let y=yPos-midR;y<yPos+midR;y++) {
			x = Math.round(x)
			y = Math.round(y)
			if(getDistPoints([xPos, yPos], [x, y]) >= midR) continue
			setMonitorPixel(x, y, color)
		}
	}
}

function drawRect(startX, startY, width, height, color) {
	for(let x=startX;x<startX+width;x++) {
		for(let y=startY;y<startY+height;y++) {
			x = Math.round(x)
			y = Math.round(y)
			setMonitorPixel(x, y, color)
		}
	}
}
function setMonitorPixel(x, y, c) {

	for(let i=0;i<3;i++) {
		for(let j=0;j<3;j++) {	
			let color = [0, 0, 0, 255]
			color[i] = c[i]
			setPixel(x*3+i, y*3+j, color)
		}
	}
}

function randomColor() {
	let c = []
	for(let i=0;i<3;i++) c[i] = Math.floor(Math.random()*255)
	return c
}

function setPixel(x, y, c) {
	let idx = (y*canvas.width*4) + (x*4)

	imgData.data[idx] = c[0]
	imgData.data[idx+1] = c[1]
	imgData.data[idx+2] = c[2]
	imgData.data[idx+3] = c[3]
}

function updateCanvas() {
	ctx.putImageData(imgData, 0, 0)
}