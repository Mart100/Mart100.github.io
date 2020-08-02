let rCanvas, rCtx, rImgData
let mmCanvas, mmCtx
let mouseLocked = false
let debugPanel = new DebugPanel()
let keys = {}
let mouseMovement = new Vector()
let deltaTick = 10
let heightmap = []
let renderDetail = 4
let player = {
	pos: new Vector(0, 0),
	speed: 50,
	fov: Math.PI/2,
	direction: Math.PI
}
let world = {
	trees: []
}

$(() => {

	// set up render canvas
	rCanvas = $('#render')[0]
	rCtx = rCanvas.getContext('2d')

	rCanvas.width = window.innerWidth/renderDetail
	rCanvas.height = window.innerHeight/renderDetail

	rImgData = rCtx.createImageData(rCanvas.width, rCanvas.height)



	// set up minimap canvas
	mmCanvas = $('#minimap')[0]
	mmCtx = mmCanvas.getContext('2d')
	
	mmCanvas.width = $('#minimap').width()
	mmCanvas.height = $('#minimap').height()

	// listen for inputs
	$(document).on('keydown', (event) => { 
		keys[event.keyCode] = true
	})
	$(document).on('keyup', (event) => { keys[event.keyCode] = false })

	// when mouse move
	document.addEventListener("mousemove", (event) => {
		mouseMovement.x = event.movementX
		mouseMovement.y = event.movementY
		mouseMovement.latest = 0

	})

	// Lock mouse when click on canvas
	rCanvas.requestPointerLock = rCanvas.requestPointerLock || rCanvas.mozRequestPointerLock
	rCanvas.addEventListener('click', () => {rCanvas.requestPointerLock() })

	// on mouse lock and unlock
	if("onpointerlockchange" in document) {
		document.addEventListener('pointerlockchange', lockChange, false)
	} else if("onmozpointerlockchange" in document) {
		document.addEventListener('mozpointerlockchange', lockChange, false)
	}

	function lockChange() {
		if(document.pointerLockElement === rCanvas || document.mozPointerLockElement === rCanvas) mouseLocked = true
		else mouseLocked = false
	}

	// start processes
	drawMinimap()
	createRandomMap()
	drawRender()
	drawHeightmap()

	setInterval(() => {
		tick()
	}, 10)
	
})

function tick() {

	inputWatch()
}

function drawHeightmap() {

	let canvas = $('#heightmap')[0]
	let ctx = canvas.getContext('2d')

	canvas.width = $('#heightmap').width()
	canvas.height = $('#heightmap').width()

	let imgData = ctx.createImageData(canvas.width, canvas.height)

	for(let x=0;x<canvas.width;x++) {
		for(let y=0;y<canvas.height;y++) {
			let realX = x-canvas.width/2
			let realY = y-canvas.height/2

			let color = [255, 255, 255, 255]

			let noise = heightmap[realX][realY]

			color[0] = 127.5+(noise*127.5)
			color[1] = 127.5+(noise*127.5)
			color[2] = 127.5+(noise*127.5)
			color[3] = (127.5+(noise*127.5))

			imgData = setCanvasPixel(x, y, color, canvas, imgData)

		}
	}

	ctx.imageSmoothingEnabled = false
	ctx.putImageData(imgData, 0, 0)
}

function inputWatch() {

	let movement = new Vector()

	let speed = (player.speed/150)*(deltaTick/10)

	if(keys[87] || keys[38]) { // north
		movement.plus(new Vector(0, -speed))
	}
	if(keys[68] || keys[39]) { // east
		movement.plus(new Vector(speed, 0))
	}
	if(keys[83] || keys[40]) { // south
		movement.plus(new Vector(0, speed))
	}
	if(keys[65] || keys[37]) { // west
		movement.plus(new Vector(-speed, 0))
	}

	if(movement.getMagnitude() > 0) {

		player.pos.plus(movement.rotate(Math.PI/2).rotate(player.direction))

	} else {

	}

	if(mouseLocked && mouseMovement.latest < 5) {
		let mouseMov = mouseMovement

		player.direction = ((mouseMov.x)/1000)+player.direction
	}

	mouseMovement.latest++


}

