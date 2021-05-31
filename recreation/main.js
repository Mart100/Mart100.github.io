let canvas, ctx, imgData

$(() => {


	$('#slider').on('input', (event) => {
		let val = Number($('#slider').val())
		$('#image').css('opacity', val)
	})

	canvas = $('#canvas')[0]
	ctx = canvas.getContext('2d')

	let imageDimensions = new Vector(891, 958)
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

	return
	for(let i=0;i<5;i++) grainCanvas()
	for(let i=0;i<5;i++) blurCanvas(false, 0.5)
	for(let i=0;i<1;i++) grainCanvas()

	// blend example
	return
	for(let x=0;x<canvas.width;x++) {
		for(let y=0;y<canvas.height;y++) {
			let pos = new Vector(x, y)
			let c = getCanvasPixel(pos)
			blendCanvasPixel(pos, new Color(0, 0, 0), 0.99)
		}
	}
	

}


function drawPillars() {

	let w = canvas.width
	let h = canvas.height

	let wm = Math.floor(w/2)
	let hm = Math.floor(h/2)

	// front pillars, right -> left
	drawPillar(
		new Vector(w-100, 0), 
		new Vector(100, h),
		1,
		new Color(20, 20, 20),
		new Color(20, 20, 20),
		new NoTexture(),
	)

	drawPillar(
		new Vector(wm-185, 0),
		new Vector(170, h),
		0.35,
		new Color(2, 2, 2),
		new Color(40, 40, 40),
		new BrickTexture(new Vector(170, h), 0.5, 0),
		

	)
	
		
	drawPillar(
		new Vector(90, 100),
		new Vector(100, 590),
		0.3,
		new Color(10, 10, 10),
		new Color(100, 100, 100),
		new NoTexture(),
	)

}

class Texture {
	constructor(size=new Vector(1, 1), weight) {
		this.size = size
		this.weight = weight
		this.imgData = ctx.createImageData(size.x, size.y)

	}
}

class BrickTexture extends Texture {
	constructor(size, weight, rotation) {
		super(size, weight)
		this.rotation = rotation


		//for(let y=0;y<size.y;y++) for(let x=0;x<size.x;x++) setCanvasPixel(new Vector(x, y), new Color(0, 0, 0, 255), this.imgData)
		for(let y=0;y<size.y;y++) {
			let xChangeStart = Math.floor(Math.random()*10)+5
			let xChange = xChangeStart
			for(let x=xChangeStart;x<size.x;x+=xChange) {
				xChange = Math.floor(Math.random()*50)+20
				drawRectStroke(new Vector(x, y*20), new Vector(xChange, 20), new Color(255, 255, 255), 3, this.imgData)
				
				
			}
			
			
		}
		for(let i=0;i<5;i++) this.imgData = grainCanvas(100, this.imgData, false)
		for(let i=0;i<10;i++) this.imgData = blurCanvas(true, 1, this.imgData, false)
		for(let i=0;i<1;i++) this.imgData = grainCanvas(10, this.imgData, false)
		console.log(this.imgData)
		
	}
}

class NoTexture extends Texture {
	constructor(size, weight) {
		super(size, weight)
		this.weight = 0
	}
}


function grainCanvas(strength=20, imgData1, skipAlpha=true) {

	let imgData2 = imgData1!=undefined ? imgData1 : imgData

	let newImgData = ctx.createImageData(imgData2.width, imgData2.height)
	console.log(newImgData)
	for(let x=0;x<imgData2.width;x++) {
		for(let y=0;y<imgData2.height;y++) {
			let originalColor = getCanvasPixel(new Vector(x, y), imgData2)
			if(originalColor.a == 0 && skipAlpha) continue

			let finalColor = new Color(0, 0, 0)
			let grainAmount = strength

			let random = ((Math.random()-0.5)*grainAmount)
			finalColor.r = originalColor.r+random
			finalColor.g = originalColor.g+random
			finalColor.b = originalColor.b+random


			setCanvasPixel(new Vector(x, y), finalColor, newImgData)
		}
	}

	
	if(!imgData1) imgData = newImgData
	return newImgData
}

function blurCanvas(fullNeighborBlur=false, blurAmount=0.5, imgData1, skipAlpha=true) {

	let imgData2 = imgData1!=undefined ? imgData1 : imgData
	let width = imgData1 ? imgData1.width : canvas.width
	let height = imgData1 ? imgData1.height : canvas.height
	let newImgData = ctx.createImageData(width, height)
	let neighbors = [[-1, 0], [0, 1], [1, 0], [0, -1]]
	let backgroundColor = new Color(20, 20, 20)
	if(fullNeighborBlur) neighbors = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

	for(let x=0;x<width;x++) {
		for(let y=0;y<height;y++) {
			let originalColor = getCanvasPixel(new Vector(x, y), imgData2)
			if(originalColor.a == 0 && skipAlpha) continue
			let nColorSum = new Color(0, 0, 0)
			for(let neighbor of neighbors) {
				let nColor = getCanvasPixel(new Vector(x+neighbor[0], y+neighbor[1]), imgData2)
				if(nColor.a == 0 && skipAlpha) nColor = backgroundColor
				nColorSum.r += nColor.r
				nColorSum.g += nColor.g
				nColorSum.b += nColor.b
			}
			let nColorAvg = new Color(
				nColorSum.r/neighbors.length,
				nColorSum.g/neighbors.length,
				nColorSum.b/neighbors.length,
			)

			let finalColor = originalColor.blend(nColorAvg, blurAmount)

			if(Math.random() > 0.999999) console.log(nColorSum, nColorAvg, originalColor, finalColor)
			setCanvasPixel(new Vector(x, y), finalColor, newImgData)
		}
	}

	
	if(imgData1 == undefined) imgData = newImgData
	else imgData1 = newImgData
	console.log(newImgData, imgData1)
	return newImgData
}

function drawBackwall() {

	let w = canvas.width
	let h = canvas.height

	let floorColor = new Color(200, 200, 200)

	for(let x=0; x<w; x++) {
		for(let y=0; y<h; y++) {
			if(x+y*10 > 7000) continue
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
			if(x+y*2.3 > 1000) continue
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
			if(x+y*10 < 7000) continue
			setCanvasPixel(new Vector(x, y), floorColor)
		}
	}
}

function drawPillar(pos, size, ratio, colorL, colorR, texture) {

	console.log(texture)

	let sideRsize = size.clone().multiply(new Vector(ratio, 1)).round()
	drawRect(pos, sideRsize, colorL)
	applyTexture(pos.clone(), sideRsize.clone(), texture)

	let sideLsize = size.clone().multiply(new Vector(1-ratio, 1)).round()
	let sideLpos = pos.clone().plus(new Vector(sideRsize.x, 0)).round()
	drawRect(sideLpos, sideLsize, colorR)
	applyTexture(sideLpos.clone(), sideLsize.clone(), texture)
}

function applyTexture(pos, size, texture) {
	if(texture.weight == 0) return
	for(let x=pos.x; x<pos.x+size.x; x++) {
		for(let y=pos.y; y<pos.y+size.y; y++) {
			blendCanvasPixel(new Vector(x, y), getCanvasPixel(new Vector(x-pos.x, y-pos.y), texture.imgData), texture.weight)
		}
	}
}

function drawRectStroke(pos, size, color, thickness, imgData1) {

	let imgData2 = imgData1!=undefined ? imgData1 : imgData

	for(let x=pos.x; x<pos.x+size.x; x++) for(let y=0;y<thickness;y++) setCanvasPixel(new Vector(x, pos.y+y), color, imgData2)// top line
	for(let x=pos.x; x<pos.x+size.x; x++) for(let y=0;y<thickness;y++) setCanvasPixel(new Vector(x, pos.y+size.y-y), color, imgData2)// bottom line
	for(let y=pos.y; y<pos.y+size.y; y++) for(let x=0;x<thickness;x++) setCanvasPixel(new Vector(pos.x+x, y), color, imgData2)// left line
	for(let y=pos.y; y<pos.y+size.y; y++)  for(let x=0;x<thickness;x++) setCanvasPixel(new Vector(pos.x+size.x-x, y), color, imgData2)// right line

}

function drawRect(pos, size, color, imgData1) {

	let imgData2 = imgData1!=undefined ? imgData1 : imgData

	for(let x=pos.x; x<pos.x+size.x; x++) {
		for(let y=pos.y; y<pos.y+size.y; y++) {
			setCanvasPixel(new Vector(x, y), color, imgData2)
		}
	}
}

function blendCanvasPixel(pos, c, ratio, imgData1) {

	if(c.a == 0) return

	let imgData2 = imgData1!=undefined ? imgData1 : imgData

	let currentColor = this.getCanvasPixel(pos, imgData2)

	let newColor = c.clone().blend(currentColor, ratio)

	setCanvasPixel(pos, newColor, imgData2)

}

function setCanvasPixel(pos, c, imgData1) {

	let imgData2 = imgData1!=undefined ? imgData1 : imgData

	pos.round()

	let idx = (pos.y*imgData2.width*4) + (pos.x*4)

	imgData2.data[idx] = c.r
	imgData2.data[idx+1] = c.g
	imgData2.data[idx+2] = c.b
	imgData2.data[idx+3] = c.a

	return imgData2
}

function getCanvasPixel(pos, imgData1) {

	let imgData2 = imgData1!=undefined ? imgData1 : imgData

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