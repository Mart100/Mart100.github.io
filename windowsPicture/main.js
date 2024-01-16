let ctx, canvas, imgData
let width, height

$(() => {

	canvas = $('#canvas')[0]
	ctx = canvas.getContext('2d')

	width = canvas.width = 560
	height = canvas.height = 920
	
	// draw background
	ctx.filter = `brightness(60%)`
	ctx.globalAlpha = 1
	ctx.fillStyle = '#000000'
	ctx.fillRect(0, 0, width, height)

	// draw grid
	ctx.strokeStyle = '#101010'
	ctx.lineWidth = 15


	let vp1 = {x: -canvas.width*10, y: canvas.height*0.10 }
	let vp2 = {x: canvas.width*1, y: canvas.height*5 }

	let horizontalLines = []
	for (let y = -60*2; y <= canvas.height*1.5; y += 60-(y/canvas.height)*18) {
		horizontalLines.push([canvas.width*1.1, y, vp1.x, vp1.y])
	}

	let verticalLines = []
	for (let x = -45*4; x <= canvas.width*1.5; x += 45) {
		verticalLines.push([x, 0, vp2.x, vp2.y])
	}

	let intersections = []

	for (let i = 0; i < horizontalLines.length; i++) {
		intersections.push([])

		for (let j = 0; j < verticalLines.length; j++) {
			let intersection = calculateIntersection(
				{x: horizontalLines[i][0], y: horizontalLines[i][1]},
				{x: horizontalLines[i][2], y: horizontalLines[i][3]},
				{x: verticalLines[j][0], y: verticalLines[j][1]},
				{x: verticalLines[j][2], y: verticalLines[j][3]}
			)
			if (intersection) {
				intersections[i].push(intersection)
			}
		}
	}

	// get all windows, a window is a 4 coordinate object from 4 intersections
	let windows = []
	for (let i = 0; i < intersections.length-1; i++) {
		for (let j = 0; j < intersections[i].length-1; j++) {
			windows.push([
				intersections[i][j],
				intersections[i][j+1],
				intersections[i+1][j+1],
				intersections[i+1][j]
			])
		}
	}



	// draw square in middle of all windows
	ctx.fillStyle = '#FFFFFF'
	for (let i = 0; i < windows.length; i++) {

		if(Math.random() > 0.6) continue

		let color1 = getColorBetween([72, 162, 208], [14, 40, 50], (Math.random()))
		let color2 = getColorBetween([72, 162, 208], [14, 40, 50], (Math.random()))

		ctx.filter = `brightness(${Math.random()*0.5+0.5})`

		let x = windows[i][0].x
		let y = windows[i][0].y
		let width = windows[i][1].x - windows[i][0].x
		let height = windows[i][2].y - windows[i][1].y
		let angle = Math.random()*Math.PI*2

		// draw blue gradient inside window, randomly rotate the gradient
		let grd = ctx.createLinearGradient(x, y, x + Math.cos(angle) * width, y + Math.sin(angle) * height)
		grd.addColorStop(0, `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 1)`)
		grd.addColorStop(1, `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 1)`)
		ctx.fillStyle = grd
		ctx.beginPath()
		ctx.moveTo(windows[i][0].x, windows[i][0].y)
		ctx.lineTo(windows[i][1].x, windows[i][1].y)
		ctx.lineTo(windows[i][2].x, windows[i][2].y)
		ctx.lineTo(windows[i][3].x, windows[i][3].y)
		ctx.fill()
	}

	ctx.filter = `brightness(50%)`


	// draw all window lines
	for (let i = 0; i < windows.length; i++) {
		ctx.strokeStyle = '#000000'
		ctx.lineWidth = 18
		ctx.beginPath()
		ctx.moveTo(windows[i][0].x, windows[i][0].y)
		ctx.lineTo(windows[i][1].x, windows[i][1].y)
		ctx.lineTo(windows[i][2].x, windows[i][2].y)
		ctx.lineTo(windows[i][3].x, windows[i][3].y)
		ctx.lineTo(windows[i][0].x, windows[i][0].y)
		ctx.stroke()
	}

	for (let i = 0; i < windows.length; i++) {
		ctx.strokeStyle = '#101010'
		ctx.lineWidth = 14
		ctx.beginPath()
		ctx.moveTo(windows[i][0].x, windows[i][0].y)
		ctx.lineTo(windows[i][1].x, windows[i][1].y)
		ctx.lineTo(windows[i][2].x, windows[i][2].y)
		ctx.lineTo(windows[i][3].x, windows[i][3].y)
		ctx.lineTo(windows[i][0].x, windows[i][0].y)
		ctx.stroke()
	}


	// add more depth to ridges
	for (let i = 0; i < horizontalLines.length; i++) {
		ctx.strokeStyle = '#000000'
		ctx.lineWidth = 1.5
		ctx.beginPath()
		ctx.moveTo(horizontalLines[i][0], horizontalLines[i][1]-7)
		ctx.lineTo(horizontalLines[i][2], horizontalLines[i][3]-7)
		ctx.stroke()
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.moveTo(horizontalLines[i][0], horizontalLines[i][1]+7)
		ctx.lineTo(horizontalLines[i][2], horizontalLines[i][3]+7)
		ctx.stroke()
	}

	for (let i = 0; i < verticalLines.length; i++) {
		ctx.strokeStyle = '#000000'
		ctx.lineWidth = 1.5
		ctx.beginPath()
		ctx.moveTo(verticalLines[i][0]+7, verticalLines[i][1])
		ctx.lineTo(verticalLines[i][2]+7, verticalLines[i][3])
		ctx.stroke()
		ctx.lineWidth = 1
		ctx.beginPath()
		ctx.moveTo(verticalLines[i][0]-7, verticalLines[i][1])
		ctx.lineTo(verticalLines[i][2]-7, verticalLines[i][3])
		ctx.stroke()
	}

	imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	grainCanvas(false, 10)
	blurCanvas(2)
	grainCanvas(false, 10)
	applyGlow(5)
	applyGlow(10)	

})