function drawRender() {
	let canvas = rCanvas
	let ctx = rCtx
	let imgData = rImgData
	let fov = player.fov

	let cw = canvas.width
	let ch = canvas.height

	let cvm = cw/2
	let chm = ch/2

	window.requestAnimationFrame(() => {
		setTimeout(() => {
			this.drawRender() 
		}, 50)
	})

	// clear screen
	ctx.clearRect(0, 0, cw, ch)
	rImgData = rCtx.createImageData(rCanvas.width, rCanvas.height)

	let objectList = []

	// send rays
	for(let x=0;x<cw;x++) {
		let angle = (((x/cw)*fov)-(fov/2))

		let ray = {
			vel: new Vector(1, 0).rotate(player.direction+angle).setMagnitude(1),
			pos: player.pos
		}

		let object = getRayIntersects(ray)
		objectList.push(object)
	}

	// set colors
	for(let x=0;x<cw;x++) {

		let color = [0, 0, 0, 0]

		if(!objectList[x]) continue

		let intersect = objectList[x]
		let tree = intersect.object
		let rayLength = intersect.rayLength

		// get actual tree size
		let treeActualSize = 0

		let xcalc1R = 0
		while(objectList[xcalc1R+x] && objectList[xcalc1R+x].object == tree) { xcalc1R += 1 }

		let xcalc1L = 0
		while(objectList[xcalc1L+x] && objectList[xcalc1L+x].object == tree) { xcalc1L -= 1 }

		treeActualSize = xcalc1L+xcalc1R
		

		color[0] = tree.color[0] / (1 + (Math.pow(rayLength, 1.8)/500))
		color[1] = tree.color[1] / (1 + (Math.pow(rayLength, 1.8)/500))
		color[2] = tree.color[2] / (1 + (Math.pow(rayLength, 1.8)/500))
		color[3] = 255

		//console.log(objectList[x])

		for(let y=0;y<ch;y++) {
			let ycolor = [0,0,0,255]
			ycolor[0] = color[0]//tree.widthLine[y]
			ycolor[1] = color[1]//tree.widthLine[y]
			ycolor[2] = color[2]//tree.widthLine[y]

			imgData = setCanvasPixel(x, y, ycolor, canvas, imgData)
		}

		// right
		if(objectList[x-1] == null || objectList[x-1].object != tree) {
			for(let y=0;y<ch;y++) {
				let width = (tree.widthLine[y]*treeActualSize/10)/5
				for(let x1=x;x1<x+width;x1++) {
					if(objectList[x1] && objectList[x1].rayLength < rayLength) continue
					//if(getCanvasPixel(x1, y, canvas, imgData)[0] != 0) continue
					imgData = setCanvasPixel(x1, y, color, canvas, imgData)
				}
			}
		}

		// left
		if(objectList[x+1] == null || objectList[x+1].object != tree) {
			for(let y=0;y<ch;y++) {
				let width = (tree.widthLine[y]*treeActualSize/10)/5
				for(let x1=x;x1>x+width;x1--) {
					if(objectList[x1] && objectList[x1].rayLength < rayLength) continue
					//if(getCanvasPixel(x1, y, canvas, imgData)[0] != 0) continue
					imgData = setCanvasPixel(x1, y, color, canvas, imgData)
				}
			}
		}
	}


	ctx.imageSmoothingEnabled = false
	ctx.putImageData(imgData, 0, 0)
}

function setCanvasPixel(x, y, c, canvas, imgData) {
	let idx = (y*canvas.width*4) + (x*4)

	imgData.data[idx] = c[0]
	imgData.data[idx+1] = c[1]
	imgData.data[idx+2] = c[2]
	imgData.data[idx+3] = c[3] || 255

	return imgData
}

function getCanvasPixel(x, y, canvas, imgData) {
	let idx = (y*canvas.width*4) + (x*4)

	let c = []

	c[0] = imgData.data[idx]
	c[1] = imgData.data[idx+1]
	c[2] = imgData.data[idx+2]
	c[3] = imgData.data[idx+3]

	return c
}

