let canvas, ctx, imgData
let buildings = []

let quayLine = []

let windowsOrNot = []
let windowsArray = []

let backgroundColor = [23, 23, 32]
let buildingsAmount = 500
let buildingsY = undefined
let maxBuildingHeight = 400

let backgroundColorDark = [10, 10, 20]
let backgroundColorLight = [50, 50, 60]

let doBlurCanvas = true
let blurAmount = 5
let blurCount = 1
let fullNeighborBlur = true

let doGrainCanvas = true
let colouredGrain = false
let grainAmount = 15
 
let doWater = true

let doQuayLine = true

let windowDistvisibility = false


$(() => {

	canvas = $('#canvas')[0]
	ctx = canvas.getContext('2d')

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	let bgc = backgroundColor
	let bgcString = `rgb(${bgc[0]}, ${bgc[1]}, ${bgc[2]})`

	ctx.fillStyle = bgcString
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// create background gradient
	let gradientXpos = canvas.width/2 + canvas.width/4
	let gradient = ctx.createRadialGradient(gradientXpos, -300, 2000, gradientXpos, -300, 0)
	gradient.addColorStop(0, colorToString(backgroundColorLight))
	gradient.addColorStop(1, colorToString(backgroundColorDark))
	ctx.fillStyle = gradient 
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

	$('body').css('background-color', bgcString)
	
	$('#start').on('click', () => {
		doGrainCanvas = $('#applyGrain').is(':checked')
		doBlurCanvas = $('#applyBlur').is(':checked')
		if($('#addWater').is(':checked')) {
			doWater = true
			doQuayLine = true
			if(!buildingsY) buildingsY = 250
		}
		buildingsAmount = Number($('#buildingAmount').val())
		$('#settings').hide()


		if(!buildingsY) buildingsY = 0
		start()
	})
})

async function start() {

	$('#loading').show()

	$('#currentProcess').html('Creating buildings...')
	await sleep(500)
	createBuildings(buildingsAmount)

	$('#currentProcess').html('Drawing buildings...')
	await sleep(200)
	drawBuildings()
	updateCanvas()

	if(doWater) {
		$('#currentProcess').html('Adding water...')
		await sleep(200)
		addWater()
		updateCanvas()
	}

	if(doQuayLine) {
		$('#currentProcess').html('Adding QuayLine...')
		await sleep(200)
		addQuayLine()
		updateCanvas()
	}

	if(doGrainCanvas) {
		$('#currentProcess').html('Applying Grain...')
		await sleep(200)
		grainCanvas()
		updateCanvas()
	}

	if(doBlurCanvas) {
		await sleep(200)

		for(let i=0;i<blurCount;i++) {
			$('#currentProcess').html(`Applying Blur_${i}...`)
			await sleep(50)
			blurCanvas()
			updateCanvas()
		}
	}


	updateCanvas()

	$('#loading').remove()
	
}


function drawBuildings() {

	// sort buildings on Z
	buildings.sort((a, b) => b.pos.z-a.pos.z)

	for(let building of buildings) {
		let pos = building.pos
		let width = building.width
		let height = building.height
		
		let randomGreyScale = Math.random()*10
		let buildingColor = [
			randomGreyScale, 
			randomGreyScale, 
			randomGreyScale
		]

		for(let x = pos.x-width/2; x < pos.x+width/2; x++) {
			for(let y = pos.y; y < pos.y+height; y++) {
				let rx = Math.round(x)
				let ry = canvas.height - Math.round(y)

				let window = true

				if(Math.round((rx-pos.x)/3) % 2 == 0) window = false
				if(Math.round((ry-pos.y)/3) % 2 == 0) window = false

				let dontBlend = false

				let tileColor = buildingColor
				if(window) {

					let windowDefined = false
					
					// check down
					if(Math.round((ry-pos.y+1)/3) % 2 != 0) {
						windowDefined = true
						tileColor = getCanvasPixel(rx, ry+1)
					}

					// check left
					if(Math.round((rx-pos.x-1)/3) % 2 != 0) {
						windowDefined = true
						tileColor = getCanvasPixel(rx-1, ry)
					}

					if(windowDefined) {
						if(windowDistvisibility) {
							dontBlend = true
						}	
					}

					if(!windowDefined) {
						let lightON = Math.round(Math.random())
						if(lightON) {
							tileColor = [200, 200, 100]
							
							// set random color
							tileColor[0] += Math.round((Math.random())*50)
							tileColor[1] += Math.round((Math.random())*50)
							tileColor[2] += Math.round((Math.random())*150)

							// set random brightness
							let brightness = Math.random()
							tileColor = blendColors(tileColor, buildingColor, 1, brightness)
						} else {
							tileColor = [20, 20, 20]
						}
					}

				}

				if((pos.x-width/2)-rx-0.5 < 1 && (pos.x-width/2)-rx-0.5 > -1) tileColor = [0, 0, 0]
				if((pos.x+width/2)-rx-2 < 1 && (pos.x+width/2)-rx-2 > -1) tileColor = [0, 0, 0]

				if(pos.y+height-y < 3) tileColor = [0, 0, 0]

				let color = tileColor

				if(!dontBlend) {
					color = blendColors(color, backgroundColor, 1, (pos.z/100))
				}

				imgData = setCanvasPixel(rx, ry, color)
			}
		}
	}
}

