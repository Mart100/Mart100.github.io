class World {
	constructor() {

		this.objects = []
		this.lights = []
	}
	addObject(object) {
		this.objects.push(object)
		if(object.light) this.lights.push(object)
		if(renderer.view == 'raytracing') renderer.getRaytracingView()
	}
	addCube() {
		let pos = new Vector()
		pos.x = Math.floor(Math.random()*2000)-1000
		pos.y = Math.floor(Math.random()*1000)-500
		pos.z = Math.floor(Math.random()*1000)-500

		let size = new Vector()
		size.x = Math.floor(Math.random()*100)
		size.y = Math.floor(Math.random()*100)
		size.z = Math.floor(Math.random()*100)

		let color = randomRGB()

		let object = new Object()

		object.pos = pos
		object.size = size
		object.color = color
		object.shape = 'cube'

		object.load()
	}
	addLight() {
		let pos = new Vector()
		pos.x = Math.floor(Math.random()*2000)-1000
		pos.y = Math.floor(Math.random()*1000)-500
		pos.z = Math.floor(Math.random()*1000)-500

		let size = 50

		let color = [255, 255, 255]

		let object = new Object()

		object.pos = pos
		object.size = size
		object.color = color
		object.shape = 'ball'
		object.light = 30

		object.load()		
	}
	async testRaySpeed() {
		for(let i=-25;i<25;i++) {
			let ball = new Object()
			ball.size = 50
			ball.pos = new Vector(i*10, 0, 0)
			ball.load()
		}

		await sleep(100)

		let startTime = performance.now()
		let colors = []
		for(let i=0;i<500000;i++) {
			let ray = new Ray(renderer.camera.pos.clone(), new Vector(0, 0, -1).rotate('all', renderer.camera.rot))
			let color = ray.getColor()
			colors.push(color)
		}
		console.log(performance.now()-startTime, colors)
	}
	addBall() {
		let pos = new Vector()
		pos.x = Math.floor(Math.random()*2000)-1000
		pos.y = Math.floor(Math.random()*1000)-500
		pos.z = Math.floor(Math.random()*1000)-500

		let object = new Object()

		object.reflection = Math.random()
		object.pos = pos
		object.size = Math.floor(Math.random()*100)+50
		object.color = randomRGB()
		object.shape = 'ball'

		object.load()
	}
}