function getRayIntersects(ray) {

	//if(Math.random() > 0.99) console.log(world.trees, ray)
	// get intersects
	let intersects = []
	for(let tree of world.trees) {
		let eye_to_centerCircle = tree.pos.clone().subtract(ray.pos)
		let rayLength = eye_to_centerCircle.dotProduct(ray.vel)
		let rayClosestToCircle = ray.pos.clone().plus(ray.vel.clone().setMagnitude(rayLength))
		let rayDistanceToCircle = rayClosestToCircle.clone().subtract(tree.pos).getMagnitude()
		if(rayDistanceToCircle < tree.size/2 && rayLength > 0) {
			let dist1 = rayLength-Math.sqrt((tree.size/2)**2 - rayDistanceToCircle**2)
			let intersectPos = ray.pos.clone().plus(ray.vel.clone().setMagnitude(dist1))
			intersects.push([tree, rayLength, intersectPos])
		}
	}
	let intersectsOrdered = intersects.sort((a, b) => a[1]-b[1])
	if(!intersectsOrdered[0]) return null
	let firstIntersect = {
		object: intersectsOrdered[0][0],
		rayLength: intersectsOrdered[0][1],
		intersectPos:  intersectsOrdered[0][2]
	}
	return firstIntersect
}

function drawMinimap() {
	let canvas = mmCanvas
	let ctx = mmCtx

	let cv = canvas.width
	let ch = canvas.height

	let cvm = cv/2
	let chm = ch/2

	let pcp = new Vector(player.pos.x+cvm, player.pos.y+chm)

	window.requestAnimationFrame(() => { this.drawMinimap() })

	// clear screen
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// draw player
	ctx.fillStyle = 'rgb(255,0,0)'
	ctx.beginPath()
	ctx.arc(pcp.x, pcp.y, 5, 0, 2 * Math.PI)
	ctx.fill()

	// draw player direction
	let pDirectionLine = new Vector(1, 0).rotate(player.direction).setMagnitude(100).plus(pcp)
	ctx.strokeStyle = 'rgb(255,255,255)'
	ctx.beginPath()
	ctx.moveTo(pcp.x, pcp.y)
	ctx.lineTo(pDirectionLine.x, pDirectionLine.y)
	ctx.closePath()
	ctx.stroke()

	// draw player fov
	let pFOVlineLeft = new Vector(1, 0).rotate(player.direction).rotate(player.fov/2).setMagnitude(100).plus(pcp)
	ctx.strokeStyle = 'rgba(200,200,255,0.5)'
	ctx.beginPath()
	ctx.moveTo(pcp.x, pcp.y)
	ctx.lineTo(pFOVlineLeft.x, pFOVlineLeft.y)
	ctx.closePath()
	ctx.stroke()

	let pFOVlineRight = new Vector(1, 0).rotate(player.direction).rotate(-player.fov/2).setMagnitude(100).plus(pcp)
	ctx.strokeStyle = 'rgba(200,200,255,0.5)'
	ctx.beginPath()
	ctx.moveTo(pcp.x, pcp.y)
	ctx.lineTo(pFOVlineRight.x, pFOVlineRight.y)
	ctx.closePath()
	ctx.stroke()

	
	// draw trees
	
	for(let tree of world.trees) {
		ctx.fillStyle = `rgb(${tree.color[0]},${tree.color[1]},${tree.color[2]})`
		ctx.beginPath()
		ctx.arc(tree.pos.x+cvm, tree.pos.y+chm, tree.size, 0, 2 * Math.PI)
		ctx.fill()
	}
}


function createRandomMap() {

	for(let i=0;i<100;i++) {
		noise.seed(Math.random())
		let tree = {
			pos: new Vector().randomize(500),
			color: randomRGB(),
			size: 2+(Math.random()*2),
			widthLine: []
		}

		for(let y=0;y<rCanvas.height;y++) {
			let noiseVal = 0.5 + noise.perlin2(0, y/100)/2
			let val = Math.pow(noiseVal, 0.2)/2 + Math.pow(((y*5)/rCanvas.height)/3, 0.3)*1
			tree.widthLine.push(val*50)
		}
		world.trees.push(tree)
	}

	// creat heightmap
	noise.seed(Math.random())
	for(let x=-500;x<500;x++) {
		heightmap[x] = []
		for(let y=-500;y<500;y++) {
			heightmap[x][y] = noise.perlin2(x/100, y/100)
		}
	}


}

function randomRGB() {
  let randomR = Math.random()*255
  let randomG = Math.random()*255
  let randomB = Math.random()*255
  let rgb = [randomR, randomG, randomB]
  return rgb
}