function addWater() {
	let bottomBuildings = canvas.height-buildingsY
	let topBuildings = canvas.height-buildingsY-maxBuildingHeight

	let gap = 50
	
	let buildingsImgData = ctx.getImageData(0, topBuildings-gap, canvas.width, maxBuildingHeight+gap)
	console.log(buildingsImgData)

	let newCanvas = $('<canvas></canvas>')[0]
	let newCtx = newCanvas.getContext('2d')
	newCanvas.width = canvas.width
	newCanvas.height = maxBuildingHeight

	// blurring
	let neighbors = [[-1, 0], [0, 1], [1, 0], [0, -1]]
	for(let x=0;x<newCanvas.width;x++) {
		for(let y=0;y<newCanvas.height;y++) {
			let originalColor = getCanvasPixel(x, y, buildingsImgData)
			if(originalColor[3] == 0) continue
			let nColorSum = [0, 0, 0, 0]
			for(let neighbor of neighbors) {
				let nColor = getCanvasPixel(x+neighbor[0], y+neighbor[1], buildingsImgData)
				if(nColor[3] == 0) nColor = backgroundColor
				nColorSum[0] += nColor[0]
				nColorSum[1] += nColor[1]
				nColorSum[2] += nColor[2]
			}
			let nColorAvg = [nColorSum[0]/neighbors.length, nColorSum[1]/neighbors.length, nColorSum[2]/neighbors.length]
			let finalColor = blendColors(originalColor, nColorAvg, 1, blurAmount)
			finalColor = blendColors(finalColor, [0, 0, 5], 2, 1)
			setCanvasPixel(x, y, finalColor, buildingsImgData)
		}
	}


	newCtx.putImageData(buildingsImgData, 0, 0)
	
	ctx.save()
	ctx.scale(1, -1)
	ctx.translate(0, (-canvas.height*2)+buildingsY)
	ctx.drawImage(newCanvas, 0, 0, canvas.width, maxBuildingHeight, 0, bottomBuildings, canvas.width, buildingsY)
	ctx.restore()

	imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	updateCanvas()
}

function addQuayLine() {

	let bottomBuildings = canvas.height-buildingsY

	noise.seed(Math.random())

	for(let x=0;x<canvas.width;x++) {
		let noiseVal = noise.perlin2(x/100, 0)
		let val = 1+(1+noiseVal)*5
		quayLine.push(val)
	}

	for(let x=0;x<canvas.width;x++) {
		let height = quayLine[x]
		for(let y = bottomBuildings; y < bottomBuildings+height; y++) {
			setCanvasPixel(x, y, [0,0,0])
		}
	}
}

function blurCanvas() {
	let newImgData = ctx.createImageData(canvas.width, canvas.height)
	let neighbors = [[-1, 0], [0, 1], [1, 0], [0, -1]]
	if(fullNeighborBlur) neighbors = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

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
}

function grainCanvas() {
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

function createBuildings(amount) {
	
	for(let i=0;i<amount;i++) {
		let building = new Building()
		building.randomize()
		buildings.push(building)
	}

}