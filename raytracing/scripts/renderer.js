class Renderer {
	constructor() {

		this.view = 'sideview'
		this.frameCount = 0

		this.canvas = $('#canvas')[0]
		this.ctx = canvas.getContext('2d')
		this.canvas.width = window.innerWidth - 200
		this.canvas.height = window.innerHeight
		this.imgData = this.ctx.createImageData(this.canvas.width, this.canvas.height)
		this.size = new Vec2(this.canvas.width, this.canvas.height)

		this.frame()
		this.rayTracingRoughness = 4
		this.camera = {
			pos: new Vector(0, 0, 1500),
			fov: 90,
			rot: new Vector(0, 0, 0), // https://en.wikipedia.org/wiki/Euler_angles
			speed: 40
		}

		this.lastCameraMovement = Date.now()
		let tickAmount = 0
		let autoFillSize = 10
		this.autoFill = false
		setInterval(() => {
			if(Date.now()-this.lastCameraMovement < 500) return
			if(!this.autoFill) return
			tickAmount++
			this.getRaytracingView(autoFillSize, {offset: {x: tickAmount%autoFillSize, y: Math.floor((tickAmount%(autoFillSize*autoFillSize))/autoFillSize) }, fill: false})
		}, 10)

	}
	changeView(to) {
		this.view = to
		if(to == 'raytracing') {
			this.autoFill = true
			this.getRaytracingView()
		} else {
			this.autoFill = false
		}
	}
	setCanvasPixel(x, y, c) {
		let idx = (y*this.canvas.width*4) + (x*4)
	
		this.imgData.data[idx] = c[0]
		this.imgData.data[idx+1] = c[1]
		this.imgData.data[idx+2] = c[2]
		this.imgData.data[idx+3] = c[3] || 255
	}
	getCanvasPixel(x, y) {
		let idx = (y*this.canvas.width*4) + (x*4)
		let color = []
    color[0] = this.imgData.data[idx]
    color[1] = this.imgData.data[idx+1]
    color[2] = this.imgData.data[idx+2]
		color[3] = this.imgData.data[idx+3]
		return color
  }
	updateCanvas() {
		this.ctx.putImageData(this.imgData, 0, 0)
	}
	getRaytracingView(roughness, options={}) {
		if(!roughness) roughness = this.rayTracingRoughness
		let offset = options.offset || {x: 0, y: 0}
		let fillRoughness = options.fill != undefined ? options.fill : true
		let fov_rad = dgr_to_rad(this.camera.fov)
		for(let x=offset.x;x<this.canvas.width;x+=roughness) {
			let angleA = (((x/this.canvas.width)*fov_rad)-(fov_rad/2))/(this.canvas.height/this.canvas.width)
			let drawn = false
			for(let y=offset.y;y<this.canvas.height;y+=roughness) {
				let currentPix = this.getCanvasPixel(x, y)
				if(currentPix[3] == 255) continue 
				let angleB = ((y/this.canvas.height)*fov_rad)-(fov_rad/2)
				let vec = new Vector(Math.sin(angleA), Math.sin(angleB), -1)
				let rayVec = vec.clone().rotate('all', this.camera.rot)
				//if(Math.random() > 0.99999) console.log(x, y, angleA, angleB, rayVec)
				let color = this.sendCameraRay(x, y, rayVec)
				if(color[0] == 0 && color[1] == 0 && color[2] == 0) { this.setCanvasPixel(x, y, [0,0,0,0]); continue }
				color[3] = 254
				if(fillRoughness) {
					for(let x1=-roughness/2;x1<roughness/2;x1++) {
						for(let y1=-roughness/2;y1<roughness/2;y1++) {
							this.setCanvasPixel(x1+x, y1+y, color)
						}
					}
				}
				color[3] = 255
				this.setCanvasPixel(x, y, color)
				drawn = true


			}
		}
		this.updateCanvas()
	}
	sendCameraRay(x, y, vel) {
		let rayPos = this.camera.pos.clone() //.plus(new Vector(x, y)).subtract(new Vector(this.canvas.width/2, this.canvas.height/2))
		let rayVec = vel //this.camera.direction.setMagnitude(1)
		let ray = new Ray(rayPos, rayVec)
		ray.bounce = 5
		let color = ray.getColor()
		//if(Math.random() > 0.99999) console.log(color)
		return color
	}
	clearCanvas() {
		// clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.imgData = this.ctx.createImageData(this.canvas.width, this.canvas.height)
	}
	frame() {
		this.frameCount++

		let ctx = this.ctx

		// rerun frame
		window.requestAnimationFrame(() => { this.frame() })
		
		if(this.view == 'raytracing') {

		}
		else {
			this.clearCanvas()
			
			// objects
			for(let object of world.objects) {
				if(this.view == 'raytracing') continue
				let xPos = 0
				let yPos = 0
				let width = 0
				let height = 0
				let size = object.size
				let color = object.color

				if(object.shape == 'cube') {
					if(this.view == 'sideview') {
						xPos = object.pos.x-size.x/2
						yPos = object.pos.y-size.y/2
						width = size.x
						height = size.y
					}
					if(this.view == 'topdown') {
						xPos = object.pos.x-size.x/2
						yPos = object.pos.z-size.z/2
						width = size.x
						height = size.z
					}
				}
				if(object.shape == 'ball') {
					if(this.view == 'sideview') {
						xPos = object.pos.x
						yPos = object.pos.y
					}
					if(this.view == 'topdown') {
						xPos = object.pos.x
						yPos = object.pos.z
					}
				}

				xPos += this.canvas.width/2
				yPos += this.canvas.height/2

				//if(Math.random() > 0.99) console.log(xPos, yPos, width, height, object)
				
				ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`

				if(object.shape == 'cube') {
					ctx.fillRect(xPos, yPos, width, height)
				}
				if(object.shape == 'ball') {
					ctx.beginPath()
					ctx.arc(xPos, yPos, size, 0, Math.PI*2)
					ctx.fill()
				}
			}
		}
	}
}
