class Carrier {
	constructor(angle, size) {
		this.angle = angle
		this.distance = 1000
		this.size = size
		this.direction = 1
		this.cargo = 0
		this.maxCargo = size*10
		this.id = Math.floor(Math.random()*10000)
		this.showStats = (Math.random() < 0.1)
		if(this.id < 1000) this.id += Math.floor(Math.random()*10)*1000
	}

	tick() {

		// hitting the core
		if(this.distance < 200 && this.cargo == 0) {
			this.cargo = 1
			this.direction = -1
		}

		// moving out of screen
		if(this.distance > 1000) this.delete()

		// load up cargo when stationary
		if(this.cargo > 0 && this.cargo < this.maxCargo) {
			this.angle += Math.PI/400
			this.cargo += 1
			return
		}

		// move towards
		if(this.direction == 1) this.distance /= 1.002

		// move away
		if(this.direction == -1) this.distance *= 1.002
	}
	delete() {
		let idx = world.carriers.indexOf(this)
		world.carriers.splice(idx, 1)
	}
}