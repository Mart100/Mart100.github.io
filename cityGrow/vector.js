class Vector {
	constructor(x, y) {
		this.x = x
		this.y = y

		if(x != undefined && x.x != undefined) {
			this.x = x.x
			this.y = x.y
		}

		if(this.x == undefined) this.x = 0
		if(this.y == undefined) this.y = 0
	}
	multiply(vec1) {
		this.x *= vec1.x
		this.y *= vec1.y
		return this
	}
	add(vec1) {
		this.x += vec1.x
		this.y += vec1.y
		return this

	}
	subtract(vec1) {
		this.x -= vec1.x
		this.y -= vec1.y
		return this
	}
	divide(vec1) {
		this.x /= vec1.x
		this.y /= vec1.y
		return this
	}
	rotate(angle) {
		let x1 = Math.cos(angle) * this.x - Math.sin(angle) * this.y
		let y1 = Math.sin(angle) * this.x + Math.cos(angle) * this.y

		this.x = x1
		this.y = y1
		
		return this
	}
	string() {
		return this.x+' - '+this.y
	}
	setMagnitude(a) {
		let magnitude = this.getMagnitude()
		
		if(magnitude == 0) return this

		let x = (this.x/magnitude)*a
		let y = (this.y/magnitude)*a

		this.x = x
		this.y = y

		return this
	}
	getMagnitude() {
		if(this.x == 0 && this.y == 0) return 0
		let magnitude = Math.sqrt(this.x*this.x + this.y*this.y)
		return magnitude
	}
	isIdentical(vec1) {
		return vec1.x == this.x && vec1.y == this.y
	}
	round() {
		this.x = Math.round(this.x)
		this.y = Math.round(this.y)

		return this
	}
	floor() {
		this.x = Math.floor(this.x)
		this.y = Math.floor(this.y)

		return this
	}
	clone() {
		return new Vector(this.x, this.y)
	}
	randomize(i) {
		this.x = (Math.random()*i)-i/2
		this.y = (Math.random()*i)-i/2
		let magnitude = this.getMagnitude()
		if(magnitude > i) this.setMagnitude(i)
		return this
	}
}