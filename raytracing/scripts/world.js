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

		let size = Math.floor(Math.random()*50)

		let color = randomRGB()

		let object = new Object()

		object.pos = pos
		object.size = size
		object.color = color
		object.shape = 'ball'
		object.light = 10

		object.load()		
	}
	addBall() {
		let pos = new Vector()
		pos.x = Math.floor(Math.random()*2000)-1000
		pos.y = Math.floor(Math.random()*1000)-500
		pos.z = Math.floor(Math.random()*1000)-500

		let size = 50 //Math.floor(Math.random()*100)

		let color = randomRGB()

		let object = new Object()

		object.pos = pos
		object.size = size
		object.color = color
		object.shape = 'ball'

		object.load()
	}
}
