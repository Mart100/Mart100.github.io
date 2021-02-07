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
	blend(color2, opacity) {
		let r = this.r*(1-opacity)+color2.r*opacity
		let g = this.g*(1-opacity)+color2.g*opacity
		let b = this.b*(1-opacity)+color2.b*opacity
		return new Color(r,g,b)
	}
}