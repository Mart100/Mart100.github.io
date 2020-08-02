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
	multiply(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x *= a.x
			this.y *= a.y
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x *= a
			this.y *= a
			return this
		}
	}
	plus(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x += a.x
			this.y += a.y
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x += a
			this.y += a
			return this
		}
	}
	subtract(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x -= a.x
			this.y -= a.y
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x -= a
			this.y -= a
			return this
		}
	}
	divide(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x /= a.x
			this.y /= a.y
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x /= a
			this.y /= a
			return this
		}
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
	getAngle() {
		let angle = Math.atan2(this.y, this.x)
		let degrees = 180*angle/Math.PI  //degrees
		return (360+Math.round(degrees))%360 //round number, avoid decimal fragments
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
	dotProduct(vec1) {
		return this.x*vec1.x + this.y*vec1.y
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