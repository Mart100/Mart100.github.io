class Color {
	constructor(r, g, b, a) {
		this.r = r != undefined ? r : 255
		this.g = g != undefined ? g : 255
		this.b = b != undefined ? b : 255
		this.a = a != undefined ? a : 255
	}

	random() {

		this.r = Math.floor(Math.random()*255)
		this.g = Math.floor(Math.random()*255)
		this.b = Math.floor(Math.random()*255)
		this.a = 255

		return this
	}
	clone() {
		return new Color(this.r, this.g, this.b, this.a)
	}
	blend(color2, opacity) {
		this.r = this.r*(1-opacity)+color2.r*opacity
		this.g = this.g*(1-opacity)+color2.g*opacity
		this.b = this.b*(1-opacity)+color2.b*opacity
		return this
	}
}