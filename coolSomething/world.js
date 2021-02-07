class World {
	constructor() {

		this.carriers = []

		setInterval(() => {
			let size = Math.round(Math.random()*50)
			if(size < 20) size = 10

			let angle = Math.random()*2*Math.PI

			this.addCarrier(angle, size)
		}, 500)
	}

	addCarrier(angle, size) {

		let carrier = new Carrier(angle, size)
		this.carriers.push(carrier)
	}
}