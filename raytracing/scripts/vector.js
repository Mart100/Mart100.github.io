class Vector {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z

		if(x == undefined) this.x = 0
		if(y == undefined) this.y = 0
		if(z == undefined) this.z = 0

		if(x != undefined && x.x != undefined) {
			this.x = x.x
			this.y = x.y
			this.z = x.z
		}
	}
	multiply(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x *= a.x
			this.y *= a.y
			this.z *= a.z
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x *= a
			this.y *= a
			this.z *= a
			return this
		}
	}
	dotProduct(vec1) {
		return this.x*vec1.x + this.y*vec1.y + this.z*vec1.z
	}
	getAngles() {
		let x = this.x
		let y = this.y
		let z = this.z
	
		let angles = new Vector()

		//angles.x = Math.atan2(Math.sqrt(y^2+z^2),x)
		//angles.y = Math.atan2(Math.sqrt(z^2+x^2),y)
		//angles.z = Math.atan2(Math.sqrt(x^2+y^2),z)

		angles.y = Math.asin(-this.y)
		angles.z = Math.atan2(this.x, this.z)

		
		
		return angles
	}
	rotate(axis, angle) {

		let x1, y1, z1

		if(axis == 'all') {
			
			this.rotate('z', angle.z)
			this.rotate('x', angle.x)
			this.rotate('y', angle.y)

			return this
		}

		if(axis == 'x') {
			x1 = this.x
			y1 = this.y * Math.cos(angle) - this.z * Math.sin(angle)
			z1 = this.y * Math.sin(angle) + this.z * Math.cos(angle)
		}
		if(axis == 'y') {
			x1 = this.x * Math.cos(angle) + this.z * Math.sin(angle)
			y1 = this.y
			z1 =-this.x * Math.sin(angle) + this.z * Math.cos(angle)
		}
		if(axis == 'z') {
			x1 = this.x * Math.cos(angle) - this.y * Math.sin(angle)
			y1 = this.x * Math.sin(angle) + this.y * Math.cos(angle)
			z1 = this.z
		}

		this.x = x1
		this.y = y1
		this.z = z1
		
		return this
	}
	plus(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x += a.x
			this.y += a.y
			this.z += a.z
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x += a
			this.y += a
			this.z += a
			return this
		}
	}
	subtract(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x -= a.x
			this.y -= a.y
			this.z -= a.z
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x -= a
			this.y -= a
			this.z -= a
			return this
		}
	}
	divide(a) {
		// if its another vector
		if(a.x != undefined) {
			this.x /= a.x
			this.y /= a.y
			this.z /= a.z
			return this
		}
		// if its a number
		else if(!isNaN(a)) {
			this.x /= a
			this.y /= a
			this.z /= a
			return this
		}
	}
	string() {
		return this.x+' - '+this.y+' - '+this.z
	}
	setMagnitude(a) {
		let magnitude = this.getMagnitude()

		let x = (this.x/magnitude)*a
		let y = (this.y/magnitude)*a
		let z = (this.z/magnitude)*a

		this.x = x
		this.y = y
		this.z = z

		return this
	}
	getMagnitude() {
		let x = this.x
		let y = this.y
		let z = this.z
		let magnitude = Math.sqrt(x*x + y*y + z*z)
		return magnitude
	}
	clone() {
		return new Vector(this.x, this.y, this.z)
	}
	compare(vec) {
		if(vec.x == this.x && vec.y == this.y && vec.z == this.z) return true
		else return false
	}
	getDistanceTo(vec1) {
		return this.clone().minus(vec1).getMagnitude()
	}
	round() {
		this.x = Math.round(this.x)
		this.y = Math.round(this.y)
		this.z = Math.round(this.z)
		return this
	}
	randomize(i) {
		this.x = (Math.random()*i)-i/2
		this.y = (Math.random()*i)-i/2
		this.z = (Math.random()*i)-i/2
		let magnitude = this.getMagnitude()
		if(magnitude > i) this.setMagnitude(i)
		return this
	}
}