function calculateIntersection(line1Start, line1End, line2Start, line2End) {
	let denominator = (line1Start.x - line1End.x) * (line2Start.y - line2End.y) - (line1Start.y - line1End.y) * (line2Start.x - line2End.x);

	if (denominator == 0) {
			return null; // The lines are parallel
	}

	let t = ((line1Start.x - line2Start.x) * (line2Start.y - line2End.y) - (line1Start.y - line2Start.y) * (line2Start.x - line2End.x)) / denominator;
	let u = -((line1Start.x - line1End.x) * (line1Start.y - line2Start.y) - (line1Start.y - line1End.y) * (line1Start.x - line2Start.x)) / denominator;

	if (t >= 0 && t <= 1 && u >= 0) {
			return {
					x: line1Start.x + t * (line1End.x - line1Start.x),
					y: line1Start.y + t * (line1End.y - line1Start.y)
			};
	}

	return null; // The intersection point is not within the line segment
}

// get color inbetween two colors
function getColorBetween(color1, color2, percent) {

	let r = color1[0] + (color2[0] - color1[0]) * percent
	let g = color1[1] + (color2[1] - color1[1]) * percent
	let b = color1[2] + (color2[2] - color1[2]) * percent

	return [r, g, b]
}

function blurCanvas(blurAmount) {
	let newImgData = ctx.createImageData(canvas.width, canvas.height)
	let neighbors = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

	for(let x=0;x<canvas.width;x++) {
		for(let y=0;y<canvas.height;y++) {
			let originalColor = getCanvasPixel(x, y)
			if(originalColor[3] == 0) continue
			let nColorSum = [0, 0, 0, 0]
			for(let neighbor of neighbors) {
				let nColor = getCanvasPixel(x+neighbor[0], y+neighbor[1])
				if(nColor[3] == 0) nColor = backgroundColor
				nColorSum[0] += nColor[0]
				nColorSum[1] += nColor[1]
				nColorSum[2] += nColor[2]
			}
			let nColorAvg = [
				nColorSum[0]/neighbors.length,
				nColorSum[1]/neighbors.length, 
				nColorSum[2]/neighbors.length, 
			]

			let finalColor = blendColors(originalColor, nColorAvg, 1, blurAmount)

			//if(Math.random() > 0.999999) console.log(nColorSum, nColorAvg, originalColor, finalColor)
			setCanvasPixel(x, y, finalColor, newImgData)
		}
	}

	console.log(newImgData)
	imgData = newImgData
	updateCanvas()
}

