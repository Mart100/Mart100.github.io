let canvas, ctx, imgData

$(() => {

	canvas = $('#canvas')[0]
	ctx = canvas.getContext('2d')

	let imageDimensions = new Vector(891, 1024)
	let resizeFactor = window.innerHeight/imageDimensions.y

	let width = Math.round(resizeFactor*imageDimensions.x)
	let height = Math.round(window.innerHeight)

	$('#imgSize').html(`${width}, ${height}`)

	canvas.width = width
	canvas.height = height


	imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)


	draw()

	updateCanvas()
}) 


function draw() {

	let w = canvas.width
	let h = canvas.height

	drawFloor()
	drawBackwall()
	
	drawPillars()
	drawCeiling()

	grainCanvas()
	//blurCanvas()
	

}


function drawPillars() {

	let w = canvas.width
	let h = canvas.height

	// front pillars, right -> left
	drawPillar(
		new Vector(w-40, 0), 
		new Vector(80, h), 
		new Color(20, 20, 20),
		new Color(20, 20, 20),
	)

	drawPillar(
		new Vector(w/2, 0), 
		new Vector(80, h), 
		new Color(2, 2, 2),
		new Color(40, 40, 40),
	)

	drawPillar(
		new Vector(100, 100), 
		new Vector(50, 565), 
		new Color(0, 0, 0),
		new Color(40, 40, 40),
	)

}

function grainCanvas() {
	let newImgData = ctx.createImageData(canvas.width, canvas.height)
	console.log(newImgData)
	for(let x=0;x<canvas.width;x++) {
		for(let y=0;y<canvas.height;y++) {
			let originalColor = getCanvasPixel(new Vector(x, y))
			if(originalColor.a == 0) continue

			let finalColor = new Color()
			let grainAmount = 20

			let random = ((Math.random()-0.5)*grainAmount)
			finalColor.r = originalColor.r+random
			finalColor.g = originalColor.g+random
			finalColor.b = originalColor.b+random


			setCanvasPixel(new Vector(x, y), finalColor, newImgData)
		}
	}

	
	imgData = newImgData
}

function blurCanvas() {
	let newImgData = ctx.createImageData(canvas.width, canvas.height)
	let neighbors = [[-1, 0], [0, 1], [1, 0], [0, -1]]
	let backgroundColor = new Color(50, 50, 50)
	let fullNeighborBlur = true
	let blurAmount = 0.001
	if(fullNeighborBlur) neighbors = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

	for(let x=0;x<canvas.width;x++) {
		for(let y=0;y<canvas.height;y++) {
			let originalColor = getCanvasPixel(new Vector(x, y))
			if(originalColor.a == 0) continue
			let nColorSum = new Color()
			for(let neighbor of neighbors) {
				let nColor = getCanvasPixel(new Vector(x+neighbor[0], y+neighbor[1]))
				if(nColor.a == 0) nColor = backgroundColor
				nColorSum.r += nColor.r
				nColorSum.g += nColor.g
				nColorSum.b += nColor.b
			}
			let nColorAvg = new Color(
				nColorSum.r/neighbors.length,
				nColorSum.g/neighbors.length, 
				nColorSum.b/neighbors.length, 
			)

			let finalColor = new Color(originalColor).blend(nColorAvg, blurAmount)

			//if(Math.random() > 0.999999) console.log(nColorSum, nColorAvg, originalColor, finalColor)
			setCanvasPixel(new Vector(x, y), finalColor, newImgData)
		}
	}

	console.log(newImgData)
	imgData = newImgData
}

function drawBackwall() {

	let w = canvas.width
	let h = canvas.height

	let floorColor = new Color(200, 200, 200)

	for(let x=0; x<w; x++) {
		for(let y=0; y<h; y++) {
			if(x+y*4 > 2750) continue
			if(x < 200) continue
			setCanvasPixel(new Vector(x, y), floorColor)
		}
	}

}

function drawCeiling() {
	let w = canvas.width
	let h = canvas.height

	let ceilingColor = new Color(0, 0, 0)

	for(let x=0; x<w; x++) {
		for(let y=0; y<h; y++) {
			if(x+y*2 > 800) continue
			setCanvasPixel(new Vector(x, y), ceilingColor)
		}
	}
}

function drawFloor() {

	let w = canvas.width
	let h = canvas.height

	let floorColor = new Color(35, 35, 35)

	for(let x=0; x<w; x++) {
		for(let y=0; y<h; y++) {
			if(x+y*4 < 2750) continue
			setCanvasPixel(new Vector(x, y), floorColor)
		}
	}
}

function drawPillar(pos, size, colorL, colorR) {

	let sideRsize = size.clone().multiply(new Vector(0.5, 1))
	drawRect(pos, sideRsize, colorL)

	let sideLsize = size.clone().multiply(new Vector(0.5, 1))
	let sideLpos = pos.clone().plus(new Vector(sideLsize.x, 0))
	drawRect(sideLpos, sideLsize, colorR)
}
function drawRect(pos, size, color) {

	
	for(let x=pos.x; x<pos.x+size.x; x++) {
		for(let y=pos.y; y<pos.y+size.y; y++) {
			setCanvasPixel(new Vector(x, y), color)
		}
	}
}

function setCanvasPixel(pos, c, imgData1) {

	let imgData2
	if(imgData1) imgData2 = imgData1
	else imgData2 = imgData

	let idx = (pos.y*imgData2.width*4) + (pos.x*4)

	imgData2.data[idx] = c.r
	imgData2.data[idx+1] = c.g
	imgData2.data[idx+2] = c.b
	imgData2.data[idx+3] = c.a || 255

	return imgData2
}

function getCanvasPixel(pos, imgData1) {

	let imgData2
	if(imgData1) imgData2 = imgData1
	else imgData2 = imgData

	let idx = (pos.y*imgData2.width*4) + (pos.x*4)

	let c = new Color()

	c.r = imgData2.data[idx]
	c.g = imgData2.data[idx+1]
	c.b = imgData2.data[idx+2]
	c.a = imgData2.data[idx+3]

	return c
}

function updateCanvas() {
	ctx.imageSmoothingEnabled = true
	ctx.putImageData(imgData, 0, 0)
}