function grainCanvas(colouredGrain, grainAmount) {
	let newImgData = ctx.createImageData(canvas.width, canvas.height)

	for(let x=0;x<canvas.width;x++) {
		for(let y=0;y<canvas.height;y++) {
			let originalColor = getCanvasPixel(x, y)
			if(originalColor[3] == 0) continue

			let finalColor = []

			if(colouredGrain) {
				finalColor[0] = originalColor[0]+((Math.random()-0.5)*grainAmount)
				finalColor[1] = originalColor[1]+((Math.random()-0.5)*grainAmount)
				finalColor[2] = originalColor[2]+((Math.random()-0.5)*grainAmount)
			} else {
				let random = ((Math.random()-0.5)*grainAmount)
				finalColor[0] = originalColor[0]+random
				finalColor[1] = originalColor[1]+random
				finalColor[2] = originalColor[2]+random
			}


			setCanvasPixel(x, y, finalColor, newImgData)
		}
	}

	console.log(newImgData)
	imgData = newImgData
	updateCanvas()
}

function blendColors(c1, c2, b1, b2) {
	let newColor = []

	newColor[0] = Math.round((c1[0]*b1 + c2[0]*b2)/(b1+b2))
	newColor[1] = Math.round((c1[1]*b1 + c2[1]*b2)/(b1+b2))
	newColor[2] = Math.round((c1[2]*b1 + c2[2]*b2)/(b1+b2))

	return newColor
}

function setCanvasPixel(x, y, c, imgData1) {

	let imgData2
	if(imgData1) imgData2 = imgData1
	else imgData2 = imgData

	let idx = (y*imgData2.width*4) + (x*4)

	imgData2.data[idx] = c[0]
	imgData2.data[idx+1] = c[1]
	imgData2.data[idx+2] = c[2]
	imgData2.data[idx+3] = c[3] || 255

	return imgData2
}

function getCanvasPixel(x, y, imgData1) {

	let imgData2
	if(imgData1) imgData2 = imgData1
	else imgData2 = imgData

	let idx = (y*imgData2.width*4) + (x*4)

	let c = []

	c[0] = imgData2.data[idx]
	c[1] = imgData2.data[idx+1]
	c[2] = imgData2.data[idx+2]
	c[3] = imgData2.data[idx+3]

	return c
}

function updateCanvas() {
	ctx.imageSmoothingEnabled = true
	ctx.putImageData(imgData, 0, 0)
}


function applyGlow(blurLevel) {
	// Create a temporary canvas
	let tempCanvas = document.createElement('canvas')
	tempCanvas.width = imgData.width
	tempCanvas.height = imgData.height
	let tempContext = tempCanvas.getContext('2d')

	// Draw the original image data
	tempContext.putImageData(imgData, 0, 0)

	// Apply the blur filter
	tempContext.filter = `blur(${blurLevel}px) brightness(50%)`

	// Draw the original image data on top of the blurred image
	tempContext.globalCompositeOperation = 'lighter'
	tempContext.drawImage(tempCanvas, 0, 0)

	// Retrieve the resulting image data
	let glowData = tempContext.getImageData(0, 0, imgData.width, imgData.height)

	imgData = glowData
	updateCanvas()
}